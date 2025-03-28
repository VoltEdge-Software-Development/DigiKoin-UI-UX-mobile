import React from 'react';
import { View, Text, Image, Switch } from 'react-native';

// Define props type
interface HeaderProps {
  darkMode: boolean;
  toggleMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleMode }) => {
  return (
    <View className="w-full flex-row items-center justify-between p-5 bg-[#111111]/80 shadow-md fixed top-0 left-0 z-[1000] min-h-[70px]" style={{ elevation: 4 }}>
      <Image
        source={require('../assets/Gorilla.png')}
        className="w-[50px] h-[50px] ml-5"
        resizeMode="contain"
        accessibilityLabel="DigiKoin Logo"
      />
      <Text className="text-[24px] font-bold text-[#B36300] flex-1 mr-auto">DigiKoin</Text>
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

export default Header;