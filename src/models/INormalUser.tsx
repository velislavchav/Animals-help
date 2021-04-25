export interface INormalUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  role: string;
  createdAt?: Date;
}
