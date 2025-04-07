import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import { RootStackParamList, SignUpProps } from './types';

interface HeaderProps {
  darkMode: boolean;
  toggleMode: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleMode }) => {
  return (
    <View
      style={[
        tw`w-full flex-row items-center justify-between p-5 shadow-md`,
        { position: 'absolute', top: 0, left: 0, zIndex: 1000, minHeight: 70 },
        darkMode ? tw`bg-[#333333]/95` : tw`bg-[#111111]/80`,
        { elevation: 4 },
      ]}
    >
      <Image
        source={require('../assets/Gorilla.png')}
        style={tw`w-[50px] h-[50px] ml-5`}
        resizeMode="contain"
        accessibilityLabel="DigiKoin Logo"
      />
      <Text
        style={tw`text-[24px] font-bold flex-1 mr-auto ${darkMode ? 'text-[#FFB84D]' : 'text-[#B36300]'}`}
      >
        DigiKoin
      </Text>
      <Switch
        value={darkMode}
        onValueChange={toggleMode}
        thumbColor={darkMode ? '#FFFFFF' : '#050142'}
        trackColor={{ false: '#CCC', true: darkMode ? '#FFB84D' : '#AEADAD' }}
        style={tw`mr-5`}
        accessibilityLabel="Toggle Dark Mode"
      />
    </View>
  );
};

const SignUp: React.FC<SignUpProps> = ({ setIsLoggedIn, darkMode, toggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignUp'>>();

  const handleSignUp = () => {
    setIsLoggedIn(true);
    navigation.navigate('KYC', { setIsLoggedIn, darkMode, toggleMode });
  };

  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <View style={tw`flex-1 p-5 justify-center mt-[70px]`}>
        <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#050142]'} mb-5 text-center`}>
          Sign Up
        </Text>
        <TextInput
          style={tw`border border-gray-300 p-3 rounded-md mb-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#454545]'}`}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={darkMode ? '#A0A0A0' : '#454545'}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email input"
        />
        <TextInput
          style={tw`border border-gray-300 p-3 rounded-md mb-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-[#454545]'}`}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={darkMode ? '#A0A0A0' : '#454545'}
          secureTextEntry
          accessibilityLabel="Password input"
        />
        <TouchableOpacity
          style={tw`p-3 bg-[#050142] rounded-md mb-4`}
          onPress={handleSignUp}
          accessibilityLabel="Sign Up"
        >
          <Text style={tw`text-white text-center text-base font-medium`}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login', { setIsLoggedIn, darkMode, toggleMode })}
          accessibilityLabel="Go to Login"
        >
          <Text style={tw`text-center ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;