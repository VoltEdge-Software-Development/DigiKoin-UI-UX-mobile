export type PaymentMethod = "Crypto" | "Bank";
export type AuthMethod = "google" | "apple" | "facebook";
export type UserType = "Investor" | "Admin" | "Minor";

type AuthWithMethod = {
  method: AuthMethod;
  email?: never; // Ensures email can't be provided with method
  password?: never; // Ensures password can't be provided with method
};

type AuthWithCredentials = {
  method?: never; // Ensures method can't be provided with credentials
  email: string;
  password: string;
};

export type AuthParams = AuthWithMethod | AuthWithCredentials;
