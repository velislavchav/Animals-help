import { IGoogleUser } from "./IGoogleUser";

export interface INormalUser extends IGoogleUser {
  password?: string;
  firstName: string;
  lastName: string;
  // profileImageUrl: string;
  createdAt?: Date;
  phone: string;
}
