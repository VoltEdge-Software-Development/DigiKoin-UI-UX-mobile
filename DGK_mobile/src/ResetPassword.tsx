import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types'; // Adjust path based on your types file

type ResetPasswordNavigationProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>;

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigation = useNavigation<ResetPasswordNavigationProp>();

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-200/85"
    >
      <View className="flex-1 justify-center p-5 mt-[70px]">
        <Text className="text-3xl font-bold text-[#050142] mb-5 text-center">
          Reset Password
        </Text>
        {message ? (
          <Text className="text-base text-[#454545] mb-5 text-center" accessibilityLabel={message}>
            {message}
          </Text>
        ) : null}
        <Text className="text-lg text-[#454545] mb-2">Email:</Text>
        <TextInput
          className="border border-[#454545] rounded-[10px] p-3 mb-5 text-[#454545] bg-white/10"
          placeholder="Enter your email"
          placeholderTextColor="#454545"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email input"
          accessibilityHint="Enter your email address to reset your password"
          aria-describedby={message ? 'reset-message' : undefined}
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
  );
};

export default ResetPassword;