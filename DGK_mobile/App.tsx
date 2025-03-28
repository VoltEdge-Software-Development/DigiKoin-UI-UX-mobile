import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Initialize dark mode and login state from AsyncStorage
  useEffect(() => {
    const initializeState = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('darkMode');
        const storedLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (storedDarkMode !== null) setDarkMode(storedDarkMode === 'true');
        if (storedLoggedIn !== null) setIsLoggedIn(storedLoggedIn === 'true');
      } catch (error) {
        console.error('Error loading AsyncStorage:', error);
      }
    };
    initializeState();
  }, []);

  // Update AsyncStorage when darkMode changes
  useEffect(() => {
    const updateStorage = async () => {
      try {
        await AsyncStorage.setItem('darkMode', darkMode.toString());
      } catch (error) {
        console.error('Error saving darkMode:', error);
      }
    };
    updateStorage();
  }, [darkMode]);

  const toggleMode = () => setDarkMode((prev) => !prev);

  // Header visibility logic
  const HeaderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const showHeader =
      !isLoggedIn ||
      (isLoggedIn && (await AsyncStorage.getItem('kycVerified')) !== 'true') ||
      ['Welcome', 'Login'].includes(Stack.Navigator?.state?.routeNames[Stack.Navigator?.state?.index] || '');
    return showHeader ? <Header darkMode={darkMode} toggleMode={toggleMode} /> : null;
  };

  // Logout component
  const Logout: React.FC = () => {
    useEffect(() => {
      const handleLogout = async () => {
        try {
          await AsyncStorage.multiRemove(['isLoggedIn', 'kycVerified', 'userType']);
          setIsLoggedIn(false);
          navigation.navigate('Login');
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
      handleLogout();
    }, []);
    return null;
  };

  // Protected Route Logic
  const ProtectedRoute = ({ component: Component, ...rest }: any) => {
    const checkAccess = async () => {
      const kycVerified = (await AsyncStorage.getItem('kycVerified')) === 'true';
      return isLoggedIn && kycVerified;
    };

    return checkAccess() ? <Component {...rest} /> : <Stack.Screen name="Login" component={Login} />;
  };

  // Public Route Logic
  const PublicRoute = ({ component: Component, restricted, ...rest }: any) => {
    const checkRedirect = async () => {
      const kycVerified = (await AsyncStorage.getItem('kycVerified')) === 'true';
      if (restricted && isLoggedIn && kycVerified) {
        const userType = await AsyncStorage.getItem('userType');
        switch (userType) {
          case 'admin':
            return 'AdminDashboard';
          case 'investor':
            return 'InvestorDashboard';
          case 'minor':
            return 'MinorDashboard';
          default:
            return 'Login';
        }
      }
      return null;
    };

    const redirectTo = checkRedirect();
    return redirectTo ? (
      <Stack.Screen name={redirectTo} component={getComponent(redirectTo)} />
    ) : (
      <Component {...rest} />
    );
  };

  // Home Route Logic
  const HomeRoute: React.FC = () => {
    const checkHomeRedirect = async () => {
      const kycVerified = (await AsyncStorage.getItem('kycVerified')) === 'true';
      if (isLoggedIn && kycVerified) {
        const userType = await AsyncStorage.getItem('userType');
        switch (userType) {
          case 'admin':
            return 'AdminDashboard';
          case 'investor':
            return 'InvestorDashboard';
          case 'minor':
            return 'MinorDashboard';
          default:
            return 'Login';
        }
      }
      return null;
    };

    const redirectTo = checkHomeRedirect();
    return redirectTo ? (
      <Stack.Screen name={redirectTo} component={getComponent(redirectTo)} />
    ) : (
      <Welcome />
    );
  };

  const getComponent = (name: string) => {
    switch (name) {
      case 'AdminDashboard': return AdminDashboard;
      case 'InvestorDashboard': return InvestorDashboard;
      case 'MinorDashboard': return MinorDashboard;
      case 'Login': return Login;
      default: return Welcome;
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: '#050142' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          cardStyle: { backgroundColor: darkMode ? '#1a1a1a' : 'rgba(128, 128, 128, 0.85)' }, // Dark/light mode bg
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={HomeRoute}
          options={{ header: () => <HeaderWrapper /> }}
        />
        <Stack.Screen
          name="Login"
          component={(props) => (
            <PublicRoute restricted component={Login} setIsLoggedIn={setIsLoggedIn} {...props} />
          )}
          options={{ header: () => <HeaderWrapper /> }}
        />
        <Stack.Screen
          name="SignUp"
          component={(props) => <PublicRoute restricted component={SignUp} {...props} />}
          options={{ header: () => <HeaderWrapper /> }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={(props) => <PublicRoute restricted component={ResetPassword} {...props} />}
          options={{ header: () => <HeaderWrapper /> }}
        />
        <Stack.Screen
          name="KYC"
          component={(props) => <KYC setIsLoggedIn={setIsLoggedIn} {...props} />}
          options={{ header: () => <HeaderWrapper /> }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={(props) => <ProtectedRoute component={AdminDashboard} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InvestorDashboard"
          component={(props) => <ProtectedRoute component={InvestorDashboard} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MinorDashboard"
          component={(props) => <ProtectedRoute component={MinorDashboard} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BuySell"
          component={(props) => <ProtectedRoute component={BuySell} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Wallet"
          component={(props) => <ProtectedRoute component={Wallet} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GoldStorage"
          component={(props) => <ProtectedRoute component={GoldStorage} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={(props) => (
            <ProtectedRoute component={Profile} setIsLoggedIn={setIsLoggedIn} {...props} />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FAQ"
          component={(props) => <ProtectedRoute component={FAQ} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Terms"
          component={(props) => <ProtectedRoute component={Terms} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Logout"
          component={Logout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Nav"
          component={Nav}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;