import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Switch, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, InvestorDashboardProps } from './types';
import tw from 'twrnc';

interface HeaderProps {
  darkMode: boolean;
  toggleMode: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleMode }) => {
  return (
    <View
      style={[
        tw`w-full flex-row items-center justify-between p-5 shadow-md`,
        { position: 'absolute', top: 0, left: 0, zIndex: 1000, minHeight: 70 },
        darkMode ? tw`bg-[#333333]/95` : tw`bg-[#111111]/80`,
        { elevation: 4 },
      ]}
    >
      <Image
        source={require('../assets/Gorilla.png')}
        style={tw`w-[50px] h-[50px] ml-5`}
        resizeMode="contain"
        accessibilityLabel="DigiKoin Logo"
      />
      <Text
        style={tw`text-[24px] font-bold flex-1 mr-auto ${darkMode ? 'text-[#FFB84D]' : 'text-[#B36300]'}`}
      >
        DigiKoin
      </Text>
      <Switch
        value={darkMode}
        onValueChange={toggleMode}
        thumbColor={darkMode ? '#FFFFFF' : '#050142'}
        trackColor={{ false: '#CCC', true: darkMode ? '#FFB84D' : '#AEADAD' }}
        style={tw`mr-5`}
        accessibilityLabel="Toggle Dark Mode"
      />
    </View>
  );
};

const InvestorDashboard: React.FC<InvestorDashboardProps> = ({ setIsLoggedIn, darkMode, toggleMode }) => {
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleInvestNow = () => navigation.navigate('BuySell', { setIsLoggedIn, darkMode, toggleMode });
  const handleViewWhitepaper = () => {
    Linking.openURL('https://example.com/whitepaper.pdf').catch(() =>
      setErrorMessage('Unable to open whitepaper.')
    );
  };
  const handleExplorer = () => {
    Linking.openURL('https://blockchain-explorer-url.com').catch(() =>
      setErrorMessage('Unable to open blockchain explorer.')
    );
  };
  const handleProfile = () => {
    navigation.navigate('Profile', { setIsLoggedIn, darkMode, toggleMode });
  };

  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200/85'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <View style={tw`flex-1 mt-[70px] p-5`}>
        {errorMessage && (
          <View style={tw`absolute top-10 left-0 right-0 z-10 p-4 mx-7 bg-red-500/90 rounded-md`}>
            <Text style={tw`text-white text-center`}>{errorMessage}</Text>
          </View>
        )}

        {/* 1. Hero Section */}
        <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-orange-50'} rounded-[10px] mb-5`}>
          <Text
            style={tw`text-[28px] font-bold ${darkMode ? 'text-white' : 'text-[#050142]'} mb-2 text-center`}
          >
            Invest in Gold-Backed Digital Assets with Confidence
          </Text>
          <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'} mb-4 text-center`}>
            Real Gold. Real Value. Real Security.
          </Text>
          <View style={tw`flex-row justify-around flex-wrap gap-3 mb-4`}>
            <View style={tw`${darkMode ? 'bg-gray-600' : 'bg-white/80'} p-3 rounded-lg shadow-sm`}>
              <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                Current Token Price
              </Text>
              <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                {metrics ? metrics.tokenPrice : 'Loading...'}
              </Text>
            </View>
            <View style={tw`${darkMode ? 'bg-gray-600' : 'bg-white/80'} p-3 rounded-lg shadow-sm`}>
              <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                Total Gold Reserves
              </Text>
              <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                {metrics ? metrics.goldReserves : 'Loading...'}
              </Text>
            </View>
            <View style={tw`${darkMode ? 'bg-gray-600' : 'bg-white/80'} p-3 rounded-lg shadow-sm`}>
              <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                Token Circulation
              </Text>
              <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                {metrics ? metrics.tokensInCirculation : 'Loading...'}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row justify-center gap-4`}>
            <TouchableOpacity
              style={tw`p-2 px-5 bg-[#050142] rounded-md`}
              onPress={handleInvestNow}
              accessibilityLabel="Invest Now"
            >
              <Text style={tw`text-white text-base`}>Invest Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`p-2 px-5 bg-[#050142] rounded-md`}
              onPress={handleViewWhitepaper}
              accessibilityLabel="View Whitepaper"
            >
              <Text style={tw`text-white text-base`}>View Whitepaper</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dashboard Grid */}
        <View style={tw`flex-col gap-5`}>
          {/* 2. Gold Reserve Metrics */}
          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
              Gold Reserve Metrics
            </Text>
            <View style={tw`flex-col gap-2`}>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Total Gold Reserves:</Text>{' '}
                {metrics ? metrics.goldReserves : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Current Market Value:</Text>{' '}
                {metrics ? metrics.marketValue : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Vault Locations:</Text>{' '}
                {metrics ? metrics.vaultLocations : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Audit:</Text> {metrics ? metrics.audit : 'Loading...'}
              </Text>
            </View>
            <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
              <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Interactive Gold Reserve Map
              </Text>
            </View>
            <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
              <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Gold Reserve Growth Chart
              </Text>
            </View>
          </View>

          {/* 3. Token Performance Metrics */}
          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
              Token Performance Metrics
            </Text>
            <View style={tw`flex-col gap-2`}>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Current Token Price:</Text>{' '}
                {metrics ? metrics.tokenPrice : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Market Cap:</Text> {metrics ? metrics.marketCap : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Total Tokens in Circulation:</Text>{' '}
                {metrics ? metrics.tokensInCirculation : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Trading Volume (24h):</Text>{' '}
                {metrics ? metrics.tradingVolume : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Token Supply Cap:</Text>{' '}
                {metrics ? metrics.tokenSupplyCap : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Burned Tokens:</Text>{' '}
                {metrics ? metrics.burnedTokens : 'Loading...'}
              </Text>
            </View>
            <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
              <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Token Price Over Time
              </Text>
            </View>
          </View>

          {/* 4. Financial & ROI Metrics */}
          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
              Financial & ROI Metrics
            </Text>
            <View style={tw`flex-col gap-2`}>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Total Funds Raised:</Text>{' '}
                {metrics ? metrics.fundsRaised : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>ROI History:</Text>{' '}
                {metrics ? metrics.roiHistory : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Projected ROI:</Text>{' '}
                {metrics ? metrics.projectedRoi : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Dividend/Yield:</Text>{' '}
                {metrics ? metrics.dividendYield : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Revenue Streams:</Text>{' '}
                {metrics ? metrics.revenueStreams : 'Loading...'}
              </Text>
            </View>
            <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
              <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                ROI Calculator Tool
              </Text>
            </View>
          </View>

          {/* 5. Security & Compliance Metrics */}
          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
              Security & Compliance Metrics
            </Text>
            <View style={tw`flex-col gap-2`}>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Gold-to-Token Ratio:</Text>{' '}
                {metrics ? metrics.goldToTokenRatio : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Smart Contract Audit:</Text>{' '}
                {metrics ? metrics.smartContractAudit : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>KYC/AML Compliance:</Text>{' '}
                {metrics ? metrics.kycCompliance : 'Loading...'}
              </Text>
              <TouchableOpacity onPress={handleExplorer}>
                <Text style={tw`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  <Text style={tw`font-bold`}>Blockchain Explorer:</Text>{' '}
                  {metrics ? metrics.blockchainExplorer : 'Loading...'}
                </Text>
              </TouchableOpacity>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Insurance Coverage:</Text>{' '}
                {metrics ? metrics.insuranceCoverage : 'Loading...'}
              </Text>
            </View>
            <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
              <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Compliance Dashboard
              </Text>
            </View>
          </View>

          {/* 6. IoT-Driven Operational Metrics */}
          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
              IoT-Driven Operational Metrics
            </Text>
            <View style={tw`flex-col gap-2`}>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Ore Grade:</Text>{' '}
                {metrics ? metrics.oreGrade : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Recovery Rate:</Text>{' '}
                {metrics ? metrics.recoveryRate : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Shipment Tracking:</Text>{' '}
                {metrics ? metrics.shipmentTracking : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Vault Temp:</Text>{' '}
                {metrics ? metrics.vaultTemp : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Energy Usage:</Text>{' '}
                {metrics ? metrics.energyUsage : 'Loading...'}
              </Text>
            </View>
            <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
              <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Live Dashboard with Data Feeds
              </Text>
            </View>
          </View>

          {/* 7. User Adoption & Growth Metrics */}
          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
              User Adoption & Growth Metrics
            </Text>
            <View style={tw`flex-col gap-2`}>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Total Active Investors:</Text>{' '}
                {metrics ? metrics.activeInvestors : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Wallets Created:</Text>{' '}
                {metrics ? metrics.walletsCreated : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Transaction Volume (Daily):</Text>{' '}
                {metrics ? metrics.transactionVolume : 'Loading...'}
              </Text>
              <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                <Text style={tw`font-bold`}>Geographic Distribution:</Text>{' '}
                {metrics ? metrics.geoDistribution : 'Loading...'}
              </Text>
            </View>
            <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
              <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Investor Distribution Map
              </Text>
            </View>
          </View>

          {/* Profile Navigation */}
          <TouchableOpacity
            style={tw`p-3 bg-[#050142] rounded-md mt-5`}
            onPress={handleProfile}
            accessibilityLabel="View Investor Profile"
          >
            <Text style={tw`text-white text-center text-base font-medium`}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InvestorDashboard;