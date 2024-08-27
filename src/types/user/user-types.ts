export interface UserQuery {
  _id: string;
  firstname: string | null;
  lastname: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  zip: string | null;
  city: string | null;
  gender: "male" | "female" | null;
  birthdate: Date | null;
  last_connexion: Date;
  connexion_type: "email" | "google" | "facebook";
  last_coords: number[];
  phone_uuid: string;
  profil_type: "particular" | "organization";
  organisation_name?: string | null;
  picture: string | null;
  role: "user" | "admin";
  lang: "fr" | "en";
  tags: string[] | null;
  step: number;
}

export interface UserDtoQuery {
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
  profil_type: "particular" | "organization";
  organisation_name?: string | null;
  picture?: string | null;
  role: "user" | "admin";
  lang: "fr" | "en";
  tags?: string[] | null;
}

export interface UserProfilQuery {
  _id?: string;
  firstname?: string | null;
  lastname?: string | null;
  phone?: string | null;
  address?: string | null;
  zip?: string | null;
  city?: string | null;
  gender?: "male" | "female" | null;
  birthdate?: Date | null;
  profil_type: "particular" | "organization";
  organisation_name?: string | null;
  picture?: string | null;
  lang?: "fr" | "en";
}

export interface UserUpdateProfilQuery {
  firstname?: string | null;
  lastname?: string | null;
  phone?: string | null;
  address?: string | null;
  zip?: string | null;
  city?: string | null;
  gender?: "male" | "female" | null;
  birthdate?: Date | null;
  profil_type?: "particular" | "organization";
  organisation_name?: string | null;
  picture?: string | null;
  lang?: "fr" | "en";
}
