export interface UserFacebookSignupMinimumQuery {
  email: string;
  fb_name: string;
  fb_id: string;
  picture_url: string;
  picture_width: number;
  picture_height: number;
  connexion_type: "email" | "facebook" | "google";
  last_coords: number[];
  phone_uuid: string;
  profil_type: "particular" | "organization";
  organisation_name: string | null;
  lang: "fr" | "en";
}

export interface UserFacebookConnexionQuery {
  _id: string;
  fb_id: string;
  fb_name: string;
  email: string;
  picture_url: string;
  picture_width: number;
  picture_height: number;
  creation_date_time: Date;
  user_id: string | null;
}

export interface UserFacebookConnexionDtoQuery {
  _id?: string;
  fb_id: string;
  fb_name: string;
  email: string;
  picture_url: string;
  picture_width: number;
  picture_height: number;
  creation_date_time: Date;
  user_id: string | null;
}
