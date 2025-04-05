import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import Nav from './Nav';
import tw from 'twrnc';

interface HeaderProps {
  darkMode: boolean;
  toggleMode: () => void;
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

interface GoldStorageProps {
  setIsLoggedIn: (value: boolean) => void;
  userType: 'minor' | 'investor' | 'admin' | null;
}

interface Metrics {
  oreProcessed: string;
  goldExtracted: string;
  goldPurity: string;
  processingEfficiency: string;
  temperature: string;
  dustLevels: string;
  waterUsage: string;
  waterPH: string;
  machineUptime: string;
  motorRPM: string;
  powerConsumption: string;
  maintenanceAlert: string;
  goldTransport: string;
  perimeterStatus: string;
  personnel: string;
  goldPrice: string;
  goldInventory: string;
  estimatedRevenue: string;
  safetyAlerts: string;
  emissions: string;
  complianceRate: string;
  miningOutput: string;
  energyConsumption: string;
  carbonFootprint: string;
  currencySupply: string;
  goldToCurrencyRatio: string;
  transactionVolume: string;
  cameraFeeds: string;
  notifications: string;
}

const GoldStorage: React.FC<GoldStorageProps> = ({ setIsLoggedIn, userType }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'GoldStorage'>>();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleMode = () => setDarkMode(prev => !prev);

  useEffect(() => {
    setTimeout(() => {
      setMetrics({
        oreProcessed: '500 tons',
        goldExtracted: '2.5 kg',
        goldPurity: '99.9%',
        processingEfficiency: '85%',
        temperature: '22°C',
        dustLevels: '10 µg/m³',
        waterUsage: '1000 L/h',
        waterPH: '7.2',
        machineUptime: '98%',
        motorRPM: '1500',
        powerConsumption: '300 kW',
        maintenanceAlert: 'None',
        goldTransport: 'In Transit (Dubai)',
        perimeterStatus: 'Secure',
        personnel: '25 On-Site',
        goldPrice: '$65/g',
        goldInventory: '150 kg',
        estimatedRevenue: '$9.75M',
        safetyAlerts: 'None',
        emissions: '50 kg CO2/day',
        complianceRate: '100%',
        miningOutput: '0.5 kg/day',
        energyConsumption: '500 kWh/day',
        carbonFootprint: '200 kg CO2',
        currencySupply: '25M Tokens',
        goldToCurrencyRatio: '1 kg = 10,000 Tokens',
        transactionVolume: '$1.8M/day',
        cameraFeeds: 'Active',
        notifications: '2 Active',
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleViewWallet = () => {
    try {
      navigation.navigate('Wallet');
    } catch (error) {
      setErrorMessage('Failed to navigate to Wallet.');
    }
  };

  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-800/85' : 'bg-gray-200/85'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <ScrollView style={tw`flex-1`}>
        <View style={tw`mt-[70px] p-5`}>
          {errorMessage && (
            <View style={tw`absolute top-10 left-0 right-0 z-10 p-4 mx-7 bg-red-500/90 rounded-md`}>
              <Text style={tw`text-white text-center`}>{errorMessage}</Text>
            </View>
          )}

          {/* Dashboard Grid */}
          <View style={tw`flex-col gap-5`}>
            {/* 1. Gold Production & Processing Data */}
            <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
              <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
                Gold Production & Processing
              </Text>
              <View style={tw`flex-col gap-2`}>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Ore Weight Processed:</Text>{' '}
                  {metrics?.oreProcessed ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Gold Extracted:</Text> {metrics?.goldExtracted ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Gold Purity Levels:</Text> {metrics?.goldPurity ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Processing Efficiency:</Text>{' '}
                  {metrics?.processingEfficiency ?? 'Loading...'}
                </Text>
              </View>
              <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
                <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Processing Throughput Chart
                </Text>
              </View>
            </View>

            {/* 2. Environmental & Site Conditions */}
            <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
              <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
                Environmental Conditions
              </Text>
              <View style={tw`flex-col gap-2`}>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Temperature:</Text> {metrics?.temperature ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Dust Levels:</Text> {metrics?.dustLevels ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Water Usage:</Text> {metrics?.waterUsage ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Water pH:</Text> {metrics?.waterPH ?? 'Loading...'}
                </Text>
              </View>
              <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
                <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Environmental Trends Graph
                </Text>
              </View>
            </View>

            {/* 3. Equipment & Machinery Monitoring */}
            <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
              <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
                Equipment Monitoring
              </Text>
              <View style={tw`flex-col gap-2`}>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Machine Uptime:</Text> {metrics?.machineUptime ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Motor RPM:</Text> {metrics?.motorRPM ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Power Consumption:</Text>{' '}
                  {metrics?.powerConsumption ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Maintenance Alert:</Text>{' '}
                  {metrics?.maintenanceAlert ?? 'Loading...'}
                </Text>
              </View>
              <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
                <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Equipment Status Dashboard
                </Text>
              </View>
            </View>

            {/* 4. Security & Logistics Tracking */}
            <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
              <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
                Security & Logistics
              </Text>
              <View style={tw`flex-col gap-2`}>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Gold Transport:</Text> {metrics?.goldTransport ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Perimeter Status:</Text> {metrics?.perimeterStatus ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Personnel:</Text> {metrics?.personnel ?? 'Loading...'}
                </Text>
              </View>
              <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
                <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Transport Tracking Map
                </Text>
              </View>
            </View>

            {/* 5. Financial & Market Insight */}
            <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
              <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
                Financial Insight
              </Text>
              <View style={tw`flex-col gap-2`}>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Live Gold Price:</Text> {metrics?.goldPrice ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Gold Inventory:</Text> {metrics?.goldInventory ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Estimated Revenue:</Text>{' '}
                  {metrics?.estimatedRevenue ?? 'Loading...'}
                </Text>
              </View>
              <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
                <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Market Price Trend
                </Text>
              </View>
            </View>

            {/* 6. Compliance & Safety Metrics */}
            <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
              <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
                Compliance & Safety
              </Text>
              <View style={tw`flex-col gap-2`}>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Safety Alerts:</Text> {metrics?.safetyAlerts ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Emissions:</Text> {metrics?.emissions ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Compliance Rate:</Text> {metrics?.complianceRate ?? 'Loading...'}
                </Text>
              </View>
              <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
                <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Safety Dashboard
                </Text>
              </View>
            </View>

            {/* 7. Mining Operations Data */}
            <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
              <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
                Mining Operations
              </Text>
              <View style={tw`flex-col gap-2`}>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Mining Output:</Text> {metrics?.miningOutput ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Energy Consumption:</Text>{' '}
                  {metrics?.energyConsumption ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Carbon Footprint:</Text> {metrics?.carbonFootprint ?? 'Loading...'}
                </Text>
              </View>
              <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
                <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Output Trends Graph
                </Text>
              </View>
            </View>

            {/* 8. Blockchain and Currency Data */}
            <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
              <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
                Blockchain Data
              </Text>
              <View style={tw`flex-col gap-2`}>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Currency Supply:</Text> {metrics?.currencySupply ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Gold-to-Currency Ratio:</Text>{' '}
                  {metrics?.goldToCurrencyRatio ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Transaction Volume:</Text>{' '}
                  {metrics?.transactionVolume ?? 'Loading...'}
                </Text>
              </View>
              <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
                <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Transaction Volume Chart
                </Text>
              </View>
            </View>

            {/* 9. User-Facing Features */}
            <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm mb-5`}>
              <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
                User Features
              </Text>
              <View style={tw`flex-col gap-2`}>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Camera Feeds:</Text> {metrics?.cameraFeeds ?? 'Loading...'}
                </Text>
                <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  <Text style={tw`font-bold`}>Notifications:</Text> {metrics?.notifications ?? 'Loading...'}
                </Text>
              </View>
              <View style={tw`h-[100px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
                <Text style={tw`italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Historical Data Trends
                </Text>
              </View>
              <TouchableOpacity
                style={tw`p-3 bg-[#050142] rounded-md mt-4`}
                onPress={handleViewWallet}
                accessibilityLabel="View Wallet Balances"
              >
                <Text style={tw`text-white text-center text-base font-medium`}>View Wallet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Nav darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} userType={userType} />
    </View>
  );
};

export default GoldStorage;