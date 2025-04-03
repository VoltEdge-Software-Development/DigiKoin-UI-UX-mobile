import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

interface WelcomeProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ setIsLoggedIn }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Welcome'>>();

  return (
    <View className="flex-1 justify-center items-center p-5 bg-gray-100">
      <Text className="text-[32px] font-bold text-[#050142] mb-3">Welcome to DigiKoin</Text>
      <Text className="text-lg text-[#454545] mb-6">Mining Africa's Gold. Empowering Digital Wealth</Text>
      <TouchableOpacity
        className="p-3 px-6 bg-[#050142] rounded-md"
        onPress={() => navigation.navigate('Login', { setIsLoggedIn })}
        accessibilityLabel="Get Started with DigiKoin"
      >
        <Text className="text-white text-base font-medium">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;