import React from 'react';
import { View, Text } from 'react-native';

const MinorDashboard: React.FC = () => {
  return (
    <View className="flex-1 mt-[70px] p-5 bg-gray-200/85">
      <Text className="text-2xl font-bold text-[#050142] mb-3 text-center">Minor Dashboard</Text>
      <Text className="text-lg text-[#454545] text-center mb-5">
        Welcome, Miner! Monitor mining activity, earnings, and gold-backed token minting.
      </Text>
      {/* Placeholder for minor-specific features */}
      <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
        <Text className="text-xl font-bold text-[#454545] mb-3">Mining Overview</Text>
        <Text className="text-base text-[#454545] italic">Coming soon: Mining stats, earnings, and token minting details.</Text>
      </View>
    </View>
  );
};

export default MinorDashboard;