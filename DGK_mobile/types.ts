import { Dispatch, SetStateAction } from 'react';

// Base props shared across most components
interface BaseProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  toggleMode: () => Promise<void>;
}

// Component-specific prop interfaces
export interface LoginProps extends BaseProps {}

export interface NavProps extends BaseProps {
  userType: 'minor' | 'investor' | 'admin' | null;
}

export interface WelcomeProps extends BaseProps {}

export interface SignUpProps extends BaseProps {}

export interface AdminDashboardProps extends BaseProps {}

export interface InvestorDashboardProps extends BaseProps {}

export interface MinorDashboardProps extends BaseProps {}

export interface EducationalContentProps extends BaseProps {}

export interface CommunityEngagementProps extends BaseProps {}

export interface BuySellProps extends BaseProps {
  userType: 'investor' | 'admin' | null; // Excludes 'minor'
}

export interface GoldStorageProps extends BaseProps {
  userType: 'investor' | 'admin' | null; // Excludes 'minor'
}

export interface WalletProps extends BaseProps {
  userType: 'investor' | 'admin' | null; // Excludes 'minor'
}

export interface ProfileProps extends BaseProps {
  userType: 'minor' | 'investor' | 'admin' | null;
}

export interface ResetPasswordProps {
  darkMode: boolean;
  toggleMode: () => Promise<void>;
}

export interface FAQProps extends BaseProps {
  userType: 'minor' | 'investor' | 'admin' | null;
}

export interface KYCProps extends BaseProps {}

// Updated RootStackParamList to match prop interfaces
export type RootStackParamList = {
  Welcome: WelcomeProps;
  Login: LoginProps;
  SignUp: SignUpProps;
  ResetPassword: ResetPasswordProps;
  KYC: KYCProps;
  AdminDashboard: AdminDashboardProps;
  InvestorDashboard: InvestorDashboardProps;
  MinorDashboard: MinorDashboardProps;
  EducationalContent: EducationalContentProps;
  CommunityEngagement: CommunityEngagementProps;
  BuySell: BuySellProps;
  Wallet: WalletProps;
  GoldStorage: GoldStorageProps;
  Profile: ProfileProps;
  FAQ: FAQProps;
  Terms: undefined;
  Logout: undefined;
  Nav: NavProps;
};