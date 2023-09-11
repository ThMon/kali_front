import {UserQuery, UserEmailConnexionQuery, UserFacebookConnexionQuery, UserGoogleConnexionQuery} from './user-types'

export interface UserState {
    infos: UserQuery | null,
    userEmail: UserEmailConnexionQuery |  null,
    userFacebook: UserFacebookConnexionQuery | null,
    userGoogle: UserGoogleConnexionQuery | null,
    isLogged: boolean
}