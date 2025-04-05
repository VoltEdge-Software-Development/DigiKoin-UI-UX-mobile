import { Dispatch, SetStateAction } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

// Base props shared across most components
interface BaseProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  toggleMode: () => Promise<void>;
}

// Define RootStackParamList first
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

// Component-specific prop interfaces, extending StackScreenProps where navigation is needed
export interface ProtectedRouteProps extends StackScreenProps<RootStackParamList, keyof RootStackParamList> {
  component: React.ComponentType<any>;
}

export interface LoginProps extends BaseProps, StackScreenProps<RootStackParamList, 'Login'> {}

export interface NavProps extends BaseProps {
  userType: 'minor' | 'investor' | 'admin' | null;
}

export interface WelcomeProps extends BaseProps, StackScreenProps<RootStackParamList, 'Welcome'> {}

export interface SignUpProps extends BaseProps, StackScreenProps<RootStackParamList, 'SignUp'> {}

export interface AdminDashboardProps extends BaseProps, StackScreenProps<RootStackParamList, 'AdminDashboard'> {}

export interface InvestorDashboardProps extends BaseProps, StackScreenProps<RootStackParamList, 'InvestorDashboard'> {}

export interface MinorDashboardProps extends BaseProps, StackScreenProps<RootStackParamList, 'MinorDashboard'> {}

export interface EducationalContentProps extends BaseProps, StackScreenProps<RootStackParamList, 'EducationalContent'> {}

export interface CommunityEngagementProps extends BaseProps, StackScreenProps<RootStackParamList, 'CommunityEngagement'> {}

export interface BuySellProps extends BaseProps, StackScreenProps<RootStackParamList, 'BuySell'> {
  userType: 'investor' | 'admin' | null; // Excludes 'minor'
}

export interface GoldStorageProps extends BaseProps, StackScreenProps<RootStackParamList, 'GoldStorage'> {
  userType: 'investor' | 'admin' | null; // Excludes 'minor'
}

export interface WalletProps extends BaseProps, StackScreenProps<RootStackParamList, 'Wallet'> {
  userType: 'investor' | 'admin' | null; // Excludes 'minor'
}

export interface ProfileProps extends BaseProps, StackScreenProps<RootStackParamList, 'Profile'> {
  userType: 'minor' | 'investor' | 'admin' | null;
}

export interface ResetPasswordProps extends StackScreenProps<RootStackParamList, 'ResetPassword'> {
  darkMode: boolean;
  toggleMode: () => Promise<void>;
}

export interface FAQProps extends BaseProps, StackScreenProps<RootStackParamList, 'FAQ'> {
  userType: 'minor' | 'investor' | 'admin' | null;
}

export interface KYCProps extends BaseProps, StackScreenProps<RootStackParamList, 'KYC'> {}