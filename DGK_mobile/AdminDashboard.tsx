import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, AdminDashboardProps } from './types';
import Nav from './Nav';
import tw from 'twrnc';

interface Metrics {
  tokenPrice: string;
  goldReserves: string;
  activeInvestors: string;
  marketValue: string;
  vaultDetails: string;
  auditReports: string;
  reserveGrowth: string;
  marketCap: string;
  tokensInCirculation: string;
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
  tonnesMined: string;
  vaultData: string;
  gpsTracking: string;
  energyWater: string;
  walletsCreated: string;
  transactionVolumeValue: string;
  geoDistribution: string;
  investorContact: string;
  supportContact: string;
  escalation: string;
}

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
        style={tw`text-[24px] font-bold flex-1 mr-auto ${
          darkMode ? 'text-[#FFB84D]' : 'text-[#B36300]'
        }`}
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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setIsLoggedIn, darkMode, toggleMode, userType }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'AdminDashboard'>>();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setMetrics({
        tokenPrice: '$5.25',
        goldReserves: '175 kg',
        activeInvestors: '13,000',
        marketValue: '$10.5M USD / 38.6M AED',
        vaultDetails: 'Dubai (DMCC Vault, ISO 9001), South Africa (Rand Refinery, 24/7 Security)',
        auditReports: 'Verified by Deloitte (Q1 2025)',
        reserveGrowth: '+2.5% Monthly / +7.8% Quarterly',
        marketCap: '$131.25M',
        tokensInCirculation: '25M',
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
        oreGrade: '3.8 g/t',
        recoveryRate: '93%',
        tonnesMined: '1,200 tonnes/month',
        vaultData: '5 kg moved to Dubai (03/22/25)',
        gpsTracking: 'Shipment #GX-472 in transit (ETA: 03/25/25)',
        energyWater: '520 kWh/day, 1,200 L/day',
        walletsCreated: '16,500',
        transactionVolumeValue: '1,200 tx/day ($2M/day), 35,000 tx/month ($60M/month)',
        geoDistribution: 'UAE 45%, US 25%, EU 20%, Other 10%',
        investorContact: 'krmathabe@voltedgetechsolutions.co.za, +27 81 216 0556',
        supportContact: 'customersupport@voltedgetechsolutions.co.za, +27 60 941 3956 (24/7)',
        escalation: 'Contact exco@voltedgetechsolutions.co.za',
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleInvestNow = () => {
    navigation.navigate('BuySell', { setIsLoggedIn, userType: 'admin' as const, darkMode, toggleMode });
  };
  const handleViewWhitepaper = () => {
    Linking.openURL('https://example.com/whitepaper.pdf').catch(() =>
      setErrorMessage('Unable to open whitepaper.')
    );
  };
  const handleAuditReports = () => {
    Linking.openURL('https://example.com/audit-reports.pdf').catch(() =>
      setErrorMessage('Unable to open audit reports.')
    );
  };
  const handleExplorer = () => {
    Linking.openURL('https://blockchain-explorer-url.com').catch(() =>
      setErrorMessage('Unable to open blockchain explorer.')
    );
  };
  const handleProfile = () => {
    navigation.navigate('Profile', { setIsLoggedIn, userType, darkMode, toggleMode });
  };

  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200/85'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <View style={tw`flex-1 mt-[70px] p-7`}>
        {errorMessage && (
          <View style={tw`absolute top-10 left-0 right-0 z-10 p-4 mx-7 bg-red-500/90 rounded-md`}>
            <Text style={tw`text-white text-center`}>{errorMessage}</Text>
          </View>
        )}

        <View style={tw`p-10 ${darkMode ? 'bg-gray-700' : 'bg-orange-50'} rounded-[10px] mb-7 text-center`}>
          <Text style={tw`text-[32px] mb-2 ${darkMode ? 'text-white' : 'text-[#050142]'} font-bold`}>
            Invest in Gold-Backed Digital Assets with Confidence
          </Text>
          <Text style={tw`text-lg mb-5 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
            Real Gold. Real Value. Real Security.
          </Text>
          <View style={tw`flex-row justify-around flex-wrap gap-4 mb-5`}>
            <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
              <Image source={require('../assets/current-token-price.png')} style={tw`w-7 h-7 mr-3`} />
              <View>
                <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                  Current Token Price
                </Text>
                <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                  {metrics ? metrics.tokenPrice : 'Loading...'}
                </Text>
                <Text style={tw`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>N/A</Text>
              </View>
            </View>
            <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
              <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
              <View>
                <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                  Total Gold Reserves
                </Text>
                <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                  {metrics ? metrics.goldReserves : 'Loading...'}
                </Text>
                <Text style={tw`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>N/A</Text>
              </View>
            </View>
            <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
              <Image source={require('../assets/total-active-investors.png')} style={tw`w-7 h-7 mr-3`} />
              <View>
                <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                  Total Active Investors
                </Text>
                <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                  {metrics ? metrics.activeInvestors : 'Loading...'}
                </Text>
                <Text style={tw`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>N/A</Text>
              </View>
            </View>
          </View>
          <View style={tw`flex-row justify-center gap-5`}>
            <TouchableOpacity
              style={tw`p-2 px-5 bg-[#050142] rounded-md`}
              onPress={handleInvestNow}
              accessibilityLabel="Invest Now in DigiKoin"
            >
              <Text style={tw`text-white text-base`}>Invest Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`p-2 px-5 bg-[#050142] rounded-md`}
              onPress={handleViewWhitepaper}
              accessibilityLabel="View Whitepaper PDF"
            >
              <Text style={tw`text-white text-base`}>View Whitepaper</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`flex-col gap-5`}>
          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl mb-5 ${darkMode ? 'text-white' : 'text-[#454545]'} font-bold`}>
              Gold Reserve Metrics
            </Text>
            <View style={tw`flex-col gap-2.5`}>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Total Gold Reserves
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? `${metrics.goldReserves} (0.175 tons)` : 'Loading...'}
                  </Text>
                  <Text style={tw`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>N/A</Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Vault Details
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.vaultDetails : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Reserve Growth
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.reserveGrowth : 'Loading...'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={tw`h-[150px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
              <Text style={tw`italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Interactive Gold Reserve Map</Text>
            </View>
            <View style={tw`h-[150px] ${darkMode ? 'bg-gray-600' : 'bg-gray-100/20'} rounded-md mt-3 flex items-center justify-center`}>
              <Text style={tw`italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Gold Reserve Growth Chart</Text>
            </View>
          </View>

          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl mb-5 ${darkMode ? 'text-white' : 'text-[#454545]'} font-bold`}>
              Token Performance
            </Text>
            <View style={tw`flex-col gap-2.5`}>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/current-token-price.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Market Cap
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.marketCap : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/current-token-price.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Tokens in Circulation
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.tokensInCirculation : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/current-token-price.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Trading Volume
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.tradingVolume : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/current-token-price.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Token Supply Cap
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.tokenSupplyCap : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/current-token-price.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Burned Tokens
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.burnedTokens : 'Loading...'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl mb-5 ${darkMode ? 'text-white' : 'text-[#454545]'} font-bold`}>
              Operational Metrics
            </Text>
            <View style={tw`flex-col gap-2.5`}>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Ore Grade
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.oreGrade : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Recovery Rate
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.recoveryRate : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Tonnes Mined
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.tonnesMined : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Energy & Water Usage
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.energyWater : 'Loading...'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl mb-5 ${darkMode ? 'text-white' : 'text-[#454545]'} font-bold`}>
              Compliance & Security
            </Text>
            <View style={tw`flex-col gap-2.5`}>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Audit Reports
                  </Text>
                  <TouchableOpacity onPress={handleAuditReports}>
                    <Text style={tw`text-base font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {metrics ? metrics.auditReports : 'Loading...'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Smart Contract Audit
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.smartContractAudit : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    KYC Compliance
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.kycCompliance : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Insurance Coverage
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.insuranceCoverage : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Blockchain Explorer
                  </Text>
                  <TouchableOpacity onPress={handleExplorer}>
                    <Text style={tw`text-base font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {metrics ? metrics.blockchainExplorer : 'Loading...'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl mb-5 ${darkMode ? 'text-white' : 'text-[#454545]'} font-bold`}>
              Contact Information
            </Text>
            <View style={tw`flex-col gap-2.5`}>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Investor Contact
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.investorContact : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Support Contact
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.supportContact : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-white/80'} rounded-lg shadow-sm`}>
                <Image source={require('../assets/total-gold-reserves.png')} style={tw`w-7 h-7 mr-3`} />
                <View>
                  <Text style={tw`text-sm font-bold uppercase ${darkMode ? 'text-gray-200' : 'text-[#454545]'}`}>
                    Escalation
                  </Text>
                  <Text style={tw`text-base font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    {metrics ? metrics.escalation : 'Loading...'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={tw`p-3 bg-[#050142] rounded-md mt-5`}
            onPress={handleProfile}
            accessibilityLabel="View Admin Profile"
          >
            <Text style={tw`text-white text-center text-base font-medium`}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Nav darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} userType={userType} toggleMode={toggleMode} />
    </View>
  );
};

export default AdminDashboard;