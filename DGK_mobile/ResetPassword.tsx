import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import Header from './Header';

interface ResetPasswordProps {
  darkMode: boolean;
  toggleMode: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ darkMode, toggleMode }) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ResetPassword'>>();

  const resetPassword = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setMessage('Please enter your email.');
      return;
    }
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    setMessage('Password reset link has been sent to your email.');
    setTimeout(() => {
      navigation.navigate('Login');
      setMessage('');
    }, 2000);
  };

  return (
    <View className={`flex-1 ${darkMode ? 'bg-gray-800/85' : 'bg-gray-200/85'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center p-5 mt-[70px]">
          <Text
            className={`text-3xl font-bold mb-5 text-center ${darkMode ? 'text-white' : 'text-[#050142]'}`}
          >
            Reset Password
          </Text>
          {message ? (
            <Text
              className={`text-base mb-5 text-center ${darkMode ? 'text-green-400' : 'text-[#454545]'}`}
              accessibilityRole="alert"
              accessibilityLabel={message}
            >
              {message}
            </Text>
          ) : null}
          <Text className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>Email:</Text>
          <TextInput
            className={`border rounded-[10px] p-3 mb-5 ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-[#454545] bg-white/10 text-[#454545]'}`}
            placeholder="Enter your email"
            placeholderTextColor={darkMode ? '#A0A0A0' : '#454545'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email input"
            accessibilityHint="Enter your email address to reset your password"
          />
          <TouchableOpacity
            className="bg-[#050142] rounded-[10px] p-4 mb-5"
            onPress={resetPassword}
            accessibilityLabel="Submit reset password request"
          >
            <Text className="text-white text-center text-lg font-semibold">Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#B36300] rounded-[10px] p-4"
            onPress={() => navigation.navigate('Login')}
            accessibilityLabel="Back to Login"
          >
            <Text className="text-white text-center text-lg font-semibold">Back to Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ResetPassword;