import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import Welcome from './Welcome';
import Login from './Login';
import SignUp from './SignUp';
import KYC from './KYC';
import InvestorDashboard from './InvestorDashboard';
import MinorDashboard from './MinorDashboard';
import BuySell from './BuySell';
import Wallet from './Wallet';
import GoldStorage from './GoldStorage';
import FAQ from './FAQ';
import Terms from './Terms';
import ResetPassword from './ResetPassword';
import AdminDashboard from './AdminDashboard';
import Profile from './Profile';
import Nav from './Nav';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: '#050142' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="KYC" component={KYC} />
        <Stack.Screen name="InvestorDashboard" component={InvestorDashboard} />
        <Stack.Screen name="MinorDashboard" component={MinorDashboard} />
        <Stack.Screen name="BuySell" component={BuySell} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="GoldStorage" component={GoldStorage} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Nav" component={Nav} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;