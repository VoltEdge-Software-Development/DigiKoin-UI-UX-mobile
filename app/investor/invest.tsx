import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

const Invest = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [buyAmount, setBuyAmount] = useState<string>("");
  const [buyMethod, setBuyMethod] = useState<string>("");
  const [sellAmount, setSellAmount] = useState<string>("");
  const [sellMethod, setSellMethod] = useState<string>("");
  const [buyConfirmation, setBuyConfirmation] = useState<string>("");
  const [sellConfirmation, setSellConfirmation] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (error || buyConfirmation || sellConfirmation) {
      const timer = setTimeout(() => {
        setError("");
        setBuyConfirmation("");
        setSellConfirmation("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, buyConfirmation, sellConfirmation]);

  const showTab = (tab: "buy" | "sell") => {
    setActiveTab(tab);
    setBuyConfirmation("");
    setSellConfirmation("");
    setError("");
  };

  const buyGold = () => {
    if (!buyAmount || !buyMethod) {
      setError("Please fill in all fields.");
      return;
    }
    const amount = parseFloat(buyAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setError("");
    setBuyConfirmation(
      `Purchased ${buyAmount} using ${buyMethod}. Transaction pending...`
    );
    setTimeout(() => {
      setBuyConfirmation(
        `Purchased ${buyAmount} using ${buyMethod}. Completed!`
      );
    }, 1000);
  };

  const sellGold = () => {
    if (!sellAmount || !sellMethod) {
      setError("Please fill in all fields.");
      return;
    }
    const amount = parseFloat(sellAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setError("");
    setSellConfirmation(
      `Sold ${sellAmount} to ${sellMethod}. Transaction pending...`
    );
    setTimeout(() => {
      setSellConfirmation(`Sold ${sellAmount} to ${sellMethod}. Completed!`);
    }, 1000);
  };

  return (
    <View className="flex-1 bg-gray-800">
      <ScrollView className="flex-1 mt-[70px] p-5">
        {/* Tab Buttons */}
        <View className="flex-row justify-center mb-5">
          <TouchableOpacity
            className={`flex-1 p-3 rounded-tl-md rounded-bl-md ${
              activeTab === "buy" ? "bg-[#050142]" : "bg-gray-300"
            }`}
            onPress={() => showTab("buy")}
            accessibilityLabel="Buy Tab"
          >
            <Text
              className={`text-center text-base font-medium ${
                activeTab === "buy" ? "text-white" : "text-[#454545]"
              }`}
            >
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 p-3 rounded-tr-md rounded-br-md ${
              activeTab === "sell" ? "bg-[#050142]" : "bg-gray-300"
            }`}
            onPress={() => showTab("sell")}
            accessibilityLabel="Sell Tab"
          >
            <Text
              className={`text-center text-base font-medium ${
                activeTab === "sell" ? "text-white" : "text-[#454545]"
              }`}
            >
              Sell
            </Text>
          </TouchableOpacity>
        </View>

        {/* Buy Gold Tab */}
        {activeTab === "buy" && (
          <View className="p-5 bg-gray-700 rounded-[10px] shadow-sm">
            <Text className="text-2xl font-bold text-white mb-3">
              Buy Token
            </Text>
            {error ? (
              <Text className="text-red-600 mb-4" accessibilityRole="alert">
                {error}
              </Text>
            ) : null}
            <Text className="text-lg text-gray-300 mb-2">
              Enter Amount (grams or USD):
            </Text>
            <TextInput
              className="border p-2 rounded-md mb-4 border-gray-600 bg-gray-700 text-gray-300"
              placeholder="Amount"
              placeholderTextColor="#A0A0A0"
              value={buyAmount}
              onChangeText={setBuyAmount}
              keyboardType="numeric"
              accessibilityLabel="Buy Amount"
            />
            <Text className="text-lg text-gray-300 mb-2">
              Choose Payment Method:
            </Text>
            <TouchableOpacity
              className="border p-2 rounded-md mb-4 border-gray-600 bg-gray-700"
              onPress={() =>
                Alert.alert("Select Payment Method", "", [
                  { text: "Crypto", onPress: () => setBuyMethod("crypto") },
                  {
                    text: "Bank Transfer",
                    onPress: () => setBuyMethod("bank-transfer"),
                  },
                  { text: "USDT", onPress: () => setBuyMethod("usdt") },
                  { text: "Cancel", style: "cancel" },
                ])
              }
              accessibilityLabel="Select Buy Method"
            >
              <Text className="text-gray-300">
                {buyMethod || "Select a method"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 bg-[#050142] rounded-md mb-4"
              onPress={buyGold}
              accessibilityLabel="Confirm Purchase"
            >
              <Text className="text-white text-center text-base font-medium">
                Confirm Purchase
              </Text>
            </TouchableOpacity>
            {buyConfirmation ? (
              <Text
                className="text-green-600 text-center"
                accessibilityRole="alert"
              >
                {buyConfirmation}
              </Text>
            ) : null}
          </View>
        )}

        {/* Sell Gold Tab */}
        {activeTab === "sell" && (
          <View className="p-5 bg-gray-700 rounded-[10px] shadow-sm">
            <Text className="text-2xl font-bold text-white mb-3">
              Sell Token
            </Text>
            {error ? (
              <Text className="text-red-600 mb-4" accessibilityRole="alert">
                {error}
              </Text>
            ) : null}
            <Text className="text-lg text-gray-300 mb-2">
              Select Amount (grams/tokens):
            </Text>
            <TextInput
              className="border p-2 rounded-md mb-4 border-gray-600 bg-gray-700 text-gray-300"
              placeholder="Amount"
              placeholderTextColor="#A0A0A0"
              value={sellAmount}
              onChangeText={setSellAmount}
              keyboardType="numeric"
              accessibilityLabel="Sell Amount"
            />
            <Text className="text-lg text-gray-300 mb-2">
              Choose Payout Method:
            </Text>
            <TouchableOpacity
              className="border p-2 rounded-md mb-4 border-gray-600 bg-gray-700"
              onPress={() =>
                Alert.alert("Select Payout Method", "", [
                  { text: "Bank", onPress: () => setSellMethod("bank") },
                  { text: "USDT", onPress: () => setSellMethod("usdt") },
                  {
                    text: "DigiKoin Wallet",
                    onPress: () => setSellMethod("digikoin-wallet"),
                  },
                  { text: "Cancel", style: "cancel" },
                ])
              }
              accessibilityLabel="Select Sell Method"
            >
              <Text className="text-gray-300">
                {sellMethod || "Select a method"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 bg-[#050142] rounded-md mb-4"
              onPress={sellGold}
              accessibilityLabel="Confirm Sale"
            >
              <Text className="text-white text-center text-base font-medium">
                Confirm Sale
              </Text>
            </TouchableOpacity>
            {sellConfirmation ? (
              <Text
                className="text-green-600 text-center"
                accessibilityRole="alert"
              >
                {sellConfirmation}
              </Text>
            ) : null}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Invest;
