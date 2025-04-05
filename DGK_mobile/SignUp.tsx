import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Switch, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './types';

interface SignUpProps {
  setIsLoggedIn: (value: boolean) => void;
}

interface Message {
  text: string;
  type: 'success' | 'error' | '';
}

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

const SignUp: React.FC<SignUpProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userType, setUserType] = useState<string>('investor');
  const [message, setMessage] = useState<Message>({ text: '', type: '' });
  const [darkMode, setDarkMode] = useState<boolean>(false); 
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignUp'>>();

  const toggleMode = () => setDarkMode(prev => !prev); 

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setMessage({ text: "Passwords don't match!", type: 'error' });
      return;
    }

    try {
      setMessage({ text: 'Sign up successful! Proceeding to KYC...', type: 'success' });
      await AsyncStorage.setItem('userType', userType);
      await AsyncStorage.setItem('pendingEmail', email);
      await AsyncStorage.setItem('pendingPassword', password);
      console.log('Sign up attempted with:', { email, password, userType });

      setTimeout(() => {
        navigation.navigate('KYC', { setIsLoggedIn });
        setMessage({ text: '', type: '' });
      }, 2000);
    } catch (error) {
      console.error('Error saving signup data:', error);
      setMessage({ text: 'An error occurred during signup.', type: 'error' });
    }
  };

  return (
    <View className={`flex-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <View className="flex-1 p-5 justify-center">
        <Text className="text-2xl font-bold text-[#050142] mb-5 text-center">Sign Up</Text>
        {message.text ? (
          <Text
            className={`text-center text-base mb-4 ${
              message.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message.text}
          </Text>
        ) : null}

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

          <Text className="text-lg text-[#454545] mb-2">Confirm Password:</Text>
          <TextInput
            className="border border-gray-300 p-2 rounded-md mb-4 text-[#45466]45]"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            accessibilityLabel="Confirm password input"
          />

          <TouchableOpacity
            className="p-3 bg-[#050142] rounded-md"
            onPress={handleSubmit}
            accessibilityLabel="Sign Up for DigiKoin"
          >
            <Text className="text-white text-center text-base font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Links */}
        <TouchableOpacity onPress={() => navigation.navigate('Login', { setIsLoggedIn })}>
          <Text className="text-blue-600 text-center mb-2">Already have an account? Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
          <Text className="text-blue-600 text-center">
            By signing up, you agree to our Terms and Conditions
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;