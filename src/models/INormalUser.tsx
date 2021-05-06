export interface INormalUser {
  id?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  // profileImageUrl: string;
  role: string;
  createdAt?: Date;
  phone: string;
  applicationsForAdoption: string[];
}
