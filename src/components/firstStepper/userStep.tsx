import React from 'react'
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { inputStyle } from '../../styles/global/form';
import { useTranslate } from '../../services/translate/useTranslate';
import { Dimensions } from 'react-native';
import Select from '../../design-system/atoms/select';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaskInput , { Masks }from 'react-native-mask-input';
import TextField from '../../design-system/atoms/textField';
import Ionicons from '@expo/vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

export default function UserStep({
    user,
    onChangeUserStateKey
}: {
    user: {
        firstName: string,
        lastName: string,
        phone: string,
        address: string,
        zip: string,
        city: string,
        gender: string,
        birthDate:string,
    },
    onChangeUserStateKey: (key: string, value: string)=>void

}) {
    const translate = useTranslate()
  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollview} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            <TextField
                placeholder={translate("first_stepper.user_step.your_firstname")}
                value={user.firstName}
                onChangeText={(text)=>{
                    onChangeUserStateKey('firstName', text)
                }}
            />
            <TextField
                placeholder={translate("first_stepper.user_step.your_lastname")}
                value={user.lastName}
                onChangeText={(text)=>{
                    onChangeUserStateKey('lastName', text)
                }}
            />
            <TextField
                placeholder={translate("first_stepper.user_step.your_phone")}
                value={user.phone}
                onChangeText={(text)=>{
                    onChangeUserStateKey('phone', text)
                }}
            />
            <TextField
                placeholder={translate("first_stepper.user_step.your_address")}
                value={user.address}
                onChangeText={(text)=>{
                    onChangeUserStateKey('address', text)
                }}
            />
            <TextField
                placeholder={translate("first_stepper.user_step.your_zip")}
                value={user.zip}
                onChangeText={(text)=>{
                    onChangeUserStateKey('zip', text)
                }}
            />
            <TextField
                placeholder={translate("first_stepper.user_step.your_city")}
                value={user.city}
                onChangeText={(text)=>{
                    onChangeUserStateKey('city', text)
                }}
            />
            

            <Select
                data={['male', 'female']}
                defaultValue={"female"}
                onSelect={(selectedItem, index) => {

                if(selectedItem === 'male') {
                    onChangeUserStateKey('gender', "male")
                }

                if(selectedItem === 'female') {
                    onChangeUserStateKey('gender', "female")
                }
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                if(selectedItem === 'female') {
                    return translate('first_stepper.user_step_gender.female')
                }
                if(selectedItem === 'male') {
                    return translate('first_stepper.user_step_gender.male')
                }
                return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                if(item === 'female') {
                    return translate('first_stepper.user_step_gender.female')
                }
                if(item === 'male') {
                    return translate('first_stepper.user_step_gender.male')
                }
                return item
                }}
                renderDropdownIcon={isOpened => {
                return <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
            
            />
            <MaskInput
                placeholder="dd/mm/yyyy"
                mask={Masks.DATE_DDMMYYYY}
                onFocus={() => console.log(true)}
                onBlur={() => console.log(false)}
                onChangeText={(formatted) => onChangeUserStateKey('birthDate', formatted)}
                value={user.birthDate}
                style={inputStyle}
            />
        </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollview: {
      flex: 1,
      backgroundColor: 'white',
      marginHorizontal: 0,
      marginVertical: 24,
      padding: 0,
      width: 310,
    },
  });