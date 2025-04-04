import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, LoginProps } from './types';

// Define Header props type
interface HeaderProps {
  darkMode: boolean;
  toggleMode: () => void;
}

// Header Component
const Header: React.FC<HeaderProps> = ({ darkMode, toggleMode }) => {
  return (
    <View
      className={`w-full flex-row items-center justify-between p-5 shadow-md fixed top-0 left-0 z-[1000] min-h-[70px] ${
        darkMode ? 'bg-[#333333]/95' : 'bg-[#111111]/80'
      }`}
      style={{ elevation: 4 }}
    >
      <Image
        source={require('../assets/Gorilla.png')}
        className="w-[50px] h-[50px] ml-5"
        resizeMode="contain"
        accessibilityLabel="DigiKoin Logo"
      />
      <Text
        className={`text-[24px] font-bold flex-1 mr-auto ${
          darkMode ? 'text-[#FFB84D]' : 'text-[#B36300]'
        }`}
      >
        DigiKoin
      </Text>
      <Switch
        value={darkMode}
        onValueChange={toggleMode}
        thumbColor={darkMode ? '#FFFFFF' : '#050142'}
        trackColor={{ false: '#CCC', true: darkMode ? '#FFB84D' : '#AEADAD' }}
        className="mr-5"
        accessibilityLabel="Toggle Dark Mode"
      />
    </View>
  );
};

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userType, setUserType] = useState<string>('investor');
  const [error, setError] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false); 
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  const toggleMode = () => setDarkMode(prev => !prev); 

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
        navigation.replace('AdminDashboard');
      } else {
        const isKycVerified = (await AsyncStorage.getItem('kycVerified')) === 'true';
        if (!isKycVerified) {
          navigation.replace('KYC', { setIsLoggedIn }); 
        } else {
          switch (userType) {
            case 'investor':
              navigation.replace('InvestorDashboard');
              break;
            case 'minor':
              navigation.replace('MinorDashboard');
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
          navigation.replace('AdminDashboard');
        } else {
          const isKycVerified = (await AsyncStorage.getItem('kycVerified')) === 'true';
          if (!isKycVerified) {
            navigation.replace('KYC', { setIsLoggedIn });
          } else {
            switch (userType) {
              case 'investor':
                navigation.replace('InvestorDashboard');
                break;
              case 'minor':
                navigation.replace('MinorDashboard');
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
    <View className={`flex-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <View className="flex-1 p-5 justify-center">
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
              accessibilityIgnoresInvertColors
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAltLogin('Apple')} accessibilityLabel="Login with Apple">
            <Image
              source={require('../images/apple-logo.png')}
              style={{ width: 40, height: 40 }}
              accessibilityIgnoresInvertColors
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAltLogin('Facebook')} accessibilityLabel="Login with Facebook">
            <Image
              source={require('../images/facebook-logo.png')}
              style={{ width: 40, height: 40 }}
              accessibilityIgnoresInvertColors
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAltLogin('MetaMask')} accessibilityLabel="Login with MetaMask">
            <Image
              source={require('../images/metamask-logo.png')}
              style={{ width: 40, height: 40 }}
              accessibilityIgnoresInvertColors
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
    </View>
  );
};

export default Login;