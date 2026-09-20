export interface IRegistrationData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "CUSTOMER" | "TECHNICIAN";
}
export interface ILoginData {
  email: string,
  password: string
}
export interface IProfileData {
  user_id: string;
  bio?: string;
  experienceYears?: number;
  isVerified?: boolean;
  isAvailable?: boolean;
}
