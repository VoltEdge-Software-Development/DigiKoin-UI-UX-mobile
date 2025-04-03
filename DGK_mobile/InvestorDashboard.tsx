import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

interface InvestorDashboardProps {
  setIsLoggedIn: (value: boolean) => void;
}

const InvestorDashboard: React.FC<InvestorDashboardProps> = ({ setIsLoggedIn }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'InvestorDashboard'>>();
  const [metrics, setMetrics] = useState<{
    tokenPrice: string;
    goldReserves: string;
    tokensInCirculation: string;
    marketValue: string;
    vaultLocations: string;
    audit: string;
    marketCap: string;
    tradingVolume: string;
    tokenSupplyCap: string;
    burnedTokens: string;
    fundsRaised: string;
    roiHistory: string;
    projectedRoi: string;
    dividendYield: string;
    revenueStreams: string;
    goldToTokenRatio: string;
    smartContractAudit: string;
    kycCompliance: string;
    blockchainExplorer: string;
    insuranceCoverage: string;
    oreGrade: string;
    recoveryRate: string;
    shipmentTracking: string;
    vaultTemp: string;
    energyUsage: string;
    activeInvestors: string;
    walletsCreated: string;
    transactionVolume: string;
    geoDistribution: string;
  } | null>(null);

  // Simulate fetching data (replace with real API call later)
  useEffect(() => {
    setTimeout(() => {
      setMetrics({
        tokenPrice: '$5.25',
        goldReserves: '150 kg',
        tokensInCirculation: '25M',
        marketValue: '$9.75M USD',
        vaultLocations: 'Dubai, South Africa',
        audit: 'Verified by PwC',
        marketCap: '$131.25M',
        tradingVolume: '$2.3M',
        tokenSupplyCap: '50M',
        burnedTokens: '1.5M',
        fundsRaised: '$75M',
        roiHistory: '+15% (Past Year)',
        projectedRoi: 'Low: 5%, Med: 10%, High: 20%',
        dividendYield: '2% Annually',
        revenueStreams: 'Mining, Trading Fees',
        goldToTokenRatio: '1 kg = 10,000 Tokens',
        smartContractAudit: 'CertiK Verified',
        kycCompliance: '98%',
        blockchainExplorer: 'View Transactions',
        insuranceCoverage: '$50M',
        oreGrade: '3.5 g/t',
        recoveryRate: '92%',
        shipmentTracking: 'In Transit (Dubai)',
        vaultTemp: '22°C',
        energyUsage: '500 kWh/day',
        activeInvestors: '12,500',
        walletsCreated: '15,000',
        transactionVolume: '$1.8M',
        geoDistribution: 'UAE 40%, US 30%, EU 20%',
      });
    }, 1000);
  }, []);

  // Navigation handlers
  const handleInvestNow = () => navigation.navigate('BuySell');
  const handleViewWhitepaper = () => {
    Linking.openURL('https://example.com/whitepaper.pdf').catch(() =>
      Alert.alert('Error', 'Unable to open whitepaper.')
    );
  };
  const handleExplorer = () => {
    Linking.openURL('https://blockchain-explorer-url.com').catch(() =>
      Alert.alert('Error', 'Unable to open blockchain explorer.')
    );
  };
  const handleProfile = () => {
    navigation.navigate('Profile', { setIsLoggedIn });
  };

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
            <Text className="text-base font-medium">{metrics ? metrics.tokenPrice : 'Loading...'}</Text>
          </View>
          <View className="bg-white/80 p-3 rounded-lg shadow-sm">
            <Text className="text-sm font-bold uppercase text-[#454545]">Total Gold Reserves</Text>
            <Text className="text-base font-medium">{metrics ? metrics.goldReserves : 'Loading...'}</Text>
          </View>
          <View className="bg-white/80 p-3 rounded-lg shadow-sm">
            <Text className="text-sm font-bold uppercase text-[#454545]">Token Circulation</Text>
            <Text className="text-base font-medium">{metrics ? metrics.tokensInCirculation : 'Loading...'}</Text>
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
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Total Gold Reserves:</Text> {metrics ? metrics.goldReserves : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Current Market Value:</Text> {metrics ? metrics.marketValue : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Vault Locations:</Text> {metrics ? metrics.vaultLocations : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Audit:</Text> {metrics ? metrics.audit : 'Loading...'}
            </Text>
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
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Current Token Price:</Text> {metrics ? metrics.tokenPrice : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Market Cap:</Text> {metrics ? metrics.marketCap : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Total Tokens in Circulation:</Text>{' '}
              {metrics ? metrics.tokensInCirculation : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Trading Volume (24h):</Text> {metrics ? metrics.tradingVolume : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Token Supply Cap:</Text> {metrics ? metrics.tokenSupplyCap : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Burned Tokens:</Text> {metrics ? metrics.burnedTokens : 'Loading...'}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Token Price Over Time</Text>
          </View>
        </View>

        {/* 4. Financial & ROI Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">Financial & ROI Metrics</Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Total Funds Raised:</Text> {metrics ? metrics.fundsRaised : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">ROI History:</Text> {metrics ? metrics.roiHistory : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Projected ROI:</Text> {metrics ? metrics.projectedRoi : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Dividend/Yield:</Text> {metrics ? metrics.dividendYield : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Revenue Streams:</Text> {metrics ? metrics.revenueStreams : 'Loading...'}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">ROI Calculator Tool</Text>
          </View>
        </View>

        {/* 5. Security & Compliance Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">Security & Compliance Metrics</Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Gold-to-Token Ratio:</Text>{' '}
              {metrics ? metrics.goldToTokenRatio : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Smart Contract Audit:</Text>{' '}
              {metrics ? metrics.smartContractAudit : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">KYC/AML Compliance:</Text> {metrics ? metrics.kycCompliance : 'Loading...'}
            </Text>
            <TouchableOpacity onPress={handleExplorer}>
              <Text className="text-lg text-blue-600">
                <Text className="font-bold">Blockchain Explorer:</Text>{' '}
                {metrics ? metrics.blockchainExplorer : 'Loading...'}
              </Text>
            </TouchableOpacity>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Insurance Coverage:</Text> {metrics ? metrics.insuranceCoverage : 'Loading...'}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Compliance Dashboard</Text>
          </View>
        </View>

        {/* 6. IoT-Driven Operational Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">IoT-Driven Operational Metrics</Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Ore Grade:</Text> {metrics ? metrics.oreGrade : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Recovery Rate:</Text> {metrics ? metrics.recoveryRate : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Shipment Tracking:</Text> {metrics ? metrics.shipmentTracking : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Vault Temp:</Text> {metrics ? metrics.vaultTemp : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Energy Usage:</Text> {metrics ? metrics.energyUsage : 'Loading...'}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Live Dashboard with Data Feeds</Text>
          </View>
        </View>

        {/* 7. User Adoption & Growth Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl font-bold text-[#454545] mb-3">User Adoption & Growth Metrics</Text>
          <View className="flex-col gap-2">
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Total Active Investors:</Text>{' '}
              {metrics ? metrics.activeInvestors : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Wallets Created:</Text> {metrics ? metrics.walletsCreated : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Transaction Volume (Daily):</Text>{' '}
              {metrics ? metrics.transactionVolume : 'Loading...'}
            </Text>
            <Text className="text-lg text-[#454545]">
              <Text className="font-bold">Geographic Distribution:</Text>{' '}
              {metrics ? metrics.geoDistribution : 'Loading...'}
            </Text>
          </View>
          <View className="h-[100px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Investor Distribution Map</Text>
          </View>
        </View>

        {/* Profile Navigation */}
        <TouchableOpacity
          className="p-3 bg-[#050142] rounded-md mt-5"
          onPress={handleProfile}
          accessibilityLabel="View Investor Profile"
        >
          <Text className="text-white text-center text-base font-medium">View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InvestorDashboard;