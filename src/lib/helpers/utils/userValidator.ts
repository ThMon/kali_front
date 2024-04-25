import { UserQuery } from "../../../types/user/user-types";

export const userValidator = (user: UserQuery): boolean=>{
    const isValid = user.firstname !== null && user.lastname !== null  && user.address !== null  && user.phone !== null  && user.zip !== null  && user.city !== null  && user.gender !== null  && user.birthdate !== null 
        if(isValid) {
            if(user.profil_type === "organization") {
                if(user.organisation_name) {
                    return true
                } else {
                    return false
                }
            }
            return true;
        } else {
            return false
        }
}