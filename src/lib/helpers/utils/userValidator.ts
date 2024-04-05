import { UserQuery } from "../../../types/user/user-types";

export const userValidator = (user: UserQuery): boolean=>{
    console.log('p0', user)
    console.log('passe 0')
        if(user.firstname && user.lastname && user.address && user.phone && user.zip && user.city && user.gender && user.birthdate) {
            console.log('passe 1')
            if(user.type === "organization") {
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