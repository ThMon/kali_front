import React, { useEffect } from 'react'
import { Text } from 'react-native';
import { config } from '../../../config';
import LogoutRoutes from "../../navigation/logoutRoutes"
import LoginRoutes from '../../navigation/loginRoutes';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { loginUser, logoutUser } from '../redux/user/userReducer';
import { getStorageData } from './utils/asyncStorage';
import { checkToken } from '../../api/user';

export default function HocManager() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);



    useEffect(()=>{
        console.log("HOC");
        console.log("user", user);



    }, [user])

    const autoLogin = async ()=>{
        const token = await getStorageData(config.storageTokenKey)
        console.log('TOKEN', token);

        if(token !== null) {
            const responseCheckToken = await checkToken(token);
            console.log("responseCheckToken", responseCheckToken);

            if(responseCheckToken.status === 200) {
                dispatch(loginUser(responseCheckToken.content.user))
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
            {user.isLogged ? <LoginRoutes/> : <LogoutRoutes/>}
        </>
    )
}
