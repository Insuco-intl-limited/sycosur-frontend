// USER-RELATED INTERFACES
export interface UserCommonData {
    email: string;
    password: string;
}

export interface User {
    first_name: string;
    last_name: string;
    email: string;
}

export interface UserResponse {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    slug: string;
    full_name: string;
    gender: string;
    odk_role: string;
    phone_number: string;
    country: string;
    city: string;
    avatar?: string;
    date_joined: string;
}

export interface RegisterUserData extends UserCommonData {
    username: string;
    first_name: string;
    last_name: string;
    re_password: string;
}

export interface LoginUserData extends UserCommonData {}

export interface ActivateUserData {
    uid: string;
    token: string;
}

export interface ResetPasswordConfirmData extends ActivateUserData {
    new_password: string;
    re_new_password: string;
}

export interface ResetPasswordData {
    email: string;
}

export interface RegisterUserResponse {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}

export interface LoginResponse {
    message: string;
}

export interface SocialAuthArgs {
    provider: string;
    state: string;
    code: string;
}

export interface SocialAuthResponse {
    message: string;
    user: User;
}

// PROFILE-RELATED INTERFACES
export interface Profile {
    id: string;
    slug: string;
    first_name: string;
    last_name: string;
    username: string;
    full_name: string;
    gender: "male" | "female" | "other";
    country_of_origin: string;
    city_of_origin: string;
    bio?: string;
    odk_role: ODKRole;
    date_joined: string;
    avatar?: string;

}

export interface ProfilesResponse {
    profiles: {
        count: number;
        next?: string;
        previous?: string;
        results: Profile[];
    };
}

export interface ProfileResponse {
    profile: Profile;
}

export interface ProfileData {
    first_name: string;
    last_name: string;
    username: string;
    gender: "male" | "female" | "other";
    bio?: string;
    country_of_origin: string;
    city_of_origin: string;
    average_rating: number;
    odk_role: ODKRole;
    phone_number: string;
}

export type ODKRole =
    | "data_collector"
    | "supervisor"
    | "manager"
    | "administrator";

