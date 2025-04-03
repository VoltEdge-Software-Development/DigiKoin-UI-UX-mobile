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
  const [userType, setUserType] = useState<'minor' | 'investor' | 'admin' | null>(null);

useEffect(() => {
  const loadUserType = async () => {
    const storedType = await AsyncStorage.getItem('userType');
    setUserType(storedType as 'minor' | 'investor' | 'admin' | null);
  };
  loadUserType();
}, []);

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [kycVerified, setKycVerified] = useState<boolean>(false);
  const [userType, setUserType] = useState<string | null>(null);

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
        setUserType(storedUserType);
      } catch (error) {
        console.error('Error loading AsyncStorage:', error);
      }
    };
    initializeState();
  }, []);

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

  const HeaderWrapper: React.FC<{ routeName: string }> = ({ routeName }) => {
    const showHeader = !isLoggedIn || !kycVerified || ['Welcome', 'Login'].includes(routeName);
    return showHeader ? <Header darkMode={darkMode} toggleMode={toggleMode} /> : null;
  };

  const Logout: React.FC<StackScreenProps<RootStackParamList, 'Logout'>> = ({ navigation }) => {
    useEffect(() => {
      const handleLogout = async () => {
        try {
          await AsyncStorage.multiRemove(['isLoggedIn', 'kycVerified', 'userType']);
          setIsLoggedIn(false);
          setKycVerified(false);
          setUserType(null);
          navigation.replace('Login', { setIsLoggedIn });
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
      handleLogout();
    }, [navigation]);
    return null;
  };

  const ProtectedRoute = ({ component: Component, setIsLoggedIn, ...rest }: { component: React.FC<any>; setIsLoggedIn: (value: boolean) => void } & StackScreenProps<RootStackParamList>) => {
    const routeName = rest.route.name;
    const allowedMinorRoutes = ['MinorDashboard', 'EducationalContent', 'CommunityEngagement'];
  
    if (!isLoggedIn || !kycVerified) {
      return <Login {...rest} setIsLoggedIn={setIsLoggedIn} />;
    }
    if (userType !== 'minor' && allowedMinorRoutes.includes(routeName)) {
      return <Text>You do not have access to this page.</Text>;
    }
    return <Component {...rest} setIsLoggedIn={setIsLoggedIn} userType={userType} />;
  };

  const PublicRoute = ({ component: Component, restricted, ...rest }: { component: React.FC<any>; restricted?: boolean } & StackScreenProps<RootStackParamList>) => {
    if (restricted && isLoggedIn && kycVerified) {
      if (userType === 'admin') {
        return <AdminDashboard {...rest} />;
      } else if (userType === 'investor') {
        return <InvestorDashboard {...rest} />;
      } else if (userType === 'minor') {
        return <MinorDashboard {...rest} />;
      } else {
        return <Login {...rest} setIsLoggedIn={setIsLoggedIn} />;
      }
    }
    return <Component {...rest} setIsLoggedIn={setIsLoggedIn} />;
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
        } else {
          navigation.replace('Login', { setIsLoggedIn });
        }
      }
    }, [navigation, isLoggedIn, kycVerified, userType]);

    return <Welcome setIsLoggedIn={setIsLoggedIn} />;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#050142' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          cardStyle: { backgroundColor: darkMode ? '#1a1a1a' : 'rgba(128, 128, 128, 0.85)' },
          header: () => <HeaderWrapper routeName={route.name} />,
        })}
      >
        <Stack.Screen name="Welcome" component={HomeRoute} />
        <Stack.Screen
          name="Login"
          component={(props) => <PublicRoute restricted component={Login} setIsLoggedIn={setIsLoggedIn} {...props} />}
        />
        <Stack.Screen
          name="SignUp"
          component={(props) => <PublicRoute restricted component={SignUp} {...props} />}
        />
        <Stack.Screen
          name="ResetPassword"
          component={(props) => <PublicRoute restricted component={ResetPassword} {...props} />}
        />
        <Stack.Screen
          name="KYC"
          component={(props) => <KYC setIsLoggedIn={setIsLoggedIn} {...props} />}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={(props) => <ProtectedRoute component={AdminDashboard} setIsLoggedIn={setIsLoggedIn} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InvestorDashboard"
          component={(props) => <ProtectedRoute component={InvestorDashboard} setIsLoggedIn={setIsLoggedIn} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MinorDashboard"
          component={(props) => (
            <ProtectedRoute component={MinorDashboard} setIsLoggedIn={setIsLoggedIn} {...props} />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EducationalContent"
          component={(props) => <ProtectedRoute component={EducationalContent} setIsLoggedIn={setIsLoggedIn} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
           name="CommunityEngagement"
          component={(props) => <ProtectedRoute component={CommunityEngagement} setIsLoggedIn={setIsLoggedIn} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BuySell"
          component={(props) => <ProtectedRoute component={BuySell} setIsLoggedIn={setIsLoggedIn} {...props} />}
          options={{ headerShown: false }}
        />
       <Stack.Screen
          name="Wallet"
          component={(props) => <ProtectedRoute component={Wallet} setIsLoggedIn={setIsLoggedIn} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GoldStorage"
          component={(props) => <ProtectedRoute component={GoldStorage} setIsLoggedIn={setIsLoggedIn} {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={(props) => <ProtectedRoute component={Profile} setIsLoggedIn={setIsLoggedIn} {...props} />}
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
          component={(props) => <Nav darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} userType={userType} {...props} />}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;