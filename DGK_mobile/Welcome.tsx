import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, WelcomeProps } from './types'; // Import from types.ts

const Welcome: React.FC<WelcomeProps> = ({ setIsLoggedIn, darkMode, toggleMode }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Welcome'>>();

  return (
    <View className={`flex-1 justify-center items-center p-5 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <Text className={`text-[32px] font-bold ${darkMode ? 'text-white' : 'text-[#050142]'} mb-3`}>
        Welcome to DigiKoin
      </Text>
      <Text className={`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'} mb-6`}>
        Mining Africa's Gold. Empowering Digital Wealth
      </Text>
      <TouchableOpacity
        className="p-3 px-6 bg-[#050142] rounded-md"
        onPress={() => navigation.navigate('Login', { setIsLoggedIn, darkMode, toggleMode })}
        accessibilityLabel="Get Started with DigiKoin"
      >
        <Text className="text-white text-base font-medium">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;