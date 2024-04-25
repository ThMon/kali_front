export interface UserGoogleSignupMinimumQuery {
  email: string;
  family_name: string;
  given_name: string;
  google_id: string;
  google_name: string;
  picture: string;
  verified_email: boolean;
  connexion_type: "email" | "facebook" | "google";
  last_coords: number[];
  phone_uuid: string;
  profil_type: "particular" | "organization";
  organisation_name: string | null;
  lang: "fr" | "en";
}

export interface UserGoogleConnexionQuery {
  _id: string;
  email: string;
  family_name: string;
  given_name: string;
  google_id: string;
  google_name: string;
  picture: string;
  verified_email: boolean;
  creation_date_time: Date;
  user_id: string | null;
}

export interface UserGoogleConnexionDtoQuery {
  _id?: string;
  email: string;
  family_name: string;
  given_name: string;
  google_id: string;
  google_name: string;
  picture: string;
  verified_email: boolean;
  creation_date_time: Date;
  user_id: string | null;
}
