import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define navigation stack param list
type RootStackParamList = {
  AdminDashboard: undefined;
  InvestorDashboard: undefined;
  MinorDashboard: undefined;
  KYC: undefined;
  ResetPassword: undefined;
  SignUp: undefined;
  Terms: undefined;
  Welcome: undefined;
};

// Define props type
interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userType, setUserType] = useState<string>('investor');
  const [error, setError] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const authenticate = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password || !userType) {
      setError('Please fill in all fields.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');

    try {
      // Simulate authentication with AsyncStorage
      await AsyncStorage.setItem('userType', userType);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);

      if (userType === 'admin') {
        await AsyncStorage.setItem('kycVerified', 'true');
        navigation.navigate('AdminDashboard');
      } else {
        const isKycVerified = (await AsyncStorage.getItem('kycVerified')) === 'true';
        if (!isKycVerified) {
          navigation.navigate('KYC');
          setIsLoggedIn(false); // Reset if KYC needed
        } else {
          switch (userType) {
            case 'investor':
              navigation.navigate('InvestorDashboard');
              break;
            case 'minor':
              navigation.navigate('MinorDashboard');
              break;
            default:
              setError('Invalid user type');
          }
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('An error occurred during login.');
    }
  };

  const handleAltLogin = (provider: string) => async () => {
    Alert.alert(`Logging in with ${provider}`, 'Coming soon!', [{ text: 'OK' }]);

    try {
      await AsyncStorage.setItem('userType', userType);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);

      setTimeout(async () => {
        if (userType === 'admin') {
          await AsyncStorage.setItem('kycVerified', 'true');
          navigation.navigate('AdminDashboard');
        } else {
          const isKycVerified = (await AsyncStorage.getItem('kycVerified')) === 'true';
          if (!isKycVerified) {
            navigation.navigate('KYC');
          } else {
            switch (userType) {
              case 'investor':
                navigation.navigate('InvestorDashboard');
                break;
              case 'minor':
                navigation.navigate('MinorDashboard');
                break;
              default:
                setError('Invalid user type');
            }
          }
        }
      }, 500);
    } catch (error) {
      console.error('Error during alt login:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <View className="flex-1 p-5 bg-gray-100 justify-center">
      <Text className="text-2xl font-bold text-[#050142] mb-5 text-center">Login</Text>
      {error ? <Text className="text-red-600 mb-4 text-center" role="alert">{error}</Text> : null}

      {/* Form */}
      <View className="bg-white p-4 rounded-lg shadow-md mb-5">
        <Text className="text-lg text-[#454545] mb-2">User Type:</Text>
        <View className="border border-gray-300 rounded-md mb-4">
          <TextInput
            className="p-2 text-[#454545]"
            value={userType}
            onChangeText={setUserType}
            placeholder="Select user type"
            selectTextOnFocus
            accessibilityLabel="Select user type"
            editable={false}
            onPressIn={() => {
              Alert.alert('Select User Type', '', [
                { text: 'Investor', onPress: () => setUserType('investor') },
                { text: 'Admin', onPress: () => setUserType('admin') },
                { text: 'Minor', onPress: () => setUserType('minor') },
                { text: 'Cancel', style: 'cancel' },
              ]);
            }}
          />
        </View>

        <Text className="text-lg text-[#454545] mb-2">Email:</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded-md mb-4 text-[#454545]"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email input"
        />

        <Text className="text-lg text-[#454545] mb-2">Password:</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded-md mb-4 text-[#454545]"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="Password input"
        />

        <TouchableOpacity
          className="p-3 bg-[#050142] rounded-md"
          onPress={authenticate}
          accessibilityLabel="Login to DigiKoin"
        >
          <Text className="text-white text-center text-base font-medium">Login</Text>
        </TouchableOpacity>
      </View>

      {/* Links */}
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text className="text-blue-600 text-center mb-2">Forgot your password? Reset it here</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text className="text-blue-600 text-center mb-2">Don't have an account? Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
        <Text className="text-blue-600 text-center mb-4">
          By logging in, you agree to our Terms and Conditions
        </Text>
      </TouchableOpacity>

      {/* Alternative Login Options */}
      <Text className="text-[#454545] text-center mb-3">Or login with:</Text>
      <View className="flex-row justify-around mb-5">
  <TouchableOpacity onPress={handleAltLogin('Google')} accessibilityLabel="Login with Google">
    <Image
      source={require('../images/google-logo.png')}
      style={{ width: 40, height: 40 }}
    />
  </TouchableOpacity>
  <TouchableOpacity onPress={handleAltLogin('Apple')} accessibilityLabel="Login with Apple">
    <Image
      source={require('../images/apple-logo.png')}
      style={{ width: 40, height: 40 }}
    />
  </TouchableOpacity>
  <TouchableOpacity onPress={handleAltLogin('Facebook')} accessibilityLabel="Login with Facebook">
    <Image
      source={require('../images/facebook-logo.png')}
      style={{ width: 40, height: 40 }}
    />
  </TouchableOpacity>
  <TouchableOpacity onPress={handleAltLogin('MetaMask')} accessibilityLabel="Login with MetaMask">
    <Image
      source={require('../images/metamask-logo.png')}
      style={{ width: 40, height: 40 }}
    />
  </TouchableOpacity>
</View>

      {/* Back Button */}
      <TouchableOpacity
        className="p-3 bg-gray-300 rounded-md"
        onPress={() => navigation.navigate('Welcome')}
        accessibilityLabel="Back to Welcome"
      >
        <Text className="text-[#454545] text-center text-base font-medium">Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;