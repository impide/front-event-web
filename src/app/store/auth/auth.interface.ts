export interface User {
  id?: string;
  username?: string;
  email: string;
  firstname?: string;
  lastname?: string;
  city?: string;
  zipcode?: string;
  birthday?: string;
  role?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface LogginResponse {
  message: string;
  user: User;
  token: string;
}
