import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
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

const SignUp: React.FC<SignUpProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userType, setUserType] = useState<string>('investor');
  const [message, setMessage] = useState<Message>({ text: '', type: '' });
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignUp'>>();

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
    <View className="flex-1 p-5 bg-gray-100 justify-center">
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
          className="border border-gray-300 p-2 rounded-md mb-4 text-[#454545]"
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
  );
};

export default SignUp;