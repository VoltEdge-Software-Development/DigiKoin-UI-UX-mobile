import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Alert } from 'react-native';

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

const Wallet: React.FC = () => {
  const [wallet, setWallet] = useState<string>('digikoin');
  const [depositFormVisible, setDepositFormVisible] = useState<boolean>(false);
  const [withdrawFormVisible, setWithdrawFormVisible] = useState<boolean>(false);
  const [transferFormVisible, setTransferFormVisible] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [transferSource, setTransferSource] = useState<string>('');
  const [transferDest, setTransferDest] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [depositConfirmation, setDepositConfirmation] = useState<string>('');
  const [withdrawConfirmation, setWithdrawConfirmation] = useState<string>('');
  const [transferConfirmation, setTransferConfirmation] = useState<string>('');
  const [error, setError] = useState<string>('');
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
    setError('');
  };

  const showWithdrawForm = () => {
    setDepositFormVisible(false);
    setWithdrawFormVisible(true);
    setTransferFormVisible(false);
    setWithdrawConfirmation('');
    setError('');
  };

  const showTransferForm = () => {
    setDepositFormVisible(false);
    setWithdrawFormVisible(false);
    setTransferFormVisible(true);
    setTransferConfirmation('');
    setError('');
  };

  const deposit = () => {
    if (!wallet || !depositAmount) {
      setError('Please select a wallet and enter an amount.');
      return;
    }
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');
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
      setError('Please select a wallet and enter an amount.');
      return;
    }
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    const currentBalance = parseBalance(walletBalances[wallet]);
    if (currentBalance < amount) {
      setError('Insufficient balance in wallet.');
      return;
    }
    setError('');
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
      setError('Please fill in all fields.');
      return;
    }
    if (transferSource === transferDest) {
      setError('Source and destination wallets cannot be the same.');
      return;
    }
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    const sourceBalance = parseBalance(walletBalances[transferSource]);
    if (sourceBalance < amount) {
      setError('Insufficient balance in source wallet.');
      return;
    }
    setError('');
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
    <View className="flex-1 mt-[70px] p-5 bg-gray-200/85">
      {/* Current Balance */}
      <View className="p-5 bg-orange-50 rounded-[10px] mb-5 items-center">
        <Image
          source={require('../images/DGK.png')}
          className="w-12 h-12 mb-3"
          accessibilityLabel="DigiKoin Emblem"
        />
        <Text className="text-2xl font-bold text-[#050142] mb-2">Current Balance</Text>
        <Text className="text-lg text-[#454545]">{balanceDisplay}</Text>
      </View>

      {/* Wallet Section */}
      <View className="p-5 bg-white/10 rounded-[10px] shadow-sm mb-5">
        <Text className="text-2xl font-bold text-[#454545] mb-3">Wallet</Text>
        <Text className="text-lg text-[#454545] mb-2">Choose Wallet:</Text>
        <TouchableOpacity
          className="border border-gray-300 p-2 rounded-md mb-4 bg-gray-100"
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
          <Text className="text-[#454545]">{wallet ? wallet.toUpperCase() : 'Select a wallet'}</Text>
        </TouchableOpacity>

        <View className="flex-row justify-around mb-4">
          <TouchableOpacity
            className="p-2 px-4 bg-[#050142] rounded-md"
            onPress={showDepositForm}
            accessibilityLabel="Deposit to Wallet"
          >
            <Text className="text-white text-base">Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 px-4 bg-[#050142] rounded-md"
            onPress={showWithdrawForm}
            accessibilityLabel="Withdraw from Wallet"
          >
            <Text className="text-white text-base">Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 px-4 bg-[#050142] rounded-md"
            onPress={showTransferForm}
            accessibilityLabel="Transfer between Wallets"
          >
            <Text className="text-white text-base">Transfer</Text>
          </TouchableOpacity>
        </View>

        {error ? (
          <Text className="text-red-600 mb-4 text-center" accessibilityRole="alert">
            {error}
          </Text>
        ) : null}

        {/* Deposit Form */}
        {depositFormVisible && (
          <View className="mt-4">
            <Text className="text-lg text-[#454545] mb-2">Deposit Amount:</Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-md mb-4 text-[#454545]"
              placeholder="Enter amount"
              value={depositAmount}
              onChangeText={setDepositAmount}
              keyboardType="numeric"
              accessibilityLabel="Deposit Amount"
            />
            <TouchableOpacity
              className="p-3 bg-[#050142] rounded-md mb-4"
              onPress={deposit}
              accessibilityLabel="Confirm Deposit"
            >
              <Text className="text-white text-center text-base font-medium">Confirm Deposit</Text>
            </TouchableOpacity>
            {depositConfirmation ? (
              <Text className="text-green-600 text-center">{depositConfirmation}</Text>
            ) : null}
          </View>
        )}

        {/* Withdraw Form */}
        {withdrawFormVisible && (
          <View className="mt-4">
            <Text className="text-lg text-[#454545] mb-2">Withdraw Amount:</Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-md mb-4 text-[#454545]"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
              keyboardType="numeric"
              accessibilityLabel="Withdraw Amount"
            />
            <TouchableOpacity
              className="p-3 bg-[#050142] rounded-md mb-4"
              onPress={withdraw}
              accessibilityLabel="Confirm Withdrawal"
            >
              <Text className="text-white text-center text-base font-medium">Confirm Withdrawal</Text>
            </TouchableOpacity>
            {withdrawConfirmation ? (
              <Text className="text-green-600 text-center">{withdrawConfirmation}</Text>
            ) : null}
          </View>
        )}

        {/* Transfer Form */}
        {transferFormVisible && (
          <View className="mt-4">
            <Text className="text-lg text-[#454545] mb-2">From:</Text>
            <TouchableOpacity
              className="border border-gray-300 p-2 rounded-md mb-4 bg-gray-100"
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
              <Text className="text-[#454545]">{transferSource ? transferSource.toUpperCase() : 'Select source wallet'}</Text>
            </TouchableOpacity>
            <Text className="text-lg text-[#454545] mb-2">To:</Text>
            <TouchableOpacity
              className="border border-gray-300 p-2 rounded-md mb-4 bg-gray-100"
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
              <Text className="text-[#454545]">{transferDest ? transferDest.toUpperCase() : 'Select destination wallet'}</Text>
            </TouchableOpacity>
            <Text className="text-lg text-[#454545] mb-2">Amount:</Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-md mb-4 text-[#454545]"
              placeholder="Enter amount"
              value={transferAmount}
              onChangeText={setTransferAmount}
              keyboardType="numeric"
              accessibilityLabel="Transfer Amount"
            />
            <TouchableOpacity
              className="p-3 bg-[#050142] rounded-md mb-4"
              onPress={transfer}
              accessibilityLabel="Confirm Transfer"
            >
              <Text className="text-white text-center text-base font-medium">Confirm Transfer</Text>
            </TouchableOpacity>
            {transferConfirmation ? (
              <Text className="text-green-600 text-center">{transferConfirmation}</Text>
            ) : null}
          </View>
        )}
      </View>

      {/* Transaction History */}
      <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
        <Text className="text-2xl font-bold text-[#454545] mb-3">Transaction History</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between py-2 border-b border-gray-300">
              <Text className="text-[#454545] flex-1">{item.date}</Text>
              <Text className="text-[#454545] flex-1">{item.type}</Text>
              <Text className="text-[#454545] flex-1">{item.amount}</Text>
              <Text
                className={`flex-1 text-center ${
                  item.status === 'confirmed'
                    ? 'text-green-600'
                    : item.status === 'pending'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="flex-row justify-between py-2 border-b border-gray-300">
              <Text className="text-[#454545] font-bold flex-1">Date</Text>
              <Text className="text-[#454545] font-bold flex-1">Type</Text>
              <Text className="text-[#454545] font-bold flex-1">Amount</Text>
              <Text className="text-[#454545] font-bold flex-1 text-center">Status</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Wallet;