import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

interface EducationalContentProps {
  setIsLoggedIn: (value: boolean) => void;
}

const EducationalContent: React.FC<EducationalContentProps> = ({ setIsLoggedIn }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'EducationalContent'>>();
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
    navigation.navigate('Profile', { setIsLoggedIn });
  };

  return (
    <ScrollView className="flex-1 bg-gray-200/85">
      {/* Header */}
      <View className="p-5 bg-[#050142] mt-[50px] mb-5">
        <Text className="text-2xl font-bold text-white text-center">How DigiKoin Works</Text>
      </View>

      {/* Educational Steps */}
      <View className="p-5 bg-white/10 rounded-[10px] mx-5 mb-5 shadow-sm">
        <Text className="text-2xl font-bold text-[#454545] mb-3">Learn the Process</Text>
        <View className="flex-col gap-4">
          <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
            <Image source={require('../assets/step1-mining.png')} className="w-7 h-7 mr-3" />
            <Text className="text-base font-medium">{steps ? steps.step1 : 'Loading...'}</Text>
          </View>
          <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
            <Image source={require('../assets/step2-tokenization.png')} className="w-7 h-7 mr-3" />
            <Text className="text-base font-medium">{steps ? steps.step2 : 'Loading...'}</Text>
          </View>
          <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
            <Image source={require('../assets/step3-storage.png')} className="w-7 h-7 mr-3" />
            <Text className="text-base font-medium">{steps ? steps.step3 : 'Loading...'}</Text>
          </View>
          <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
            <Image source={require('../assets/step4-wallet.png')} className="w-7 h-7 mr-3" />
            <Text className="text-base font-medium">{steps ? steps.step4 : 'Loading...'}</Text>
          </View>
        </View>
        <View className="h-[150px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
          <Text className="italic text-gray-600">Infographic/Video Explainer</Text>
        </View>
      </View>

      {/* Back to Profile */}
      <TouchableOpacity
        className="p-3 bg-[#050142] rounded-md mx-5 mb-5"
        onPress={handleProfile}
        accessibilityLabel="Back to Profile"
      >
        <Text className="text-white text-center text-base font-medium">Back to Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EducationalContent;