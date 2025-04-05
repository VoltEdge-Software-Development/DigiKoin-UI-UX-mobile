import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, NavProps } from './types';
import tw from 'twrnc';

const Nav: React.FC<NavProps> = ({ darkMode, setIsLoggedIn, userType, toggleMode }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Nav'>>();
  const route = useRoute();

  // Base navigation items for all users (some filtered later for minors)
  const baseNavItems = [
    {
      name: 'Home',
      route:
        userType === 'admin'
          ? 'AdminDashboard'
          : userType === 'investor'
          ? 'InvestorDashboard'
          : 'MinorDashboard',
    },
    { name: 'Buy/Sell', route: 'BuySell' }, // Only for investors/admins
    { name: 'Wallet', route: 'Wallet' },     // Only for investors/admins
    { name: 'Gold Storage', route: 'GoldStorage' }, // Only for investors/admins
    { name: 'Profile', route: 'Profile' },
    { name: 'FAQ', route: 'FAQ' },
    // 'Terms' removed from here
  ];

  // Educational and community items for minors and admins
  const educationalNavItems = [
    { name: 'How DigiKoin Works', route: 'EducationalContent' },
    { name: 'Community', route: 'CommunityEngagement' },
  ];

  // Combine items based on userType
  const navItems =
    userType === 'admin'
      ? [...baseNavItems, ...educationalNavItems] // Admins see base + educational items
      : userType === 'investor'
      ? baseNavItems // Investors see only base items
      : [
          ...baseNavItems.filter(
            (item) => !['Buy/Sell', 'Wallet', 'Gold Storage'].includes(item.name)
          ), // Minors exclude Buy/Sell, Wallet, Gold Storage
          ...educationalNavItems, // Minors include educational items
        ];

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userType', 'isLoggedIn', 'kycVerified', 'darkMode']);
      setIsLoggedIn(false);
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View
      style={[
        tw`w-full p-3 flex-row justify-between items-center shadow-md`,
        { position: 'absolute', bottom: 0, left: 0, zIndex: 1000 },
        darkMode ? tw`bg-[#333333]/95` : tw`bg-[#111111]/80`,
        { elevation: 4 },
      ]}
    >
      <View style={tw`flex-row flex-wrap justify-around flex-1`}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            style={tw`p-2 rounded-md ${route.name === item.route ? (darkMode ? 'bg-white/30' : 'bg-white/20') : ''}`}
            onPress={() =>
              item.route === 'Profile'
                ? navigation.navigate('Profile', { setIsLoggedIn })
                : navigation.navigate(item.route as keyof RootStackParamList)
            }
            accessibilityLabel={`Navigate to ${item.name}`}
            activeOpacity={0.7}
          >
            <Text
              style={tw`text-sm font-medium ${
                darkMode
                  ? route.name === item.route
                    ? 'text-white'
                    : 'text-[#FFB84D]'
                  : route.name === item.route
                  ? 'text-white'
                  : 'text-[#B36300]'
              }`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={tw`p-2 rounded-md ${darkMode ? 'bg-[#ff8080]/20' : 'bg-[#ff4d4d]/20'}`}
        onPress={handleLogout}
        accessibilityLabel="Log Out"
        activeOpacity={0.7}
      >
        <Text style={tw`text-sm font-medium ${darkMode ? 'text-[#ff8080]' : 'text-[#ff4d4d]'}`}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Nav;