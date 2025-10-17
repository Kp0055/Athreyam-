export interface User {
  _id:string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  gender: string;
  dob: string;
  role: "user" | "doctor" | ""; 
  loading: boolean;
  error: string | null;
}


export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}