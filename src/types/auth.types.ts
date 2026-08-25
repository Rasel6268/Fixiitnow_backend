export interface IRegistrationData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "CUSTOMER" | "TECHNICIAN";
}