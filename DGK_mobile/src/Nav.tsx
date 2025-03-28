import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation stack param list
type RootStackParamList = {
  Home: undefined;
  BuySell: undefined;
  Wallet: undefined;
  GoldStorage: undefined;
  Profile: undefined;
  FAQ: undefined;
  Welcome: undefined; // Redirect for logout
};

// Define props type
interface NavProps {
  darkMode: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ darkMode, setIsLoggedIn }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  const navItems = [
    { name: 'Home', route: 'Home' },
    { name: 'Buy/Sell', route: 'BuySell' },
    { name: 'Wallet', route: 'Wallet' },
    { name: 'Gold Storage', route: 'GoldStorage' },
    { name: 'Profile', route: 'Profile' },
    { name: 'FAQ', route: 'FAQ' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('kycVerified');
    setIsLoggedIn(false);
    navigation.navigate('Welcome'); // Redirect to Welcome after logout
  };

  return (
    <View
      className={`w-full p-3 flex-row justify-between items-center shadow-md fixed bottom-0 left-0 z-[1000] ${
        darkMode ? 'bg-[#333333]/95' : 'bg-[#111111]/80'
      }`}
      style={{ elevation: 4 }}
    >
      {/* Navigation Links */}
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
            onPress={() => navigation.navigate(item.route as keyof RootStackParamList)}
            accessibilityLabel={`Navigate to ${item.name}`}
            activeOpacity={0.7} // Simulate hover effect
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

      {/* Logout Action */}
      <TouchableOpacity
        className={`p-2 rounded-md ${darkMode ? 'bg-[#ff8080]/20' : 'bg-[#ff4d4d]/20'}`}
        onPress={handleLogout}
        accessibilityLabel="Log Out"
        activeOpacity={0.7} // Simulate hover effect
      >
        <Text
          className={`text-sm font-medium ${
            darkMode ? 'text-[#ff8080]' : 'text-[#ff4d4d]'
          }`}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Nav;