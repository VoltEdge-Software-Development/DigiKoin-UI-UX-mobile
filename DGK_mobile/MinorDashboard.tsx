import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, MinorDashboardProps } from './types';
import Nav from './Nav';
import Header from './Header';
import tw from 'twrnc';

// Use MinorDashboardProps from types.ts
const MinorDashboard: React.FC<MinorDashboardProps> = ({ setIsLoggedIn, darkMode, toggleMode, }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'MinorDashboard'>>();
  const [features, setFeatures] = useState<{
    goldBackedSecurity: string;
    blockchainTransparency: string;
    realTimeTracking: string;
    shariahCompliance: string;
    secureVaultStorage: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleLearnMore = () =>
    Linking.openURL('https://example.com/learn-more').catch(() =>
      setErrorMessage('Unable to open Learn More page.')
    );
  const handleExploreFeatures = () =>
    Linking.openURL('https://example.com/features').catch(() =>
      setErrorMessage('Unable to open Features page.')
    );
  const handleSignUpEarlyAccess = () =>
    Linking.openURL('https://example.com/signup-early-access').catch(() =>
      setErrorMessage('Unable to open Early Access signup.')
    );
  const handleContactUs = () =>
    Linking.openURL('mailto:support@digikoin.com?subject=More Info Request').catch(() =>
      setErrorMessage('Unable to open email client.')
    );

  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-800/85' : 'bg-gray-200/85'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-5 mt-[70px]`}>
          {/* Error Message Display */}
          {errorMessage && (
            <View style={tw`absolute top-10 left-0 right-0 z-10 p-4 mx-7 bg-red-500/90 rounded-md`}>
              <Text style={tw`text-white text-center`}>{errorMessage}</Text>
            </View>
          )}

          {/* Hero Section */}
          <View style={tw`p-5 rounded-[10px] mx-5 mb-5 ${darkMode ? 'bg-orange-100/20' : 'bg-orange-50'}`}>
            <Text
              style={tw`text-[28px] font-bold mb-2 text-center ${darkMode ? 'text-white' : 'text-[#050142]'}`}
            >
              Discover the Power of Gold-Backed Digital Currency
            </Text>
            <Text
              style={tw`text-lg mb-4 text-center ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
            >
              Secure, Transparent, and Future-Ready Investment
            </Text>
            <View style={tw`flex-row justify-center gap-4`}>
              <TouchableOpacity
                style={tw`p-2 px-5 bg-[#050142] rounded-md`}
                onPress={handleLearnMore}
              >
                <Text style={tw`text-white text-base`}>Learn More</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`p-2 px-5 bg-[#050142] rounded-md`}
                onPress={handleExploreFeatures}
              >
                <Text style={tw`text-white text-base`}>Explore Features</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Key Features Section */}
          <View
            style={tw`p-5 rounded-[10px] mx-5 mb-5 shadow-sm ${darkMode ? 'bg-white/5' : 'bg-white/10'}`}
          >
            <Text style={tw`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-[#454545]'}`}>
              Key Features
            </Text>
            <View style={tw`flex-col gap-4`}>
              <View
                style={tw`flex-row items-center p-2 rounded-lg shadow-sm ${darkMode ? 'bg-white/10' : 'bg-white/80'}`}
              >
                <Image
                  source={require('../assets/gold-backed-security.png')}
                  style={tw`w-7 h-7 mr-3`}
                />
                <View>
                  <Text
                    style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
                  >
                    Gold-Backed Security
                  </Text>
                  <Text
                    style={tw`text-base font-medium ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
                  >
                    {features ? features.goldBackedSecurity : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View
                style={tw`flex-row items-center p-2 rounded-lg shadow-sm ${darkMode ? 'bg-white/10' : 'bg-white/80'}`}
              >
                <Image
                  source={require('../assets/blockchain-transparency.png')}
                  style={tw`w-7 h-7 mr-3`}
                />
                <View>
                  <Text
                    style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
                  >
                    Blockchain Transparency
                  </Text>
                  <Text
                    style={tw`text-base font-medium ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
                  >
                    {features ? features.blockchainTransparency : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View
                style={tw`flex-row items-center p-2 rounded-lg shadow-sm ${darkMode ? 'bg-white/10' : 'bg-white/80'}`}
              >
                <Image
                  source={require('../assets/real-time-tracking.png')}
                  style={tw`w-7 h-7 mr-3`}
                />
                <View>
                  <Text
                    style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
                  >
                    Real Time Tracking
                  </Text>
                  <Text
                    style={tw`text-base font-medium ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
                  >
                    {features ? features.realTimeTracking : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View
                style={tw`flex-row items-center p-2 rounded-lg shadow-sm ${darkMode ? 'bg-white/10' : 'bg-white/80'}`}
              >
                <Image
                  source={require('../assets/shariah-compliance.png')}
                  style={tw`w-7 h-7 mr-3`}
                />
                <View>
                  <Text
                    style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
                  >
                    Shariah Compliance
                  </Text>
                  <Text
                    style={tw`text-base font-medium ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
                  >
                    {features ? features.shariahCompliance : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View
                style={tw`flex-row items-center p-2 rounded-lg shadow-sm ${darkMode ? 'bg-white/10' : 'bg-white/80'}`}
              >
                <Image
                  source={require('../assets/secure-vault-storage.png')}
                  style={tw`w-7 h-7 mr-3`}
                />
                <View>
                  <Text
                    style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
                  >
                    Secure Vault Storage
                  </Text>
                  <Text
                    style={tw`text-base font-medium ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}
                  >
                    {features ? features.secureVaultStorage : 'Loading...'}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={tw`h-[100px] rounded-md mt-3 flex items-center justify-center ${darkMode ? 'bg-gray-700/20' : 'bg-gray-100/20'}`}
            >
              <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Feature Overview Video
              </Text>
            </View>
          </View>

          {/* Call to Action Section */}
          <View
            style={tw`p-5 rounded-[10px] mx-5 mb-5 shadow-sm ${darkMode ? 'bg-white/5' : 'bg-white/10'}`}
          >
            <Text
              style={tw`text-2xl font-bold mb-3 text-center ${darkMode ? 'text-white' : 'text-[#454545]'}`}
            >
              Get Started Today
            </Text>
            <View style={tw`flex-row justify-center gap-4`}>
              <TouchableOpacity
                style={tw`p-2 px-5 bg-[#050142] rounded-md`}
                onPress={handleSignUpEarlyAccess}
              >
                <Text style={tw`text-white text-base`}>Sign Up for Early Access</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`p-2 px-5 bg-[#050142] rounded-md`}
                onPress={handleContactUs}
              >
                <Text style={tw`text-white text-base`}>Contact Us for More Info</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Nav darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} userType="minor" toggleMode={toggleMode} />
    </View>
  );
};

export default MinorDashboard;