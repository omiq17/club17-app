export interface IUser {
  name: string;
  username: string;
  token: string;
}

export interface ILoginAttributes {
  username: string;
  password: string;
}

export interface ILoginFormErrors {
  username?: string;
  password?: string;
}

export interface ILoginResult {
  message: string;
  user: {
    name: string;
    username: string;
    token: string;
  }
}

export interface ISignupAttributes {
  name: string;
  username: string;
  password: string;
  key: string;
}

export interface ISignupFormErrors {
  name?: string;
  username?: string;
  password?: string;
  key?: string;
}

export interface ISignupResult {
  message: string;
}

export interface IError {
  message: string;
}