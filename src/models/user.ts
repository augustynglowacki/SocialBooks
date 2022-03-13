export interface User {
  id: string;
  email: string;
  userName: string;
  photoURL: string;
}

export interface UserState {
  user: User;
  loading: boolean;
  error: string;
  allUsers: UserData[];
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser extends LoginUser {
  username: string;
}

export interface BackendUser extends LoginUser {
  displayName: string;
}

export interface UserData {
  userId: string;
  displayName: string;
}
