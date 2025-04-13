import { ThemedButton } from "@/components/ThemedButton";
import ThemedDropdown from "@/components/ThemedDropdown";
import { ThemedInput } from "@/components/ThemedInput";
import { PAYMENT_METHODS, TROY_OUNCE_IN_GRAMS_E8 } from "@/constants";
import {
  client,
  goldReserveManagerContract,
  priceFeedContract,
} from "@/constants/thirdweb";
import { PaymentMethod } from "@/types";
import { calculateEthFromGold, formatBigIntDivision } from "@/utils";
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { prepareContractCall, toWei } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import {
  useSendTransaction,
  useReadContract,
  useActiveAccount,
  useConnect,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const Invest = () => {
  const { connect, isConnecting } = useConnect();
  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [buyAmount, setBuyAmount] = useState<string>("");
  const [buyMethod, setBuyMethod] = useState<PaymentMethod>();
  const [sellAmount, setSellAmount] = useState<string>("");
  const [sellMethod, setSellMethod] = useState<string>("");
  const [buyConfirmation, setBuyConfirmation] = useState<string>("");
  const [sellConfirmation, setSellConfirmation] = useState<string>("");
  const { data: ethPrice } = useReadContract({
    contract: priceFeedContract,
    method: "function getEthPrice() public view returns (uint256)",
  });
  const { data: xauPrice } = useReadContract({
    contract: priceFeedContract,
    method: "function getXauPrice() public view returns (uint256)",
  });

  useEffect(() => {
    if (buyConfirmation || sellConfirmation) {
      const timer = setTimeout(() => {
        setBuyConfirmation("");
        setSellConfirmation("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [buyConfirmation, sellConfirmation]);

  const showTab = (tab: "buy" | "sell") => {
    setActiveTab(tab);
    setBuyConfirmation("");
    setSellConfirmation("");
  };

  const invest = async () => {
    if (ethPrice && xauPrice) {
      if (activeTab === "buy") {
        if (account) {
          await switchChain(sepolia);
          if (isNaN(parseFloat(buyAmount))) {
          } else {
            const transaction = prepareContractCall({
              contract: goldReserveManagerContract,
              method: "function holdGold(uint256 grams) external payable",
              params: [toWei(buyAmount)],
              value: calculateEthFromGold(buyAmount, xauPrice, ethPrice),
            });
            sendTransaction(transaction, {
              onError: (error) => {
                console.error("holdGold: ", error);
              },
            });
          }
        } else {
          connect(async () => {
            const w = createWallet("io.metamask");
            await w.connect({
              client,
            });
            return w;
          });
        }
      }
    }
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
          <View className="p-5 bg-gray-700 rounded-[10px] shadow-sm flex flex-col gap-4 overflow-visible">
            <Text className="text-2xl font-bold text-white mb-3">Buy $DGK</Text>

            {xauPrice && ethPrice ? (
              <Text className="text-md font-bold text-white mb-3">
                {`1 Troy ounce gold = ${formatBigIntDivision(
                  xauPrice,
                  100000000n
                )} USD\n`}
                {`1 Ether = ${formatBigIntDivision(
                  ethPrice,
                  100000000n
                )} USD\n`}
                {`1 DGK = 1 Gram gold ≈ ${formatBigIntDivision(
                  xauPrice,
                  TROY_OUNCE_IN_GRAMS_E8
                )} USD ≈ ${Number(
                  formatBigIntDivision(
                    xauPrice * 100000000n,
                    TROY_OUNCE_IN_GRAMS_E8 * ethPrice
                  )
                )} ETH`}
              </Text>
            ) : (
              <></>
            )}
            <View>
              <Text className="text-lg text-gray-300 mb-2">Amount (grams)</Text>
              <ThemedInput
                placeholder="Amount"
                placeholderTextColor="#A0A0A0"
                value={buyAmount}
                onChangeText={setBuyAmount}
                keyboardType="numeric"
                accessibilityLabel="Buy Amount"
              />
            </View>
            <View>
              <Text className="text-lg text-gray-300 mb-2">Payment Method</Text>
              <ThemedDropdown
                data={PAYMENT_METHODS}
                value={buyMethod}
                onSelect={setBuyMethod}
              />
            </View>
            <ThemedButton
              className="bg-blue-500 p-3 mt-4"
              onPress={invest}
              title={account ? "Confirm Purchase" : "Connect Metamask"}
              loading={isConnecting}
              disabled={isConnecting}
            />
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
