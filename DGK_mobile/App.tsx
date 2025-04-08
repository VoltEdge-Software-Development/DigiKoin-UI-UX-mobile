import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './types';
import { Text } from 'react-native';
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
          navigation.replace('Welcome', { setIsLoggedIn, darkMode: false, toggleMode });
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
      handleLogout();
    }, [navigation]);
    return null;
  };

  type ProtectedRouteProps<K extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, K> & {
    component: React.ComponentType<any>;
  };

  const ProtectedRoute = <K extends keyof RootStackParamList>({ component: Component, ...props }: ProtectedRouteProps<K>) => {
    if (!isLoggedIn || !kycVerified) {
      return <Login {...(props as StackScreenProps<RootStackParamList, 'Login'>)} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} toggleMode={toggleMode} />;
    }

    const allowedMinorAndAdminRoutes = ['MinorDashboard', 'EducationalContent', 'CommunityEngagement'];
    const universalRoutes = ['Profile', 'FAQ', 'Terms'];

    if (userType === 'investor' && allowedMinorAndAdminRoutes.includes(props.route.name)) {
      return <Text style={{ color: darkMode ? '#fff' : '#000' }}>You do not have access to this page.</Text>;
    }

    return (
      <Component
        {...props}
        setIsLoggedIn={setIsLoggedIn}
        darkMode={darkMode}
        toggleMode={toggleMode}
        userType={userType}
      />
    );
  };

  type PublicRouteProps<K extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, K> & {
    component: React.ComponentType<any>;
    restricted?: boolean;
  };

  const PublicRoute = <K extends keyof RootStackParamList>({
    component: Component,
    restricted,
    ...props
  }: PublicRouteProps<K>) => {
    if (restricted && isLoggedIn && kycVerified) {
      if (userType === 'admin') {
        return (
          <AdminDashboard
            {...(props as StackScreenProps<RootStackParamList, 'AdminDashboard'>)}
            setIsLoggedIn={setIsLoggedIn}
            darkMode={darkMode}
            toggleMode={toggleMode}
            userType={userType}
          />
        );
      } else if (userType === 'investor') {
        return (
          <InvestorDashboard
            {...(props as StackScreenProps<RootStackParamList, 'InvestorDashboard'>)}
            setIsLoggedIn={setIsLoggedIn}
            darkMode={darkMode}
            toggleMode={toggleMode}
          />
        );
      } else if (userType === 'minor') {
        return (
          <MinorDashboard
            {...(props as StackScreenProps<RootStackParamList, 'MinorDashboard'>)}
            setIsLoggedIn={setIsLoggedIn}
            darkMode={darkMode}
            toggleMode={toggleMode}
          />
        );
      }
    }
    return (
      <Component
        {...props}
        setIsLoggedIn={setIsLoggedIn}
        darkMode={darkMode}
        toggleMode={toggleMode}
      />
    );
  };

  const HomeRoute: React.FC<StackScreenProps<RootStackParamList, 'Welcome'>> = (props) => {
    const { navigation } = props;

    useEffect(() => {
      if (isLoggedIn && kycVerified) {
        if (userType === 'admin') {
          navigation.replace('AdminDashboard', { setIsLoggedIn, darkMode, toggleMode });
        } else if (userType === 'investor') {
          navigation.replace('InvestorDashboard', { setIsLoggedIn, darkMode, toggleMode });
        } else if (userType === 'minor') {
          navigation.replace('MinorDashboard', { setIsLoggedIn, darkMode, toggleMode });
        }
      }
    }, [navigation, isLoggedIn, kycVerified, userType]);

    return <Welcome {...props} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} toggleMode={toggleMode} />;
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
        <Stack.Screen
          name="Login"
          component={(props: StackScreenProps<RootStackParamList, 'Login'>) => (
            <PublicRoute restricted component={Login} {...props} />
          )}
        />
        <Stack.Screen
          name="SignUp"
          component={(props: StackScreenProps<RootStackParamList, 'SignUp'>) => (
            <PublicRoute restricted component={SignUp} {...props} />
          )}
        />
        <Stack.Screen
          name="ResetPassword"
          component={(props: StackScreenProps<RootStackParamList, 'ResetPassword'>) => (
            <ResetPassword {...props} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} toggleMode={toggleMode} />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KYC"
          component={(props: StackScreenProps<RootStackParamList, 'KYC'>) => (
            <KYC {...props} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} toggleMode={toggleMode} />
          )}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={(props: StackScreenProps<RootStackParamList, 'AdminDashboard'>) => (
            <ProtectedRoute component={AdminDashboard} {...props} />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InvestorDashboard"
          component={(props: StackScreenProps<RootStackParamList, 'InvestorDashboard'>) => (
            <ProtectedRoute component={InvestorDashboard} {...props} />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MinorDashboard"
          component={(props: StackScreenProps<RootStackParamList, 'MinorDashboard'>) => (
            <ProtectedRoute component={MinorDashboard} {...props} />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EducationalContent"
          component={(props: StackScreenProps<RootStackParamList, 'EducationalContent'>) => (
            <ProtectedRoute component={EducationalContent} {...props} />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CommunityEngagement"
          component={(props: StackScreenProps<RootStackParamList, 'CommunityEngagement'>) => (
            <ProtectedRoute component={CommunityEngagement} {...props} />
          )}
          options={{ headerShown: false }}
        />
        {userType !== 'minor' && (
          <>
            <Stack.Screen
              name="BuySell"
              component={(props: StackScreenProps<RootStackParamList, 'BuySell'>) => (
                <ProtectedRoute component={BuySell} {...props} />
              )}
              options={{ headerShown: false }}
              initialParams={{ userType: userType as 'investor' | 'admin' | null }}
            />
            <Stack.Screen
              name="Wallet"
              component={(props: StackScreenProps<RootStackParamList, 'Wallet'>) => (
                <ProtectedRoute component={Wallet} {...props} />
              )}
              options={{ headerShown: false }}
              initialParams={{ userType: userType as 'investor' | 'admin' | null }}
            />
            <Stack.Screen
              name="GoldStorage"
              component={(props: StackScreenProps<RootStackParamList, 'GoldStorage'>) => (
                <ProtectedRoute component={GoldStorage} {...props} />
              )}
              options={{ headerShown: false }}
              initialParams={{ userType: userType as 'investor' | 'admin' | null }}
            />
          </>
        )}
        <Stack.Screen
          name="Profile"
          component={(props: StackScreenProps<RootStackParamList, 'Profile'>) => (
            <ProtectedRoute component={Profile} {...props} />
          )}
          options={{ headerShown: false }}
          initialParams={{ userType }}
        />
        <Stack.Screen
          name="FAQ"
          component={(props: StackScreenProps<RootStackParamList, 'FAQ'>) => (
            <ProtectedRoute component={FAQ} {...props} />
          )}
          options={{ headerShown: false }}
          initialParams={{ userType }}
        />
        <Stack.Screen
          name="Terms"
          component={(props: StackScreenProps<RootStackParamList, 'Terms'>) => (
            <ProtectedRoute component={Terms} {...props} />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        <Stack.Screen
          name="Nav"
          component={(props: StackScreenProps<RootStackParamList, 'Nav'>) => (
            <Nav {...props} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} toggleMode={toggleMode} userType={userType} />
          )}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;