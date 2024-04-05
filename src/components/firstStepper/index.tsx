import React, { ReactElement, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native';
import { inputStyle } from '../../styles/global/form';
import { title1, title2 } from '../../styles/global/text';
import { useTranslate } from '../../services/translate/useTranslate';
import UserStep from './userStep';
import CustomButton from '../../design-system/atoms/buttons/customButton';
import { formUserValidator } from './formValidator';
import ErrorMessage from '../../design-system/atoms/errorMessage';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hook';
import { modifyProfil } from '../../api/user';
import { getStorageData } from '../../lib/helpers/utils/asyncStorage';
import { config } from '../../../config';
import { UserUpdateProfilQuery } from '../../types/user/user-types';
import { convertDateFrenchToUsa } from '../../lib/helpers/utils/date';

export default function FirstStepperContainer() {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user);
    const translate = useTranslate()
    const [userForm, setUserForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        zip: "",
        city: "",
        gender: "female",
        birthDate: ""
    })
    const [error, setError] = useState<{t: string, f: string} | null>(null);
    const [errorMessage, setErrorMessage] = useState('')

    const onChangeUserStateKey = (key: string, value: string)=>{
        const userFormCopy: any = {...userForm}
        userFormCopy[key] = value,
        setUserForm(userFormCopy)
    }

    useEffect(()=>{
        console.log(userForm)

    }, [userForm])

    useEffect(()=>{
        console.log("ERR", error)
        if(error !== null) {
            console.log(translate(error?.t, {field: translate(error?.f)}))
            setErrorMessage(translate(error?.t, {field: translate(error?.f)}))
        }
        
    }, [error])

    const sendUserData = async ()=>{
        console.log("USER FORM")
        const errorUserForm = formUserValidator({...userForm})
        console.log('userForm', errorUserForm);
        if(errorUserForm) {
            setError(errorUserForm)
        } else {
          console.log('ça passe');
          const data: UserUpdateProfilQuery = {
            firstname: userForm.firstName,
            lastname: userForm.lastName,
            phone: userForm.phone,
            address: userForm.address,
            zip: userForm.zip,
            city: userForm.city,
            gender: userForm.gender as 'female' | 'male',
            birthdate: new Date(convertDateFrenchToUsa(userForm.birthDate)),
          }
          const token = await getStorageData(config.storageTokenKey)
          if(user.infos !== null && token) {
            modifyProfil(data, user.infos?._id, token)
              .then((res: any)=>{
                console.log('res update', res)
                if(res.status === 200) {

                }
              })
          } 
        }
        
    }


  return (
    <View style={styles.container}>
        <Text style={title2}>{translate('first_stepper.welcome')}</Text>
        {error !== null && <ErrorMessage message={errorMessage}/>}
        <UserStep user={userForm} onChangeUserStateKey={onChangeUserStateKey}/>
        <CustomButton
                  onPress={()=>{
                    sendUserData()
                  }}
                  title="Enregistrer"
                  buttonStyle='validation'
              />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 72,
      alignItems: "center"
    },
  });

