import { isValidDateFenchDate } from "../../lib/helpers/utils/date";

interface UserForm {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    zip: string;
    city: string;
    gender: string;
    birthDate: string;
}

export const formUserValidator = (userForm: UserForm): {t: string, f: string} | null =>{
    console.log('userFORm', userForm)
    if(userForm.firstName === '') {
        return {t: 'first_stepper.user_step_error.empty_text', f: 'first_stepper.user_step.your_firstname'}
        // return translate('first_stepper.user_step_error.empty_text', {field: translate('first_stepper.user_step.your_firstname')})
    }

    if(userForm.lastName === '') {
        return {t: 'first_stepper.user_step_error.empty_text', f: 'first_stepper.user_step.your_lastname'}
        // return translate('first_stepper.user_step_error.empty_text', {field: translate('first_stepper.user_step.your_lastname')})
    }

    if(userForm.phone === '') {
        return {t: 'first_stepper.user_step_error.empty_text', f: 'first_stepper.user_step.your_phone'}
        // return translate('first_stepper.user_step_error.empty_text', {field: translate('first_stepper.user_step.your_phone')})
    }

    if(userForm.address === '') {
        return {t: 'first_stepper.user_step_error.empty_text', f: 'first_stepper.user_step.your_address'}
    }

    if(userForm.zip === '') {
        return {t: 'first_stepper.user_step_error.empty_text', f: 'first_stepper.user_step.your_zip'}
    }

    if(userForm.city === '') {
        return {t: 'first_stepper.user_step_error.empty_text', f: 'first_stepper.user_step.your_city'}
    }

    if(!isValidDateFenchDate(userForm.birthDate)) {
        return {t: 'first_stepper.user_step_error.bad_birthdate', f: ''}
    }

    if(userForm.gender !== 'female' && userForm.gender!== "male") {
        return {t: 'first_stepper.user_step_error.bad_birthdate', f: ''}
    }

    return null;
}