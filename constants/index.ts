import { AuthMethod, PaymentMethod, UserType } from "@/types";

export const TROY_OUNCE_IN_GRAMS_E8 = BigInt(3110352185);
export const PAYMENT_METHODS: PaymentMethod[] = ["Crypto", "Bank"];
export const AUTH_METHODS: AuthMethod[] = ["google", "apple", "facebook"];
export const USER_TYPES: UserType[] = ["Investor", "Admin", "Minor"];