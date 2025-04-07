import React from 'react';
import { View, Text, Switch, Image } from 'react-native';
import tw from 'twrnc'; // Add this import if not present

interface HeaderProps {
  darkMode: boolean;
  toggleMode: () => Promise<void>;
}

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
        style={tw`w-[50px] h-[50px] ml-5`} // Replace className with style
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

export default Header;