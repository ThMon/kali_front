import { UserQuery } from './user/user-types';
import { UserEmailConnexionQuery } from './user/user-email-types';
import { UserFacebookConnexionQuery } from './user/user-facebook-types';
import { UserGoogleConnexionQuery } from './user/user-google-types';

export interface UserState {
    infos: UserQuery | null,
    userEmail: UserEmailConnexionQuery |  null,
    userFacebook: UserFacebookConnexionQuery | null,
    userGoogle: UserGoogleConnexionQuery | null,
    isLogged: boolean,
    lang: 'fr' | 'en'
}