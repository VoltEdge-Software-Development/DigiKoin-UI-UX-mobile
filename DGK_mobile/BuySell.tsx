import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Switch, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, BuySellProps } from './types'; 
import Nav from './Nav';
import tw from 'twrnc';

// Define Header props type with async toggleMode
interface HeaderProps {
  darkMode: boolean;
  toggleMode: () => Promise<void>;
}

// Header Component
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

// Use BuySellProps from types.ts
const BuySell: React.FC<BuySellProps> = ({ setIsLoggedIn, userType, darkMode, toggleMode }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'BuySell'>>();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [buyAmount, setBuyAmount] = useState<string>('');
  const [buyMethod, setBuyMethod] = useState<string>('');
  const [sellAmount, setSellAmount] = useState<string>('');
  const [sellMethod, setSellMethod] = useState<string>('');
  const [buyConfirmation, setBuyConfirmation] = useState<string>('');
  const [sellConfirmation, setSellConfirmation] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (error || buyConfirmation || sellConfirmation) {
      const timer = setTimeout(() => {
        setError('');
        setBuyConfirmation('');
        setSellConfirmation('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, buyConfirmation, sellConfirmation]);

  const showTab = (tab: 'buy' | 'sell') => {
    setActiveTab(tab);
    setBuyConfirmation('');
    setSellConfirmation('');
    setError('');
  };

  const buyGold = () => {
    if (!buyAmount || !buyMethod) {
      setError('Please fill in all fields.');
      return;
    }
    const amount = parseFloat(buyAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');
    setBuyConfirmation(`Purchased ${buyAmount} using ${buyMethod}. Transaction pending...`);
    setTimeout(() => {
      setBuyConfirmation(`Purchased ${buyAmount} using ${buyMethod}. Completed!`);
    }, 1000);
  };

  const sellGold = () => {
    if (!sellAmount || !sellMethod) {
      setError('Please fill in all fields.');
      return;
    }
    const amount = parseFloat(sellAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');
    setSellConfirmation(`Sold ${sellAmount} to ${sellMethod}. Transaction pending...`);
    setTimeout(() => {
      setSellConfirmation(`Sold ${sellAmount} to ${sellMethod}. Completed!`);
    }, 1000);
  };

  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-800/85' : 'bg-gray-200/85'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <View style={tw`flex-1 mt-[70px] p-5`}>
        {/* Tab Buttons */}
        <View style={tw`flex-row justify-center mb-5`}>
          <TouchableOpacity
            style={tw`flex-1 p-3 rounded-tl-md rounded-bl-md ${
              activeTab === 'buy' ? 'bg-[#050142]' : 'bg-gray-300'
            }`}
            onPress={() => showTab('buy')}
            accessibilityLabel="Buy Tab"
          >
            <Text
              style={tw`text-center text-base font-medium ${
                activeTab === 'buy' ? 'text-white' : 'text-[#454545]'
              }`}
            >
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-1 p-3 rounded-tr	md rounded-br-md ${
              activeTab === 'sell' ? 'bg-[#050142]' : 'bg-gray-300'
            }`}
            onPress={() => showTab('sell')}
            accessibilityLabel="Sell Tab"
          >
            <Text
              style={tw`text-center text-base font-medium ${
                activeTab === 'sell' ? 'text-white' : 'text-[#454545]'
              }`}
            >
              Sell
            </Text>
          </TouchableOpacity>
        </View>

        {/* Buy Gold Tab */}
        {activeTab === 'buy' && (
          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
              Buy Token
            </Text>
            {error ? (
              <Text style={tw`text-red-600 mb-4`} accessibilityRole="alert">
                {error}
              </Text>
            ) : null}
            <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'} mb-2`}>
              Enter Amount (grams or USD):
            </Text>
            <TextInput
              style={tw`border p-2 rounded-md mb-4 ${
                darkMode ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-300 bg-white/80 text-[#454545]'
              }`}
              placeholder="Amount"
              placeholderTextColor={darkMode ? '#A0A0A0' : '#999'}
              value={buyAmount}
              onChangeText={setBuyAmount}
              keyboardType="numeric"
              accessibilityLabel="Buy Amount"
            />
            <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'} mb-2`}>
              Choose Payment Method:
            </Text>
            <TouchableOpacity
              style={tw`border p-2 rounded-md mb-4 ${
                darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-100'
              }`}
              onPress={() =>
                Alert.alert('Select Payment Method', '', [
                  { text: 'Crypto', onPress: () => setBuyMethod('crypto') },
                  { text: 'Bank Transfer', onPress: () => setBuyMethod('bank-transfer') },
                  { text: 'USDT', onPress: () => setBuyMethod('usdt') },
                  { text: 'Cancel', style: 'cancel' },
                ])
              }
              accessibilityLabel="Select Buy Method"
            >
              <Text style={tw`${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                {buyMethod || 'Select a method'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`p-3 bg-[#050142] rounded-md mb-4`}
              onPress={buyGold}
              accessibilityLabel="Confirm Purchase"
            >
              <Text style={tw`text-white text-center text-base font-medium`}>Confirm Purchase</Text>
            </TouchableOpacity>
            {buyConfirmation ? (
              <Text style={tw`text-green-600 text-center`} accessibilityRole="alert">
                {buyConfirmation}
              </Text>
            ) : null}
          </View>
        )}

        {/* Sell Gold Tab */}
        {activeTab === 'sell' && (
          <View style={tw`p-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'} rounded-[10px] shadow-sm`}>
            <Text style={tw`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#454545]'} mb-3`}>
              Sell Token
            </Text>
            {error ? (
              <Text style={tw`text-red-600 mb-4`} accessibilityRole="alert">
                {error}
              </Text>
            ) : null}
            <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'} mb-2`}>
              Select Amount (grams/tokens):
            </Text>
            <TextInput
              style={tw`border p-2 rounded-md mb-4 ${
                darkMode ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-300 bg-white/80 text-[#454545]'
              }`}
              placeholder="Amount"
              placeholderTextColor={darkMode ? '#A0A0A0' : '#999'}
              value={sellAmount}
              onChangeText={setSellAmount}
              keyboardType="numeric"
              accessibilityLabel="Sell Amount"
            />
            <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'} mb-2`}>
              Choose Payout Method:
            </Text>
            <TouchableOpacity
              style={tw`border p-2 rounded-md mb-4 ${
                darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-100'
              }`}
              onPress={() =>
                Alert.alert('Select Payout Method', '', [
                  { text: 'Bank', onPress: () => setSellMethod('bank') },
                  { text: 'USDT', onPress: () => setSellMethod('usdt') },
                  { text: 'DigiKoin Wallet', onPress: () => setSellMethod('digikoin-wallet') },
                  { text: 'Cancel', style: 'cancel' },
                ])
              }
              accessibilityLabel="Select Sell Method"
            >
              <Text style={tw`${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                {sellMethod || 'Select a method'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`p-3 bg-[#050142] rounded-md mb-4`}
              onPress={sellGold}
              accessibilityLabel="Confirm Sale"
            >
              <Text style={tw`text-white text-center text-base font-medium`}>Confirm Sale</Text>
            </TouchableOpacity>
            {sellConfirmation ? (
              <Text style={tw`text-green-600 text-center`} accessibilityRole="alert">
                {sellConfirmation}
              </Text>
            ) : null}
          </View>
        )}
      </View>

      {/* Navigation Bar */}
      <Nav darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} userType={userType} toggleMode={toggleMode} />
    </View>
  );
};

export default BuySell;