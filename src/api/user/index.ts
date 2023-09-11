import axios from "axios";
import { UserEmailSigninMinimumQuery, UserEmailSignupMinimumQuery, UserFacebookSignupMinimumQuery, UserGoogleSignupMinimumQuery } from "../../types/user-types";
import { config } from "../../../config";
import { ResponseRequest } from "../../types/response-types";

export const signinUserEmail = (data: UserEmailSigninMinimumQuery): Promise<ResponseRequest> => {
    return axios.post(config.api_url+'/user/signinEmail', data)
        .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            console.log(err)
        })
}

export const signinUserGoogle = (data: UserGoogleSignupMinimumQuery): Promise<ResponseRequest> => {
    return axios.post(config.api_url+'/user/signinGoogle', data)
        .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            console.log(err)
        })
}

export const signinUserFacebook = (data: UserFacebookSignupMinimumQuery): Promise<ResponseRequest> => {
    return axios.post(config.api_url+'/user/signinFacebook', data)
        .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            console.log(err)
        })
}

export const signupUser = (data: UserEmailSignupMinimumQuery): Promise<ResponseRequest> => {
    return axios.post(config.api_url+'/user/signupEmail', data)
        .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            console.log(err)
        })
}

export const checkToken = (token: string): Promise<ResponseRequest> =>{

    const configs: any = {
        headers: {
            authorization: token
        }
    }

    console.log("headers", configs)

    return axios.get(config.api_url+'/auth/checkToken', configs)
    .then((response)=>{
        return response.data;
    })
    .catch((err)=>{
        console.log(err)
    })
}