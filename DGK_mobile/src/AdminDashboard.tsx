import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation stack param list
type RootStackParamList = {
  BuySell: undefined;
  Profile: undefined;
};

// Define metrics type
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

const AdminDashboard: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    // Simulate fetching data
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

  const handleInvestNow = () => navigation.navigate('BuySell');
  const handleViewWhitepaper = () => Linking.openURL('/path-to-whitepaper.pdf');
  const handleAuditReports = () => Linking.openURL('/path-to-audit-reports.pdf');
  const handleExplorer = () => Linking.openURL('https://blockchain-explorer-url.com'); // Placeholder

  return (
    <View className="flex-1 mt-[70px] p-7 bg-gray-200/85">
      {/* Hero Section */}
      <View className="p-10 bg-orange-50 rounded-[10px] mb-7 text-center">
        <Text className="text-[32px] mb-2 text-[#050142] font-bold">
          Invest in Gold-Backed Digital Assets with Confidence
        </Text>
        <Text className="text-lg mb-5 text-[#454545]">Real Gold. Real Value. Real Security.</Text>
        <View className="flex-row justify-around flex-wrap gap-4 mb-5">
          <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
            <Image source={require('../assets/current-token-price.png')} className="w-7 h-7 mr-3" />
            <View>
              <Text className="text-sm font-bold uppercase text-[#454545]">Current Token Price</Text>
              <Text className="text-base font-medium">{metrics ? metrics.tokenPrice : 'Loading...'}</Text>
              <Text className="text-xs text-gray-600">N/A</Text>
            </View>
          </View>
          <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
            <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
            <View>
              <Text className="text-sm font-bold uppercase text-[#454545]">Total Gold Reserves</Text>
              <Text className="text-base font-medium">{metrics ? metrics.goldReserves : 'Loading...'}</Text>
              <Text className="text-xs text-gray-600">N/A</Text>
            </View>
          </View>
          <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
            <Image source={require('../assets/total-active-investors.png')} className="w-7 h-7 mr-3" />
            <View>
              <Text className="text-sm font-bold uppercase text-[#454545]">Total Active Investors</Text>
              <Text className="text-base font-medium">{metrics ? metrics.activeInvestors : 'Loading...'}</Text>
              <Text className="text-xs text-gray-600">N/A</Text>
            </View>
          </View>
        </View>
        <View className="flex-row justify-center gap-5">
          <TouchableOpacity
            className="p-2 px-5 bg-[#050142] rounded-md"
            onPress={handleInvestNow}
            accessibilityLabel="Invest Now in DigiKoin"
          >
            <Text className="text-white text-base">Invest Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 px-5 bg-[#050142] rounded-md"
            onPress={handleViewWhitepaper}
            accessibilityLabel="View Whitepaper PDF"
          >
            <Text className="text-white text-base">View Whitepaper</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dashboard Grid */}
      <View className="flex-col gap-5">
        {/* Gold Reserve Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl mb-5 text-[#454545] font-bold">Gold Reserve Metrics</Text>
          <View className="flex-col gap-2.5">
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Total Gold Reserves</Text>
                <Text className="text-base font-medium">
                  {metrics ? `${metrics.goldReserves} (0.175 tons)` : 'Loading...'}
                </Text>
                <Text className="text-xs text-gray-600">N/A</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Vault Details</Text>
                <Text className="text-base font-medium">{metrics ? metrics.vaultDetails : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Reserve Growth</Text>
                <Text className="text-base font-medium">{metrics ? metrics.reserveGrowth : 'Loading...'}</Text>
              </View>
            </View>
          </View>
          <View className="h-[150px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Interactive Gold Reserve Map</Text>
          </View>
          <View className="h-[150px] bg-gray-100/20 rounded-md mt-3 flex items-center justify-center">
            <Text className="italic text-gray-600">Gold Reserve Growth Chart</Text>
          </View>
        </View>

        {/* Token Performance */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl mb-5 text-[#454545] font-bold">Token Performance</Text>
          <View className="flex-col gap-2.5">
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/current-token-price.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Market Cap</Text>
                <Text className="text-base font-medium">{metrics ? metrics.marketCap : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/current-token-price.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Tokens in Circulation</Text>
                <Text className="text-base font-medium">{metrics ? metrics.tokensInCirculation : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/current-token-price.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Trading Volume</Text>
                <Text className="text-base font-medium">{metrics ? metrics.tradingVolume : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/current-token-price.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Token Supply Cap</Text>
                <Text className="text-base font-medium">{metrics ? metrics.tokenSupplyCap : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/current-token-price.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Burned Tokens</Text>
                <Text className="text-base font-medium">{metrics ? metrics.burnedTokens : 'Loading...'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Operational Metrics */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl mb-5 text-[#454545] font-bold">Operational Metrics</Text>
          <View className="flex-col gap-2.5">
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Ore Grade</Text>
                <Text className="text-base font-medium">{metrics ? metrics.oreGrade : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Recovery Rate</Text>
                <Text className="text-base font-medium">{metrics ? metrics.recoveryRate : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Tonnes Mined</Text>
                <Text className="text-base font-medium">{metrics ? metrics.tonnesMined : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Energy & Water Usage</Text>
                <Text className="text-base font-medium">{metrics ? metrics.energyWater : 'Loading...'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Compliance & Security */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl mb-5 text-[#454545] font-bold">Compliance & Security</Text>
          <View className="flex-col gap-2.5">
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Audit Reports</Text>
                <TouchableOpacity onPress={handleAuditReports}>
                  <Text className="text-base font-medium text-blue-600">
                    {metrics ? metrics.auditReports : 'Loading...'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Smart Contract Audit</Text>
                <Text className="text-base font-medium">{metrics ? metrics.smartContractAudit : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">KYC Compliance</Text>
                <Text className="text-base font-medium">{metrics ? metrics.kycCompliance : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Insurance Coverage</Text>
                <Text className="text-base font-medium">{metrics ? metrics.insuranceCoverage : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Blockchain Explorer</Text>
                <TouchableOpacity onPress={handleExplorer}>
                  <Text className="text-base font-medium text-blue-600">
                    {metrics ? metrics.blockchainExplorer : 'Loading...'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Info */}
        <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
          <Text className="text-2xl mb-5 text-[#454545] font-bold">Contact Information</Text>
          <View className="flex-col gap-2.5">
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Investor Contact</Text>
                <Text className="text-base font-medium">{metrics ? metrics.investorContact : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Support Contact</Text>
                <Text className="text-base font-medium">{metrics ? metrics.supportContact : 'Loading...'}</Text>
              </View>
            </View>
            <View className="flex-row items-center p-2 bg-white/80 rounded-lg shadow-sm">
              <Image source={require('../assets/total-gold-reserves.png')} className="w-7 h-7 mr-3" />
              <View>
                <Text className="text-sm font-bold uppercase text-[#454545]">Escalation</Text>
                <Text className="text-base font-medium">{metrics ? metrics.escalation : 'Loading...'}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdminDashboard;