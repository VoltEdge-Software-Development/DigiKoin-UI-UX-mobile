import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, NavProps } from './types';

const Nav: React.FC<NavProps> = ({ darkMode, setIsLoggedIn, userType }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Nav'>>();
  const route = useRoute();

  // Base navigation items for all users
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
    { name: 'Buy/Sell', route: 'BuySell' }, // Only visible to investors/admins
    { name: 'Wallet', route: 'Wallet' },
    { name: 'Gold Storage', route: 'GoldStorage' },
    { name: 'Profile', route: 'Profile' },
    { name: 'FAQ', route: 'FAQ' },
  ];

  // Minor-specific items
  const minorNavItems = [
    { name: 'How DigiKoin Works', route: 'EducationalContent' },
    { name: 'Community', route: 'CommunityEngagement' },
  ];

  // Admin-specific items
  const adminNavItems = [{ name: 'Terms', route: 'Terms' }];

  // Combine items based on userType
  const navItems =
    userType === 'admin'
      ? [...baseNavItems, ...adminNavItems] // Admins see base + Terms
      : userType === 'investor'
      ? baseNavItems // Investors see full base
      : [...baseNavItems.filter((item) => item.name !== 'Buy/Sell'), ...minorNavItems]; // Minors exclude Buy/Sell, add minor items

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userType', 'isLoggedIn', 'kycVerified']);
      setIsLoggedIn(false);
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View
      className={`w-full p-3 flex-row justify-between items-center shadow-md fixed bottom-0 left-0 z-[1000] ${
        darkMode ? 'bg-[#333333]/95' : 'bg-[#111111]/80'
      }`}
      style={{ elevation: 4 }}
    >
      <View className="flex-row flex-wrap justify-around flex-1">
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            className={`p-2 rounded-md ${
              route.name === item.route
                ? darkMode
                  ? 'bg-white/30'
                  : 'bg-white/20'
                : ''
            }`}
            onPress={() =>
              item.route === 'Profile'
                ? navigation.navigate('Profile', { setIsLoggedIn })
                : navigation.navigate(item.route as keyof RootStackParamList)}
            accessibilityLabel={`Navigate to ${item.name}`}
            activeOpacity={0.7}
          >
            <Text
              className={`text-sm font-medium ${
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
        className={`p-2 rounded-md ${darkMode ? 'bg-[#ff8080]/20' : 'bg-[#ff4d4d]/20'}`}
        onPress={handleLogout}
        accessibilityLabel="Log Out"
        activeOpacity={0.7}
      >
        <Text
          className={`text-sm font-medium ${darkMode ? 'text-[#ff8080]' : 'text-[#ff4d4d]'}`}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Nav;