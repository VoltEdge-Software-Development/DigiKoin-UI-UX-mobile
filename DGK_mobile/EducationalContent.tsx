import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { Dispatch, SetStateAction } from 'react';
import tw from 'twrnc';

interface EducationalContentProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  toggleMode: () => Promise<void>;
  userType: 'minor' | 'investor' | 'admin' | null;
  navigation: StackNavigationProp<RootStackParamList, 'EducationalContent'>;
}

const EducationalContent: React.FC<EducationalContentProps> = ({ setIsLoggedIn, darkMode, toggleMode, userType, navigation }) => {
  const [steps, setSteps] = useState<{
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  } | null>(null);

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setSteps({
        step1: 'Gold Mining & Refining: We extract and purify gold from trusted mines.',
        step2: 'Gold Tokenization Process: Each gram of gold becomes a digital token.',
        step3: 'Storage & Tracking: Gold is stored securely and tracked with IoT.',
        step4: 'User Wallet & Transactions: Use your wallet to hold and trade tokens.',
      });
    }, 1000);
  }, []);

  const handleProfile = () => {
    navigation.navigate('Profile', { setIsLoggedIn, darkMode, toggleMode, userType });
  };

  return (
    <ScrollView style={tw`flex-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200/85'}`}>
      {/* Header */}
      <View style={tw`p-5 ${darkMode ? 'bg-gray-900' : 'bg-[#050142]'} mt-[50px] mb-5`}>
        <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-white'} text-center`}>
          How DigiKoin Works
        </Text>
      </View>

      {/* Educational Steps */}
      <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] mx-5 mb-5 shadow-sm`}>
        <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
          Learn the Process
        </Text>
        <View style={tw`flex-col gap-4`}>
          <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
            <Image source={require('../assets/step1-mining.png')} style={tw`w-7 h-7 mr-3`} />
            <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-[#454545]'}`}>
              {steps ? steps.step1 : 'Loading...'}
            </Text>
          </View>
          <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
            <Image source={require('../assets/step2-tokenization.png')} style={tw`w-7 h-7 mr-3`} />
            <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-[#454545]'}`}>
              {steps ? steps.step2 : 'Loading...'}
            </Text>
          </View>
          <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
            <Image source={require('../assets/step3-storage.png')} style={tw`w-7 h-7 mr-3`} />
            <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-[#454545]'}`}>
              {steps ? steps.step3 : 'Loading...'}
            </Text>
          </View>
          <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
            <Image source={require('../assets/step4-wallet.png')} style={tw`w-7 h-7 mr-3`} />
            <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-[#454545]'}`}>
              {steps ? steps.step4 : 'Loading...'}
            </Text>
          </View>
        </View>
        <View style={tw`h-[150px] ${darkMode ? 'bg-gray-600/20' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
          <Text style={tw`italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Infographic/Video Explainer
          </Text>
        </View>
      </View>

      {/* Back to Profile */}
      <TouchableOpacity
        style={tw`p-3 ${darkMode ? 'bg-gray-900' : 'bg-[#050142]'} rounded-md mx-5 mb-5`}
        onPress={handleProfile}
        accessibilityLabel="Back to Profile"
      >
        <Text style={tw`text-white text-center text-base font-medium`}>Back to Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EducationalContent;