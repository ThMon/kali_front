import axios, { HeadersDefaults } from "axios";
import { UserEmailSignupMinimumQuery, UserEmailSigninMinimumQuery } from "../../types/user/user-email-types";
import { UserFacebookSignupMinimumQuery } from "../../types/user/user-facebook-types";
import { UserGoogleSignupMinimumQuery } from "../../types/user/user-google-types";
import { UserQuery, UserUpdateProfilQuery } from "../../types/user/user-types";
import { config } from "../../../config";
import { ResponseRequest } from "../../types/response-types";
import { Types } from "mongoose";


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

export const updateUser = (data: UserQuery, id: Types.ObjectId): Promise<ResponseRequest> => {
    return axios.post(config.api_url+'/user/modifyProfil/'+id, data)
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

    return axios.get(config.api_url+'/auth/checkToken', configs)
    .then((response)=>{
        return response.data;
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const updateCoords = (data: {coords: number[]}, id: string, token: string): Promise<ResponseRequest> => {
    const configs: any = {
        headers: {
            authorization: token
        }
    }

    return axios.put(config.api_url+'/user/modifyCoords/'+id, data, configs)
        .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            console.log(err)
        })
}

export const updateUuid = (data: {uuid: string}, id: string, token: string): Promise<ResponseRequest> => {
    const configs: any = {
        headers: {
            authorization: token
        }
    }

    return axios.put(config.api_url+'/user/modifyUuid/'+id, data, configs)
        .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            console.log(err)
        })
}

export const modifyProfil = (data: UserUpdateProfilQuery, id: string, token: string): Promise<ResponseRequest> => {
    const configs: any = {
        headers: {
            authorization: token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    return axios.put(config.api_url+'/user/modifyProfil/'+id, data, configs)
        .then((response)=>{
            console.log("response data", response.data.content)
            return response.data;
        })
        .catch((err)=>{
            console.log(err)
        })
}