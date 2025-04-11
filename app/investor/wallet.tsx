import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";

type WalletType = "digikoin" | "btc" | "eth" | "usdt";
type ActionType = "deposit" | "withdraw" | "transfer";
type Status = "confirmed" | "pending" | "failed";

interface WalletBalances {
  [key: string]: string;
}

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: string;
  status: Status;
}

const initialBalances: WalletBalances = {
  digikoin: "100 DGK",
  btc: "0.5 BTC",
  eth: "2 ETH",
  usdt: "500 USDT",
};

const Wallet: React.FC = () => {
  const [wallet, setWallet] = useState<WalletType>("digikoin");
  const [balances, setBalances] = useState<WalletBalances>(initialBalances);
  const [action, setAction] = useState<ActionType | null>(null);
  const [form, setForm] = useState({
    amount: "",
    source: "" as WalletType | "",
    destination: "" as WalletType | "",
  });
  const [message, setMessage] = useState({ error: "", success: "" });

  const transactions: Transaction[] = [
    {
      id: "1",
      date: "2025-02-10",
      type: "Deposit",
      amount: "1 BTC",
      status: "confirmed",
    },
    {
      id: "2",
      date: "2025-02-09",
      type: "Withdraw",
      amount: "0.5 ETH",
      status: "pending",
    },
    {
      id: "3",
      date: "2025-02-08",
      type: "Deposit",
      amount: "100 USDT",
      status: "failed",
    },
    {
      id: "4",
      date: "2025-02-07",
      type: "Deposit",
      amount: "2 BTC",
      status: "confirmed",
    },
    {
      id: "5",
      date: "2025-02-06",
      type: "Transfer",
      amount: "1 ETH",
      status: "pending",
    },
    {
      id: "6",
      date: "2025-02-05",
      type: "Deposit",
      amount: "200 USDT",
      status: "failed",
    },
    {
      id: "7",
      date: "2025-02-04",
      type: "Transfer",
      amount: "0.3 BTC",
      status: "confirmed",
    },
    {
      id: "8",
      date: "2025-02-03",
      type: "Withdraw",
      amount: "0.2 ETH",
      status: "pending",
    },
    {
      id: "9",
      date: "2025-02-02",
      type: "Deposit",
      amount: "50 USDT",
      status: "confirmed",
    },
  ];

  const parseAmount = (str: string) =>
    parseFloat(str.match(/[\d.]+/)?.[0] || "0");
  const formatBalance = (original: string, delta: number) => {
    const amount = parseAmount(original) + delta;
    const unit = original.replace(/[\d.]+/, "").trim();
    return `${Math.max(amount, 0)} ${unit}`;
  };

  const updateWallet = (delta: number, key: WalletType) => {
    setBalances((prev) => ({
      ...prev,
      [key]: formatBalance(prev[key], delta),
    }));
  };

  const resetForm = () => {
    setForm({ amount: "", source: "", destination: "" });
    setAction(null);
    setMessage({ error: "", success: "" });
  };

  const handleAction = () => {
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0)
      return setMessage({ error: "Invalid amount.", success: "" });

    if (action === "deposit") {
      updateWallet(amount, wallet);
      setMessage({ success: `Deposited ${amount} to ${wallet}`, error: "" });
    } else if (action === "withdraw") {
      if (parseAmount(balances[wallet]) < amount)
        return setMessage({ error: "Insufficient funds.", success: "" });
      updateWallet(-amount, wallet);
      setMessage({ success: `Withdrew ${amount} from ${wallet}`, error: "" });
    } else if (action === "transfer") {
      const { source, destination } = form;
      if (!source || !destination || source === destination)
        return setMessage({
          error: "Invalid source/destination.",
          success: "",
        });
      if (parseAmount(balances[source]) < amount)
        return setMessage({
          error: "Insufficient source balance.",
          success: "",
        });
      updateWallet(-amount, source);
      updateWallet(amount, destination);
      setMessage({
        success: `Transferred ${amount} from ${source} to ${destination}`,
        error: "",
      });
    }

    setTimeout(resetForm, 3000);
  };

  const WalletPicker = (label: string, onSelect: (w: WalletType) => void) => (
    <TouchableOpacity
      className="border border-gray-300 p-2 rounded-md mb-4 bg-gray-100"
      onPress={() =>
        Alert.alert(label, "", [
          { text: "DigiKoin", onPress: () => onSelect("digikoin") },
          { text: "BTC", onPress: () => onSelect("btc") },
          { text: "ETH", onPress: () => onSelect("eth") },
          { text: "USDT", onPress: () => onSelect("usdt") },
          { text: "Cancel", style: "cancel" },
        ])
      }
    >
      <Text className="text-[#454545]">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 mt-[70px] p-5 bg-gray-200/85">
      <View className="p-5 bg-orange-50 rounded-[10px] mb-5 items-center">
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-12 h-12 mb-3"
        />
        <Text className="text-2xl font-bold text-[#050142] mb-2">
          Current Balance
        </Text>
        <Text className="text-lg text-[#454545]">
          Balance: {balances[wallet]}
        </Text>
      </View>

      <View className="p-5 bg-white/10 rounded-[10px] shadow-sm mb-5">
        <Text className="text-2xl font-bold text-[#454545] mb-3">Wallet</Text>
        <Text className="text-lg text-[#454545] mb-2">Choose Wallet:</Text>
        {WalletPicker(wallet.toUpperCase(), setWallet)}

        <View className="flex-row justify-around mb-4">
          {(["deposit", "withdraw", "transfer"] as ActionType[]).map((a) => (
            <TouchableOpacity
              key={a}
              className="p-2 px-4 bg-[#050142] rounded-md"
              onPress={() => {
                setAction(a);
                setMessage({ error: "", success: "" });
              }}
            >
              <Text className="text-white text-base capitalize">{a}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {message.error && (
          <Text className="text-red-600 mb-4 text-center">{message.error}</Text>
        )}
        {message.success && (
          <Text className="text-green-600 mb-4 text-center">
            {message.success}
          </Text>
        )}

        {action && (
          <View>
            {action === "transfer" && (
              <>
                {WalletPicker(
                  `From: ${form.source || "Select source wallet"}`,
                  (w) => setForm((f) => ({ ...f, source: w }))
                )}
                {WalletPicker(
                  `To: ${form.destination || "Select destination wallet"}`,
                  (w) => setForm((f) => ({ ...f, destination: w }))
                )}
              </>
            )}
            <TextInput
              className="border border-gray-300 p-2 rounded-md mb-4 text-[#454545]"
              placeholder="Enter amount"
              value={form.amount}
              onChangeText={(val) => setForm((f) => ({ ...f, amount: val }))}
              keyboardType="numeric"
            />
            <TouchableOpacity
              className="p-3 bg-[#050142] rounded-md mb-4"
              onPress={handleAction}
            >
              <Text className="text-white text-center text-base font-medium">
                Confirm {action}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View className="p-5 bg-white/10 rounded-[10px] shadow-sm">
        <Text className="text-2xl font-bold text-[#454545] mb-3">
          Transaction History
        </Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <View className="flex-row justify-between py-2 border-b border-gray-300">
              {["Date", "Type", "Amount", "Status"].map((label) => (
                <Text
                  key={label}
                  className="text-[#454545] font-bold flex-1 text-center"
                >
                  {label}
                </Text>
              ))}
            </View>
          )}
          renderItem={({ item }) => (
            <View className="flex-row justify-between py-2 border-b border-gray-300">
              <Text className="text-[#454545] flex-1">{item.date}</Text>
              <Text className="text-[#454545] flex-1">{item.type}</Text>
              <Text className="text-[#454545] flex-1">{item.amount}</Text>
              <Text
                className={`flex-1 text-center ${
                  item.status === "confirmed"
                    ? "text-green-600"
                    : item.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Wallet;
