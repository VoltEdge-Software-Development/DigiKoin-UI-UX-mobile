import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, WalletProps } from './types';
import Header from './Header';
import Nav from './Nav';
import tw from 'twrnc';

interface WalletBalances {
  digikoin: string;
  btc: string;
  eth: string;
  usdt: string;
}

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: string;
  status: 'confirmed' | 'pending' | 'failed';
}

// Use WalletProps from types.ts, which includes toggleMode: () => Promise<void>
const Wallet: React.FC<WalletProps> = ({ setIsLoggedIn, userType, darkMode, toggleMode }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Wallet'>>();
  type WalletKey = keyof WalletBalances;
  const [wallet, setWallet] = useState<WalletKey>('digikoin');
  const [depositFormVisible, setDepositFormVisible] = useState<boolean>(false);
  const [withdrawFormVisible, setWithdrawFormVisible] = useState<boolean>(false);
  const [transferFormVisible, setTransferFormVisible] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [transferSource, setTransferSource] = useState<WalletKey | ''>('');
  const [transferDest, setTransferDest] = useState<WalletKey | ''>('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [depositConfirmation, setDepositConfirmation] = useState<string>('');
  const [withdrawConfirmation, setWithdrawConfirmation] = useState<string>('');
  const [transferConfirmation, setTransferConfirmation] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [walletBalances, setWalletBalances] = useState<WalletBalances>({
    digikoin: '100 DGK',
    btc: '0.5 BTC',
    eth: '2 ETH',
    usdt: '500 USDT',
  });
  const [balanceDisplay, setBalanceDisplay] = useState<string>('Balance: 100 DGK');

  const transactions: Transaction[] = [
    { id: '1', date: '2025-02-10', type: 'Deposit', amount: '1 BTC', status: 'confirmed' },
    { id: '2', date: '2025-02-09', type: 'Withdraw', amount: '0.5 ETH', status: 'pending' },
    { id: '3', date: '2025-02-08', type: 'Deposit', amount: '100 USDT', status: 'failed' },
    { id: '4', date: '2025-02-07', type: 'Deposit', amount: '2 BTC', status: 'confirmed' },
    { id: '5', date: '2025-02-06', type: 'Transfer', amount: '1 ETH', status: 'pending' },
    { id: '6', date: '2025-02-05', type: 'Deposit', amount: '200 USDT', status: 'failed' },
    { id: '7', date: '2025-02-04', type: 'Transfer', amount: '0.3 BTC', status: 'confirmed' },
    { id: '8', date: '2025-02-03', type: 'Withdraw', amount: '0.2 ETH', status: 'pending' },
    { id: '9', date: '2025-02-02', type: 'Deposit', amount: '50 USDT', status: 'confirmed' },
  ];

  useEffect(() => {
    updateBalance();
  }, [wallet, walletBalances]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const updateBalance = () => {
    if (wallet && walletBalances[wallet]) {
      setBalanceDisplay(`Balance: ${walletBalances[wallet]}`);
    } else {
      setBalanceDisplay('Please select a wallet to view balance.');
    }
  };

  const parseBalance = (balanceString: string): number => {
    const match = balanceString.match(/([\d.]+)/);
    return match ? parseFloat(match[0]) : 0;
  };

  const updateBalanceString = (balanceString: string, delta: number): string => {
    const value = parseBalance(balanceString);
    const unit = balanceString.replace(/[\d.]+/, '').trim();
    const newValue = value + delta;
    return newValue > 0 ? `${newValue} ${unit}` : `0 ${unit}`;
  };

  const showDepositForm = () => {
    setDepositFormVisible(true);
    setWithdrawFormVisible(false);
    setTransferFormVisible(false);
    setDepositConfirmation('');
    setErrorMessage('');
  };

  const showWithdrawForm = () => {
    setDepositFormVisible(false);
    setWithdrawFormVisible(true);
    setTransferFormVisible(false);
    setWithdrawConfirmation('');
    setErrorMessage('');
  };

  const showTransferForm = () => {
    setDepositFormVisible(false);
    setWithdrawFormVisible(false);
    setTransferFormVisible(true);
    setTransferConfirmation('');
    setErrorMessage('');
  };

  const deposit = () => {
    if (!wallet || !depositAmount) {
      setErrorMessage('Please select a wallet and enter an amount.');
      return;
    }
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid amount.');
      return;
    }
    setErrorMessage('');
    const newBalances = { ...walletBalances };
    newBalances[wallet] = updateBalanceString(newBalances[wallet], amount);
    setWalletBalances(newBalances);
    setDepositConfirmation(`Deposited ${amount} to ${wallet} wallet. Transaction completed!`);
    setDepositAmount('');
    setTimeout(() => {
      setDepositConfirmation('');
      setDepositFormVisible(false);
    }, 3000);
  };

  const withdraw = () => {
    if (!wallet || !withdrawAmount) {
      setErrorMessage('Please select a wallet and enter an amount.');
      return;
    }
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid amount.');
      return;
    }
    const currentBalance = parseBalance(walletBalances[wallet]);
    if (currentBalance < amount) {
      setErrorMessage('Insufficient balance in wallet.');
      return;
    }
    setErrorMessage('');
    const newBalances = { ...walletBalances };
    newBalances[wallet] = updateBalanceString(newBalances[wallet], -amount);
    setWalletBalances(newBalances);
    setWithdrawConfirmation(`Withdrawn ${amount} from ${wallet} wallet. Transaction completed!`);
    setWithdrawAmount('');
    setTimeout(() => {
      setWithdrawConfirmation('');
      setWithdrawFormVisible(false);
    }, 3000);
  };

  const transfer = () => {
    if (!transferSource || !transferDest || !transferAmount) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (transferSource === transferDest) {
      setErrorMessage('Source and destination wallets cannot be the same.');
      return;
    }
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid amount.');
      return;
    }
    const sourceBalance = parseBalance(walletBalances[transferSource]);
    if (sourceBalance < amount) {
      setErrorMessage('Insufficient balance in source wallet.');
      return;
    }
    setErrorMessage('');
    const newBalances = { ...walletBalances };
    newBalances[transferSource] = updateBalanceString(newBalances[transferSource], -amount);
    newBalances[transferDest] = updateBalanceString(newBalances[transferDest], amount);
    setWalletBalances(newBalances);
    setTransferConfirmation(`Transferred ${amount} from ${transferSource} to ${transferDest}. Transaction completed!`);
    setTransferSource('');
    setTransferDest('');
    setTransferAmount('');
    setTimeout(() => {
      setTransferConfirmation('');
      setTransferFormVisible(false);
    }, 3000);
  };

  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-800/85' : 'bg-gray-200/85'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-5 mt-[70px]`}>
          {/* Error Message Display */}
          {errorMessage && (
            <View style={tw`absolute top-10 left-0 right-0 z-10 p-4 mx-7 bg-red-500/90 rounded-md`}>
              <Text style={tw`text-white text-center`}>{errorMessage}</Text>
            </View>
          )}

          {/* Current Balance */}
          <View style={tw`p-5 rounded-[10px] mb-5 items-center ${darkMode ? 'bg-orange-100/20' : 'bg-orange-50'}`}>
            <Image
              source={require('../assets/DGK.png')}
              style={tw`w-12 h-12 mb-3`}
              accessibilityLabel="DigiKoin Emblem"
            />
            <Text style={tw`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#050142]'}`}>
              Current Balance
            </Text>
            <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
              {balanceDisplay}
            </Text>
          </View>

          {/* Wallet Section */}
          <View style={tw`p-5 rounded-[10px] shadow-sm mb-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'}`}>
            <Text style={tw`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-[#454545]'}`}>
              Wallet
            </Text>
            <Text style={tw`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
              Choose Wallet:
            </Text>
            <TouchableOpacity
              style={tw`border p-2 rounded-md mb-4 ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-100'}`}
              onPress={() =>
                Alert.alert('Select Wallet', '', [
                  { text: 'DigiKoin', onPress: () => setWallet('digikoin') },
                  { text: 'BTC', onPress: () => setWallet('btc') },
                  { text: 'ETH', onPress: () => setWallet('eth') },
                  { text: 'USDT', onPress: () => setWallet('usdt') },
                  { text: 'Cancel', style: 'cancel' },
                ])
              }
              accessibilityLabel="Select Wallet"
            >
              <Text style={tw`${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                {wallet ? wallet.toUpperCase() : 'Select a wallet'}
              </Text>
            </TouchableOpacity>

            <View style={tw`flex-row justify-around mb-4`}>
              <TouchableOpacity style={tw`p-2 px-4 bg-[#050142] rounded-md`} onPress={showDepositForm}>
                <Text style={tw`text-white text-base`}>Deposit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`p-2 px-4 bg-[#050142] rounded-md`} onPress={showWithdrawForm}>
                <Text style={tw`text-white text-base`}>Withdraw</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`p-2 px-4 bg-[#050142] rounded-md`} onPress={showTransferForm}>
                <Text style={tw`text-white text-base`}>Transfer</Text>
              </TouchableOpacity>
            </View>

            {/* Deposit Form */}
            {depositFormVisible && (
              <View style={tw`mt-4`}>
                <Text style={tw`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  Deposit Amount:
                </Text>
                <TextInput
                  style={tw`border p-2 rounded-md mb-4 ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-300 bg-white/80 text-[#454545]'}`}
                  placeholder="Enter amount"
                  placeholderTextColor={darkMode ? '#A0A0A0' : '#999'}
                  value={depositAmount}
                  onChangeText={setDepositAmount}
                  keyboardType="numeric"
                  accessibilityLabel="Deposit Amount"
                />
                <TouchableOpacity style={tw`p-3 bg-[#050142] rounded-md mb-4`} onPress={deposit}>
                  <Text style={tw`text-white text-center text-base font-medium`}>Confirm Deposit</Text>
                </TouchableOpacity>
                {depositConfirmation && (
                  <Text style={tw`text-green-400 text-center`} accessibilityRole="alert">
                    {depositConfirmation}
                  </Text>
                )}
              </View>
            )}

            {/* Withdraw Form */}
            {withdrawFormVisible && (
              <View style={tw`mt-4`}>
                <Text style={tw`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  Withdraw Amount:
                </Text>
                <TextInput
                  style={tw`border p-2 rounded-md mb-4 ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-300 bg-white/80 text-[#454545]'}`}
                  placeholder="Enter amount"
                  placeholderTextColor={darkMode ? '#A0A0A0' : '#999'}
                  value={withdrawAmount}
                  onChangeText={setWithdrawAmount}
                  keyboardType="numeric"
                  accessibilityLabel="Withdraw Amount"
                />
                <TouchableOpacity style={tw`p-3 bg-[#050142] rounded-md mb-4`} onPress={withdraw}>
                  <Text style={tw`text-white text-center text-base font-medium`}>Confirm Withdrawal</Text>
                </TouchableOpacity>
                {withdrawConfirmation && (
                  <Text style={tw`text-green-400 text-center`} accessibilityRole="alert">
                    {withdrawConfirmation}
                  </Text>
                )}
              </View>
            )}

            {/* Transfer Form */}
            {transferFormVisible && (
              <View style={tw`mt-4`}>
                <Text style={tw`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  From:
                </Text>
                <TouchableOpacity
                  style={tw`border p-2 rounded-md mb-4 ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-100'}`}
                  onPress={() =>
                    Alert.alert('Select Source Wallet', '', [
                      { text: 'DigiKoin', onPress: () => setTransferSource('digikoin') },
                      { text: 'BTC', onPress: () => setTransferSource('btc') },
                      { text: 'ETH', onPress: () => setTransferSource('eth') },
                      { text: 'USDT', onPress: () => setTransferSource('usdt') },
                      { text: 'Cancel', style: 'cancel' },
                    ])
                  }
                  accessibilityLabel="Select Source Wallet"
                >
                  <Text style={tw`${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                    {transferSource ? transferSource.toUpperCase() : 'Select source wallet'}
                  </Text>
                </TouchableOpacity>
                <Text style={tw`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  To:
                </Text>
                <TouchableOpacity
                  style={tw`border p-2 rounded-md mb-4 ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-100'}`}
                  onPress={() =>
                    Alert.alert('Select Destination Wallet', '', [
                      { text: 'DigiKoin', onPress: () => setTransferDest('digikoin') },
                      { text: 'BTC', onPress: () => setTransferDest('btc') },
                      { text: 'ETH', onPress: () => setTransferDest('eth') },
                      { text: 'USDT', onPress: () => setTransferDest('usdt') },
                      { text: 'Cancel', style: 'cancel' },
                    ])
                  }
                  accessibilityLabel="Select Destination Wallet"
                >
                  <Text style={tw`${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                    {transferDest ? transferDest.toUpperCase() : 'Select destination wallet'}
                  </Text>
                </TouchableOpacity>
                <Text style={tw`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                  Amount:
                </Text>
                <TextInput
                  style={tw`border p-2 rounded-md mb-4 ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-300 bg-white/80 text-[#454545]'}`}
                  placeholder="Enter amount"
                  placeholderTextColor={darkMode ? '#A0A0A0' : '#999'}
                  value={transferAmount}
                  onChangeText={setTransferAmount}
                  keyboardType="numeric"
                  accessibilityLabel="Transfer Amount"
                />
                <TouchableOpacity style={tw`p-3 bg-[#050142] rounded-md mb-4`} onPress={transfer}>
                  <Text style={tw`text-white text-center text-base font-medium`}>Confirm Transfer</Text>
                </TouchableOpacity>
                {transferConfirmation && (
                  <Text style={tw`text-green-400 text-center`} accessibilityRole="alert">
                    {transferConfirmation}
                  </Text>
                )}
              </View>
            )}
          </View>

          {/* Transaction History */}
          <View style={tw`p-5 rounded-[10px] shadow-sm mb-5 ${darkMode ? 'bg-gray-700' : 'bg-white/10'}`}>
            <Text style={tw`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-[#454545]'}`}>
              Transaction History
            </Text>
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={tw`flex-row justify-between py-2 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <Text style={tw`flex-1 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                    {item.date}
                  </Text>
                  <Text style={tw`flex-1 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                    {item.type}
                  </Text>
                  <Text style={tw`flex-1 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                    {item.amount}
                  </Text>
                  <Text
                    style={tw`flex-1 text-center ${
                      item.status === 'confirmed'
                        ? 'text-green-400'
                        : item.status === 'pending'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
              )}
              ListHeaderComponent={() => (
                <View style={tw`flex-row justify-between py-2 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <Text style={tw`font-bold flex-1 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                    Date
                  </Text>
                  <Text style={tw`font-bold flex-1 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                    Type
                  </Text>
                  <Text style={tw`font-bold flex-1 ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                    Amount
                  </Text>
                  <Text style={tw`font-bold flex-1 text-center ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
                    Status
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
      <Nav darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} userType={userType} toggleMode={toggleMode} />
    </View>
  );
};

export default Wallet;