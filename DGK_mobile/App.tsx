import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './types';
import Header from './Header';
import Nav from './Nav';
import Welcome from './Welcome';
import Login from './Login';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import KYC from './KYC';
import AdminDashboard from './AdminDashboard';
import InvestorDashboard from './InvestorDashboard';
import MinorDashboard from './MinorDashboard';
import BuySell from './BuySell';
import Wallet from './Wallet';
import GoldStorage from './GoldStorage';
import Profile from './Profile';
import FAQ from './FAQ';
import Terms from './Terms';
import EducationalContent from './EducationalContent';
import CommunityEngagement from './CommunityEngagement';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [kycVerified, setKycVerified] = useState<boolean>(false);
  const [userType, setUserType] = useState<'minor' | 'investor' | 'admin' | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const initializeState = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('darkMode');
        const storedLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const storedKycVerified = await AsyncStorage.getItem('kycVerified');
        const storedUserType = await AsyncStorage.getItem('userType');

        if (storedDarkMode !== null) setDarkMode(storedDarkMode === 'true');
        if (storedLoggedIn !== null) setIsLoggedIn(storedLoggedIn === 'true');
        if (storedKycVerified !== null) setKycVerified(storedKycVerified === 'true');
        setUserType(storedUserType as 'minor' | 'investor' | 'admin' | null);
      } catch (error) {
        console.error('Error loading AsyncStorage:', error);
      }
    };
    initializeState();
  }, []);

  const toggleMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    try {
      await AsyncStorage.setItem('darkMode', newMode.toString());
    } catch (error) {
      console.error('Error saving darkMode:', error);
    }
  };

  const HeaderWrapper: React.FC<{ routeName: string }> = ({ routeName }) => {
    const publicRoutes = ['Welcome', 'Login', 'SignUp', 'ResetPassword', 'KYC'];
    return publicRoutes.includes(routeName) ? <Header darkMode={darkMode} toggleMode={toggleMode} /> : null;
  };

  const Logout: React.FC<StackScreenProps<RootStackParamList, 'Logout'>> = ({ navigation }) => {
    useEffect(() => {
      const handleLogout = async () => {
        try {
          await AsyncStorage.multiRemove(['isLoggedIn', 'kycVerified', 'userType', 'darkMode']);
          setIsLoggedIn(false);
          setKycVerified(false);
          setUserType(null);
          setDarkMode(false);
          navigation.replace('Welcome');
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
      handleLogout();
    }, [navigation]);
    return null;
  };

  type ProtectedRouteProps = StackScreenProps<RootStackParamList> & {
    component: React.FC<any>;
    setIsLoggedIn: (value: boolean) => void;
  };

  const ProtectedRoute = ({ component: Component, ...rest }: ProtectedRouteProps) => {
    const { route } = rest;
    const allowedMinorRoutes = ['MinorDashboard', 'EducationalContent', 'CommunityEngagement', 'Profile', 'FAQ', 'Terms'];

    if (!isLoggedIn || !kycVerified) {
      return <Login {...rest} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} toggleMode={toggleMode} />;
    }

    // Restrict non-minors from minor-specific routes
    if (userType !== 'minor' && allowedMinorRoutes.includes(route.name) && route.name !== 'Profile' && route.name !== 'FAQ' && route.name !== 'Terms') {
      return (
        <Text style={{ color: darkMode ? '#fff' : '#000' }}>You do not have access to this page.</Text>
      );
    }

    return (
      <Component
        {...rest}
        setIsLoggedIn={setIsLoggedIn}
        userType={userType}
        darkMode={darkMode}
        toggleMode={toggleMode}
      />
    );
  };

  type PublicRouteProps = StackScreenProps<RootStackParamList> & {
    component: React.FC<any>;
    restricted?: boolean;
  };

  const PublicRoute = ({ component: Component, restricted, ...rest }: PublicRouteProps) => {
    if (restricted && isLoggedIn && kycVerified) {
      if (userType === 'admin') {
        return <AdminDashboard setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} toggleMode={toggleMode} />;
      } else if (userType === 'investor') {
        return <InvestorDashboard setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} toggleMode={toggleMode} />;
      } else if (userType === 'minor') {
        return <MinorDashboard setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} toggleMode={toggleMode} />;
      }
    }
    return (
      <Component
        {...rest}
        setIsLoggedIn={setIsLoggedIn}
        darkMode={darkMode}
        toggleMode={toggleMode}
      />
    );
  };

  const HomeRoute: React.FC<StackScreenProps<RootStackParamList, 'Welcome'>> = ({ navigation }) => {
    useEffect(() => {
      if (isLoggedIn && kycVerified) {
        if (userType === 'admin') {
          navigation.replace('AdminDashboard');
        } else if (userType === 'investor') {
          navigation.replace('InvestorDashboard');
        } else if (userType === 'minor') {
          navigation.replace('MinorDashboard');
        }
      }
    }, [navigation, isLoggedIn, kycVerified, userType]);

    return <Welcome setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} toggleMode={toggleMode} />;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#050142' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          cardStyle: { backgroundColor: darkMode ? '#1a1a1a' : '#e5e7eb' },
          header: () => <HeaderWrapper routeName={route.name} />,
        })}
      >
        <Stack.Screen name="Welcome" component={HomeRoute} />
        <Stack.Screen name="Login" component={(props) => <PublicRoute restricted component={Login} {...props} />} />
        <Stack.Screen name="SignUp" component={(props) => <PublicRoute restricted component={SignUp} {...props} />} />
        <Stack.Screen
          name="ResetPassword"
          component={(props) => <ResetPassword {...props} darkMode={darkMode} toggleMode={toggleMode} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KYC"
          component={(props) => <KYC setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} toggleMode={toggleMode} />}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={ProtectedRoute}
          options={{ headerShown: false }}
          initialParams={{ component: AdminDashboard }}
        />
        <Stack.Screen
          name="InvestorDashboard"
          component={ProtectedRoute}
          options={{ headerShown: false }}
          initialParams={{ component: InvestorDashboard }}
        />
        <Stack.Screen
          name="MinorDashboard"
          component={ProtectedRoute}
          options={{ headerShown: false }}
          initialParams={{ component: MinorDashboard }}
        />
        <Stack.Screen
          name="EducationalContent"
          component={ProtectedRoute}
          options={{ headerShown: false }}
          initialParams={{ component: EducationalContent }}
        />
        <Stack.Screen
          name="CommunityEngagement"
          component={ProtectedRoute}
          options={{ headerShown: false }}
          initialParams={{ component: CommunityEngagement }}
        />
        {userType !== 'minor' && (
          <>
            <Stack.Screen
              name="BuySell"
              component={ProtectedRoute}
              options={{ headerShown: false }}
              initialParams={{ component: BuySell }}
            />
            <Stack.Screen
              name="Wallet"
              component={ProtectedRoute}
              options={{ headerShown: false }}
              initialParams={{ component: Wallet }}
            />
            <Stack.Screen
              name="GoldStorage"
              component={ProtectedRoute}
              options={{ headerShown: false }}
              initialParams={{ component: GoldStorage }}
            />
          </>
        )}
        <Stack.Screen
          name="Profile"
          component={ProtectedRoute}
          options={{ headerShown: false }}
          initialParams={{ component: Profile }}
        />
        <Stack.Screen
          name="FAQ"
          component={ProtectedRoute}
          options={{ headerShown: false }}
          initialParams={{ component: FAQ }}
        />
        <Stack.Screen
          name="Terms"
          component={ProtectedRoute}
          options={{ headerShown: false }}
          initialParams={{ component: Terms }}
        />
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        <Stack.Screen
          name="Nav"
          component={(props) => <Nav darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} userType={userType} {...props} />}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;