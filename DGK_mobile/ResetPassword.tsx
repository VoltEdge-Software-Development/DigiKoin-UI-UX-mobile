import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ResetPasswordProps } from './types'; // Import from types.ts
import Header from './Header';

const ResetPassword: React.FC<ResetPasswordProps> = ({ setIsLoggedIn, darkMode, toggleMode }) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ResetPassword'>>();
  const emailRef = useRef<TextInput>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const resetPassword = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setMessage({ text: 'Please enter your email.', type: 'error' });
      return;
    }
    if (!emailRegex.test(email)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    try {
      // Simulate API call (replace with real endpoint)
      setMessage({ text: 'Password reset link has been sent to your email.', type: 'success' });
      navigation.navigate('Login', { setIsLoggedIn, darkMode, toggleMode });
      setMessage({ text: '', type: '' });
      setEmail('');
    } catch (error) {
      console.error('Reset password error:', error);
      setMessage({ text: 'Failed to send reset link. Please try again.', type: 'error' });
    }
  };

  return (
    <View className={`flex-1 ${darkMode ? 'bg-gray-800/85' : 'bg-gray-200/85'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <View className="flex-1 justify-center p-5 mt-[70px]">
          <Text
            className={`text-3xl font-bold mb-5 text-center ${darkMode ? 'text-white' : 'text-[#050142]'}`}
          >
            Reset Password
          </Text>
          {message.text && (
            <Text
              className={`text-base mb-5 text-center ${
                message.type === 'success' ? 'text-green-400' : 'text-red-500'
              }`}
              accessibilityRole="alert"
              accessibilityLabel={message.text}
            >
              {message.text}
            </Text>
          )}
          <Text className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>Email:</Text>
          <TextInput
            ref={emailRef}
            className={`border rounded-[10px] p-3 mb-5 ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-[#454545] bg-white text-[#454545]'}`}
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
            activeOpacity={0.8}
            accessibilityLabel="Submit reset password request"
          >
            <Text className="text-white text-center text-lg font-semibold">Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#B36300] rounded-[10px] p-4"
            onPress={() => navigation.navigate('Login', { setIsLoggedIn, darkMode, toggleMode })}
            activeOpacity={0.8}
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