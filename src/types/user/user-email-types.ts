export interface UserEmailSignupMinimumQuery {
  email: string;
  password: string;
  connexion_type: "email" | "facebook" | "google";
  last_coords: number[];
  phone_uuid: string;
  profil_type: "particular" | "organization";
  organisation_name: string | null;
  lang: "fr" | "en";
}

export interface UserEmailSigninMinimumQuery {
  email: string;
  password: string;
}

export interface UserEmailConnexionQuery {
  _id: string;
  email: string;
  password: string;
  status: "accepted" | "waiting" | "refused" | "ban" | "blocked";
  creation_date_time: Date;
  user_id: string | null;
}

export interface UserEmailConnexionDtoQuery {
  _id?: string;
  email: string;
  password: string;
  status: "accepted" | "waiting" | "refused" | "ban" | "blocked";
  creation_date_time: Date;
  user_id: string | null;
}
