export interface UserModel {
    id: string;
    username: string;
    email?: string;
    password: string;
    firstName: string;
    lastName?: string;
    gender?: string;
    image?: string;
    token: string
}
