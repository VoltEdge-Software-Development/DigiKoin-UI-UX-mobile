import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, LoginProps } from './types';
import tw from 'twrnc';
import Header from './Header';

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, darkMode, toggleMode }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userType, setUserType] = useState<string>('investor');
  const [error, setError] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  const onChangeTextWithErrorReset = (setter: React.Dispatch<string>) => (text: string) => {
    setError('');
    setter(text);
  };

  const navigateAfterLogin = useCallback(async () => {
    if (userType === 'admin') {
      await AsyncStorage.setItem('kycVerified', 'true');
      navigation.replace('AdminDashboard', { setIsLoggedIn, darkMode, toggleMode });
    } else {
      const isKycVerified = (await AsyncStorage.getItem('kycVerified')) === 'true';
      if (!isKycVerified) {
        navigation.replace('KYC', { setIsLoggedIn, darkMode, toggleMode });
      } else {
        navigation.replace(
          userType === 'investor' ? 'InvestorDashboard' : 'MinorDashboard',
          { setIsLoggedIn, darkMode, toggleMode }
        );
      }
    }
  }, [userType, navigation, setIsLoggedIn, darkMode, toggleMode]);

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
    try {
      await AsyncStorage.setItem('userType', userType);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      await navigateAfterLogin();
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('An error occurred during login.');
    }
  };

  const handleAltLogin = (provider: string) => async () => {
    Alert.alert(`Logging in with ${provider}`, 'Coming soon!', [{ text: 'OK' }]);
    await authenticate();
  };

  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <View style={tw`flex-1 p-5 justify-center`}>
        <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#050142]'} mb-5 text-center`}>Login</Text>
        {error ? <Text style={tw`text-red-600 mb-4 text-center`} role="alert">{error}</Text> : null}

        <View style={tw`p-4 rounded-lg shadow-md mb-5 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'} mb-2`}>User Type:</Text>
          <View style={tw`border border-gray-300 rounded-md mb-4`}>
            <TextInput
              style={tw`p-2 ${darkMode ? 'text-white' : 'text-[#454545]'}`}
              value={userType}
              onChangeText={onChangeTextWithErrorReset(setUserType)}
              placeholder="Select user type"
              editable={false}
              onPressIn={() => {
                Alert.alert('Select User Type', '', [
                  { text: 'Investor', onPress: () => setUserType('investor') },
                  { text: 'Admin', onPress: () => setUserType('admin') },
                  { text: 'Minor', onPress: () => setUserType('minor') },
                  { text: 'Cancel', style: 'cancel' },
                ]);
              }}
              accessibilityLabel="Select user type"
            />
          </View>

          <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'} mb-2`}>Email:</Text>
          <TextInput
            style={tw`border border-gray-300 p-2 rounded-md mb-4 ${darkMode ? 'text-white' : 'text-[#454545]'}`}
            placeholder="Enter your email"
            value={email}
            onChangeText={onChangeTextWithErrorReset(setEmail)}
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email input"
          />

          <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'} mb-2`}>Password:</Text>
          <TextInput
            style={tw`border border-gray-300 p-2 rounded-md mb-4 ${darkMode ? 'text-white' : 'text-[#454545]'}`}
            placeholder="Enter your password"
            value={password}
            onChangeText={onChangeTextWithErrorReset(setPassword)}
            secureTextEntry
            accessibilityLabel="Password input"
          />

          <TouchableOpacity
            style={tw`p-3 bg-[#050142] rounded-md`}
            onPress={authenticate}
            accessibilityLabel="Login to DigiKoin"
          >
            <Text style={tw`text-white text-center text-base font-medium`}>Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword', { setIsLoggedIn, darkMode, toggleMode })}>
          <Text style={tw`text-blue-600 text-center mb-2`}>Forgot your password? Reset it here</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp', { setIsLoggedIn, darkMode, toggleMode })}>
          <Text style={tw`text-blue-600 text-center mb-2`}>Don’t have an account? Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
          <Text style={tw`text-blue-600 text-center mb-4`}>By logging in, you agree to our Terms and Conditions</Text>
        </TouchableOpacity>

        <Text style={tw`${darkMode ? 'text-gray-300' : 'text-[#454545]'} text-center mb-3`}>Or login with:</Text>
        <View style={tw`flex-row justify-around mb-5`}>
          <TouchableOpacity onPress={handleAltLogin('Google')} accessibilityLabel="Login with Google">
            <Image source={require('../images/google-logo.png')} style={tw`w-10 h-10`} accessibilityIgnoresInvertColors />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAltLogin('Apple')} accessibilityLabel="Login with Apple">
            <Image source={require('../images/apple-logo.png')} style={tw`w-10 h-10`} accessibilityIgnoresInvertColors />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAltLogin('Facebook')} accessibilityLabel="Login with Facebook">
            <Image source={require('../images/facebook-logo.png')} style={tw`w-10 h-10`} accessibilityIgnoresInvertColors />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAltLogin('MetaMask')} accessibilityLabel="Login with MetaMask">
            <Image source={require('../images/metamask-logo.png')} style={tw`w-10 h-10`} accessibilityIgnoresInvertColors />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={tw`p-3 bg-gray-300 rounded-md`}
          onPress={() => navigation.navigate('Welcome', { setIsLoggedIn, darkMode, toggleMode })}
          accessibilityLabel="Back to Welcome"
        >
          <Text style={tw`text-[#454545] text-center text-base font-medium`}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;