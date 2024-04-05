import React, { useEffect, useState } from 'react'
import { config } from '../../../config';
import LogoutRoutes from "../../navigation/logoutRoutes"
import LoginRoutes from '../../navigation/loginRoutes';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { loginUser, logoutUser } from '../redux/user/userReducer';
import { getStorageData } from './utils/asyncStorage';
import { checkToken, updateUser, updateUuid } from '../../api/user';
import { getLocation } from './utils/location';
import { userValidator } from './utils/userValidator';
import FirstStepperContainer from '../../components/firstStepper';
import { updateCoords } from '../../api/user';
import { registerForPushNotificationsAsync } from './utils/notifications';

export default function HocManager() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const [isComplete, setIsComplete] = useState(true);


    useEffect(()=>{
        console.log("HOC");
        console.log("user", user);
       
        setIsComplete(user.infos !== null ? userValidator(user.infos) : false);


    }, [user])

    const autoLogin = async ()=>{
        const token = await getStorageData(config.storageTokenKey)
       //console.log('TOKEN', token);

        if(token !== null) {
            const responseCheckToken = await checkToken(token);
            //console.log("responseCheckToken", responseCheckToken);

            if(responseCheckToken.status === 200) {
                dispatch(loginUser(responseCheckToken.content))
                const location: any = await getLocation();

                const coords = {coords: [parseFloat(location.coords.latitude), parseFloat(location.coords.longitude)]}
                
                const updateCoordsRes = await updateCoords(coords, responseCheckToken.content.user._id, token)


                console.log('GO')
               
                const tokenUuid = await registerForPushNotificationsAsync(responseCheckToken.content.user._id)

                const uuid: any = {uuid: tokenUuid?.data}
                if(uuid) {
                    const updateUuidRes = await updateUuid(uuid, responseCheckToken.content.user._id, token)   
                }
            }
        } else {
            dispatch(logoutUser(null))
        }
    }

    useEffect(()=>{
        autoLogin()
    }, [])

    


    return (
        <>
            {user.isLogged ?  
                isComplete ? <LoginRoutes/> : <FirstStepperContainer/>
            : <LogoutRoutes/>}
        </>
    )
}
