export interface docState {
  _id:string;
  imageUrl: any;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  bio:string;
  gender:string;
  experience:string;
  dob:string;
  city:string;
  state:string;
  country:string;
  languages:string[];
  role:'user'|'doctor';
  loading: boolean;
  error: string | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: docState | null;
}
  