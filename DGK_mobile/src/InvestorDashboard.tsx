import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation stack param list
type RootStackParamList = {
  BuySell: undefined;
};

const InvestorDashboard: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // No DOM animations in React Native; could use Animated API if desired
    // Placeholder for future animation implementation
  }, []);

  const handleInvestNow = () => navigation.navigate('BuySell');
  const handleViewWhitepaper = () => Linking.openURL('/path-to-whitepaper.pdf'); // Replace with actual URL

  return (
    <View className="flex-1 mt-[70px] p-5 bg-gray-200/85">
      {/* 1. Hero Section */}
      <View className="p-5 bg-orange-50 rounded-[10px] mb-5">
        <Text className="text-[28px] font-bold text-[#050142] mb-2 text-center">
          Invest in Gold-Backed Digital Assets with Confidence
        </Text>
        <Text className="text-lg text-[#454545] mb-4 text-center">Real Gold. Real Value. Real Security.</Text>
        <View className="flex-row justify-around flex-wrap gap-3 mb-4">
          <View className="bg-white/80 p-3 rounded-lg shadow-sm">
            <Text className="text-sm font-bold uppercase text-[#454545]">Current Token Price</Text>
            <Text className="text-base font-medium">$5.25</Text>
          </View>
          <View className="bg-white/80 p-3 rounded-lg shadow-sm">
            <Text className="text-sm font-bold uppercase text-[#454545]">Total Gold Reserves</Text>
            <Text className="text-base font-medium">150 kg</Text>
          </View>
          <View className="bg-white/80 p-3 rounded-lg shadow-sm">
            <Text className="text-sm font-bold uppercase text-[#454545]">Token Circulation</Text>
            <Text className="text-base font-medium">25 Million</Text>
          </View>
        </View>
        <View className="flex-row justify-center gap-4">
          <TouchableOpacity
            className="p-2 px-5 bg-[#050142] rounded-md"
            onPress={handleInvestNow}
            accessibilityLabel="Invest Now"
          >
            <Text className="text-white text-base">Invest Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 px-5 bg-[#050142] rounded-md"
            onPress={handleViewWhitepaper}
            accessibilityLabel="View Whitepaper"
          >
            <Text className="text-white text-base">View Whitepaper</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dashboard Grid */}
      <View className="flex-col gap-5">
        {/* 2. Gold Reserve Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">Gold Reserve Metrics</Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Total Gold Reserves:</Text> 150 kg</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Current Market Value:</Text> $9.75M USD</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Vault Locations:</Text> Dubai, South Africa</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Audit:</Text> Verified by PwC</Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Interactive Gold Reserve Map</Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Gold Reserve Growth Chart</Text>
          </View>
        </View>

        {/* 3. Token Performance Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">Token Performance Metrics</Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Current Token Price:</Text> $5.25</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Market Cap:</Text> $131.25M</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Total Tokens in Circulation:</Text> 25M</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Trading Volume (24h):</Text> $2.3M</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Token Supply Cap:</Text> 50M</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Burned Tokens:</Text> 1.5M</Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Token Price Over Time</Text>
          </View>
        </View>

        {/* 4. Financial & ROI Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">Financial & ROI Metrics</Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Total Funds Raised:</Text> $75M</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">ROI History:</Text> +15% (Past Year)</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Projected ROI:</Text> Low: 5%, Med: 10%, High: 20%</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Dividend/Yield:</Text> 2% Annually</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Revenue Streams:</Text> Mining, Trading Fees</Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">ROI Calculator Tool</Text>
          </View>
        </View>

        {/* 5. Security & Compliance Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">Security & Compliance Metrics</Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Gold-to-Token Ratio:</Text> 1 kg = 10,000 Tokens</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Smart Contract Audit:</Text> CertiK Verified</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">KYC/AML Compliance:</Text> 98%</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://blockchain-explorer-url.com')}>
              <Text className="text-lg text-blue-600"><Text className="font-bold">Blockchain Explorer:</Text> View Transactions</Text>
            </TouchableOpacity>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Insurance Coverage:</Text> $50M</Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Compliance Dashboard</Text>
          </View>
        </View>

        {/* 6. IoT-Driven Operational Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">IoT-Driven Operational Metrics</Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Ore Grade:</Text> 3.5 g/t</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Recovery Rate:</Text> 92%</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Shipment Tracking:</Text> In Transit (Dubai)</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Vault Temp:</Text> 22°C</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Energy Usage:</Text> 500 kWh/day</Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Live Dashboard with Data Feeds</Text>
          </View>
        </View>

        {/* 7. User Adoption & Growth Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">User Adoption & Growth Metrics</Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Total Active Investors:</Text> 12,500</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Wallets Created:</Text> 15,000</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Transaction Volume (Daily):</Text> $1.8M</Text>
            <Text className="text-lg text-[#454545]"><Text className="font-bold">Geographic Distribution:</Text> UAE 40%, US 30%, EU 20%</Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Investor Distribution Map</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InvestorDashboard;