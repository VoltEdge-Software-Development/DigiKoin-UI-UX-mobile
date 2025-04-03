export interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

export interface NavProps {
  darkMode: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userType: 'minor' | 'investor' | 'admin' | null;
}

export interface WelcomeProps {
  setIsLoggedIn: (value: boolean) => void;
}

export interface SignUpProps {
  setIsLoggedIn: (value: boolean) => void;
}

export interface AdminDashboardProps {
  setIsLoggedIn: (value: boolean) => void;
}

export interface InvestorDashboardProps {
  setIsLoggedIn: (value: boolean) => void;
}

export interface MinorDashboardProps {
  setIsLoggedIn: (value: boolean) => void;
}

export interface EducationalContentProps {
  setIsLoggedIn: (value: boolean) => void;
}

export interface CommunityEngagementProps {
  setIsLoggedIn: (value: boolean) => void;
}

export interface BuySellProps {
  setIsLoggedIn: (value: boolean) => void;
  userType: 'minor' | 'investor' | 'admin' | null;
}

export interface GoldStorageProps {
  setIsLoggedIn: (value: boolean) => void;
  userType: 'minor' | 'investor' | 'admin' | null;
}

export interface WalletProps {
  setIsLoggedIn: (value: boolean) => void;
  userType: 'minor' | 'investor' | 'admin' | null;
  darkMode: boolean;
  toggleMode: () => void;
}

export interface ProfileProps {
  setIsLoggedIn: (value: boolean) => void;
  userType: 'minor' | 'investor' | 'admin' | null;
  darkMode: boolean;
  toggleMode: () => void;
}

export interface ResetPasswordProps {
  darkMode: boolean;
  toggleMode: () => void;
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: LoginProps;
  SignUp: undefined;
  ResetPassword: undefined;
  KYC: { setIsLoggedIn: (value: boolean) => void };
  AdminDashboard: undefined;
  InvestorDashboard: undefined;
  MinorDashboard: undefined;
  EducationalContent: undefined;
  CommunityEngagement: undefined;
  BuySell: undefined;
  Wallet: undefined;
  GoldStorage: undefined;
  Profile: { setIsLoggedIn: (value: boolean) => void };
  FAQ: undefined;
  Terms: undefined;
  Logout: undefined;
  Nav: undefined;
};