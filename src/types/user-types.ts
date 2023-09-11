import { Types } from "mongoose";

export interface UserQuery {
  _id?: Types.ObjectId;
  firstname?: string | null;
  lastname?: string | null;
  email: string;
  phone?: string | null;
  address?: string | null;
  zip?: string | null;
  city?: string | null;
  gender?: "male" | "female" | null;
  birthdate?: Date | null;
  last_connexion: Date;
  connexion_type: "email" | "google" | "facebook";
  last_coords: number[];
  phone_uuid: string;
  type: "particular" | "organization";
  organisation_name?: string | null;
  picture?: string | null;
  role: "user" | "admin";
}

export interface UserEmailSignupMinimumQuery {
  email: string,
  password: string, 
  connexion_type: 'email' | 'facebook' | 'google',
  last_coords: number[],
  phone_uuid: string,
  type: "particular" | "organization",
  organisation_name: string | null;
}

export interface UserEmailSigninMinimumQuery {
  email: string,
  password: string
}

export interface UserEmailConnexionQuery {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  status: "accepted" | "waiting" | "refused" | "ban" | "blocked";
  creation_date_time: Date;
  user_id: Types.ObjectId | null;
}

export interface UserFacebookSignupMinimumQuery {
  email: string,
  fb_name: string;
  fb_id: string;
  picture_url: string;
  picture_width: number;
  picture_height: number;
  connexion_type: 'email' | 'facebook' | 'google',
  last_coords: number[],
  phone_uuid: string,
  type: "particular" | "organization",
  organisation_name: string | null;
}

export interface UserFacebookConnexionQuery {
  _id?: Types.ObjectId;
  fb_id: string;
  fb_name: string;
  email: string;
  picture_url: string;
  picture_width: number;
  picture_height: number;
  creation_date_time: Date;
  user_id: Types.ObjectId | null;
}

export interface UserGoogleSignupMinimumQuery {
  email: string,
  family_name: string;
  given_name: string;
  google_id: string;
  google_name: string;
  picture: string;
  verified_email: boolean;
  connexion_type: 'email' | 'facebook' | 'google',
  last_coords: number[],
  phone_uuid: string,
  type: "particular" | "organization",
  organisation_name: string | null;
}


export interface UserGoogleConnexionQuery {
  _id?: Types.ObjectId;
  email: string;
  family_name: string;
  given_name: string;
  google_id: string;
  google_name: string;
  picture: string;
  verified_email: boolean;
  creation_date_time: Date;
  user_id: Types.ObjectId | null;
}

export interface UserProfilQuery {
  _id?: Types.ObjectId;
  firstname?: string | null;
  lastname?: string | null;
  phone?: string | null;
  address?: string | null;
  zip?: string | null;
  city?: string | null;
  gender?: "male" | "female" | null;
  birthdate?: Date | null;
  type: "particular" | "organization";
  organisation_name?: string | null;
  picture?: string | null;
}