import { Dispatch, SetStateAction } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

interface BaseProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  toggleMode: () => Promise<void>;
}

export type RootStackParamList = {
  Welcome: Partial<WelcomeProps>;
  Login: Partial<LoginProps>;
  SignUp: Partial<SignUpProps>;
  ResetPassword: Partial<ResetPasswordProps>;
  KYC: Partial<KYCProps>;
  AdminDashboard: Partial<AdminDashboardProps>;
  InvestorDashboard: Partial<InvestorDashboardProps>;
  MinorDashboard: Partial<MinorDashboardProps>;
  EducationalContent: Partial<EducationalContentProps>;
  CommunityEngagement: Partial<CommunityEngagementProps>;
  BuySell: Partial<BuySellProps>;
  Wallet: Partial<WalletProps>;
  GoldStorage: Partial<GoldStorageProps>;
  Profile: Partial<ProfileProps>;
  FAQ: Partial<FAQProps>;
  Terms: undefined;
  Logout: undefined;
  Nav: Partial<NavProps>;
};

export interface ProtectedRouteProps extends StackScreenProps<RootStackParamList, keyof RootStackParamList> {
  component: React.ComponentType<any>;
}

export interface LoginProps extends BaseProps, StackScreenProps<RootStackParamList, 'Login'> {}
export interface NavProps extends BaseProps {
  userType: 'minor' | 'investor' | 'admin' | null;
}
export interface WelcomeProps extends BaseProps, StackScreenProps<RootStackParamList, 'Welcome'> {}
export interface SignUpProps extends BaseProps, StackScreenProps<RootStackParamList, 'SignUp'> {}
export interface AdminDashboardProps extends BaseProps, StackScreenProps<RootStackParamList, 'AdminDashboard'> {
  userType: 'minor' | 'investor' | 'admin' | null;
}
export interface InvestorDashboardProps extends BaseProps, StackScreenProps<RootStackParamList, 'InvestorDashboard'> {}
export interface MinorDashboardProps extends BaseProps, StackScreenProps<RootStackParamList, 'MinorDashboard'> {}
export interface EducationalContentProps extends BaseProps, StackScreenProps<RootStackParamList, 'EducationalContent'> {
  userType: 'minor' | 'investor' | 'admin' | null;
}
export interface CommunityEngagementProps extends BaseProps, StackScreenProps<RootStackParamList, 'CommunityEngagement'> {
  userType: 'minor' | 'investor' | 'admin' | null;
}
export interface BuySellProps extends BaseProps, StackScreenProps<RootStackParamList, 'BuySell'> {
  userType: 'investor' | 'admin' | null;
}
export interface GoldStorageProps extends BaseProps, StackScreenProps<RootStackParamList, 'GoldStorage'> {
  userType: 'investor' | 'admin' | null;
}
export interface WalletProps extends BaseProps, StackScreenProps<RootStackParamList, 'Wallet'> {
  userType: 'investor' | 'admin' | null;
}
export interface ProfileProps extends BaseProps, StackScreenProps<RootStackParamList, 'Profile'> {
  userType: 'minor' | 'investor' | 'admin' | null;
}
export interface ResetPasswordProps extends BaseProps, StackScreenProps<RootStackParamList, 'ResetPassword'> {
  darkMode: boolean;
  toggleMode: () => Promise<void>;
}
export interface FAQProps extends BaseProps, StackScreenProps<RootStackParamList, 'FAQ'> {
  userType: 'minor' | 'investor' | 'admin' | null;
}
export interface KYCProps extends BaseProps, StackScreenProps<RootStackParamList, 'KYC'> {}