export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
}

export interface IRegisterReducer {
    hasRegistered: boolean;
}

export interface IUserReducer {
    data: IUser;
    register: IRegisterReducer;
}