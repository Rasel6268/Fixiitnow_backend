export interface IRegistrationData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "CUSTOMER" | "TECHNICIAN";
}
export interface ILoinData {
  email: string,
  password: string
}