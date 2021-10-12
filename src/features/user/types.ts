export interface IUser {
  name: string;
  username: string;
  token: string;
}

export interface ILoginAttributes {
  username: string;
  password: string;
}

export interface ILoginResult {
  message: string;
  user: {
    name: string;
    username: string;
    token: string;
  }
}

export interface IError {
  message: string;
}