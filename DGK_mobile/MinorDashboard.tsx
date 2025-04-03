import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import Nav from './Nav';
import Header from './Header';

interface MinorDashboardProps {
  setIsLoggedIn: (value: boolean) => void;
  darkMode: boolean;
  toggleMode: () => void;
}

const MinorDashboard: React.FC<MinorDashboardProps> = ({ setIsLoggedIn, darkMode, toggleMode }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'MinorDashboard'>>();
  const [features, setFeatures] = useState<{
    goldBackedSecurity: string;
    blockchainTransparency: string;
    realTimeTracking: string;
    shariahCompliance: string;
    secureVaultStorage: string;
  } | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setFeatures({
        goldBackedSecurity: 'Backed by real gold in secure vaults.',
        blockchainTransparency: 'Every transaction is visible and verified.',
        realTimeTracking: 'Track gold movements with IoT technology.',
        shariahCompliance: 'Aligned with Islamic finance principles.',
        secureVaultStorage: 'Gold stored in top-tier vaults worldwide.',
      });
    }, 1000);
  }, []);

  const handleLearnMore = () => Linking.openURL('https://example.com/learn-more').catch(() => Alert.alert('Error', 'Unable to open Learn More page.'));
  const handleExploreFeatures = () => Linking.openURL('https://example.com/features').catch(() => Alert.alert('Error', 'Unable to open Features page.'));
  const handleSignUpEarlyAccess = () => Linking.openURL('https://example.com/signup-early-access').catch(() => Alert.alert('Error', 'Unable to open Early Access signup.'));
  const handleContactUs = () => Linking.openURL('mailto:support@digikoin.com?subject=More Info Request').catch(() => Alert.alert('Error', 'Unable to open email client.'));

  return (
    <View className={`flex-1 ${darkMode ? 'bg-gray-800/85' : 'bg-gray-200/85'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <ScrollView className="flex-1">
        <View className="p-5 mt-[70px]">
          {/* Hero Section */}
          <View className={`p-5 rounded-[10px] mx-5 mb-5 ${darkMode ? 'bg-orange-100/20' : 'bg-orange-50'}`}>
            <Text className={`text-[28px] font-bold mb-2 text-center ${darkMode ? 'text-white' : 'text-[#050142]'}`}>
              Discover the Power of Gold-Backed Digital Currency
            </Text>
            <Text className={`text-lg mb-4 text-center ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
              Secure, Transparent, and Future-Ready Investment
            </Text>
            <View className="flex-row justify-center gap-4">
              <TouchableOpacity className="p-2 px-5 bg-[#050142] rounded-md" onPress={handleLearnMore}>
                <Text className="text-white text-base">Learn More</Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-2 px-5 bg-[#050142] rounded-md" onPress={handleExploreFeatures}>
                <Text className="text-white text-base">Explore Features</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Key Features Section */}
          <View className={`p-5 rounded-[10px] mx-5 mb-5 shadow-sm ${darkMode ? 'bg-white/5' : 'bg-white/10'}`}>
            <Text className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-[#454545]'}`}>Key Features</Text>
            <View className="flex-col gap-4">
              <View className={`flex-row items-center p-2 rounded-lg shadow-sm ${darkMode ? 'bg-white/10' : 'bg-white/80'}`}>
                <Image source={require('../assets/gold-backed-security.png')} className="w-7 h-7 mr-3" />
                <View>
                  <Text className={`text-sm font-bold uppercase ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>Gold-Backed Security</Text>
                  <Text className={`text-base font-medium ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                    {features ? features.goldBackedSecurity : 'Loading...'}
                  </Text>
                </View>
              </View>
              {/* Repeat for other features with similar dark mode adjustments */}
            </View>
            <View className={`h-[100px] rounded-md mt-3 flex items-center justify-center ${darkMode ? 'bg-gray-700/20' : 'bg-gray-100/20'}`}>
              <Text className="italic text-gray-600">Feature Overview Video</Text>
            </View>
          </View>

          {/* Call to Action Section */}
          <View className={`p-5 rounded-[10px] mx-5 mb-5 shadow-sm ${darkMode ? 'bg-white/5' : 'bg-white/10'}`}>
            <Text className={`text-2xl font-bold mb-3 text-center ${darkMode ? 'text-white' : 'text-[#454545]'}`}>Get Started Today</Text>
            <View className="flex-row justify-center gap-4">
              <TouchableOpacity className="p-2 px-5 bg-[#050142] rounded-md" onPress={handleSignUpEarlyAccess}>
                <Text className="text-white text-base">Sign Up for Early Access</Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-2 px-5 bg-[#050142] rounded-md" onPress={handleContactUs}>
                <Text className="text-white text-base">Contact Us for More Info</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Nav darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} userType="minor" />
    </View>
  );
};

export default MinorDashboard;