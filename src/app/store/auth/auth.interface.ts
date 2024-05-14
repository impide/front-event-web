export interface User {
  id?: string;
  username: string | null;
  email: string | null;
  firstname?: string;
  lastname?: string;
  city?: string;
  zipcode?: string;
  birthday?: string;
  role?: string;
}

export interface LogginResponse {
  message: string;
  user: User;
  token: string;
}
