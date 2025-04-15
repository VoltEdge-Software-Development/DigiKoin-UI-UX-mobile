import { TROY_OUNCE_IN_GRAMS_E8 } from "@/constants";
import { dgkTokenContract, goldReserveManagerContract, priceFeedContract } from "@/constants/thirdweb";
import { calculateEthFromGold, formatBigIntDivision } from "@/utils";
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Linking,
} from "react-native";
import Toast from "react-native-toast-message";
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { balanceOf } from "thirdweb/extensions/erc20";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedButton } from "@/components/ThemedButton";
import { prepareContractCall, toWei, Address } from "thirdweb";
import { transfer } from "thirdweb/extensions/erc20";
import { sendTransaction as sendTransactionToWallet } from "thirdweb";

type Status = "confirmed" | "pending" | "failed";
type Transaction = {
  id: string;
  date: string;
  type: string;
  amount: string;
  status: Status;
}
const TX_DUMMY_DATA: Transaction[] = [
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

type Tab = "Buy" | "Sell" | "Send";
const TABS: Tab[] = [
  "Buy",
  "Sell",
  "Send",
]

interface TabPropsType {
  activeTab: Tab;
}
const Tab: React.FC<TabPropsType> = (props) => {
  const [amount, setAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const account = useActiveAccount();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const disabled = useMemo(() => !account || isNaN(parseFloat(amount)) || (props.activeTab === "Send" && !recipient), [account, amount, recipient, props]);
  const { data: ethPrice } = useReadContract({
    contract: priceFeedContract,
    method: "function getEthPrice() public view returns (uint256)",
  });
  const { data: xauPrice } = useReadContract({
    contract: priceFeedContract,
    method: "function getXauPrice() public view returns (uint256)",
  });

  const confirm = async () => {
    if (ethPrice && xauPrice) {
      if (account) {
        if (isNaN(parseFloat(amount))) {
        } else {
          if (props.activeTab === "Buy") {
            const transaction = prepareContractCall({
              contract: goldReserveManagerContract,
              method: "function holdGold(uint256 grams) external payable",
              params: [toWei(amount)],
              value: calculateEthFromGold(amount, xauPrice, ethPrice),
            });
            sendTransaction(transaction, {
              onError: (error) => {
                console.error("holdGold: ", error);
              },
              onSuccess(data) {
                Toast.show({
                  type: "success",
                  text1: `Succssfully bought ${amount} $DGK`,
                  text2: 'Click to view transaction',
                  onPress: () => {
                    const explorers = data.chain.blockExplorers;
                    if (explorers?.length) {
                      Linking.openURL(`${explorers[0].url}/tx/${data.transactionHash}`)
                    }
                  }
                })
              },
            });
          }
          if (props.activeTab === "Sell") {
            const transaction = prepareContractCall({
              contract: goldReserveManagerContract,
              method: "function redeemGold(uint256 grams) external",
              params: [toWei(amount)],
            });
            sendTransaction(transaction, {
              onError: (error) => {
                console.error("redeemGold: ", error);
              },
              onSuccess(data) {
                Toast.show({
                  type: "success",
                  text1: `Succssfully sold ${amount} $DGK`,
                  text2: 'Click to view transaction',
                  onPress: () => {
                    const explorers = data.chain.blockExplorers;
                    if (explorers?.length) {
                      Linking.openURL(`${explorers[0].url}/tx/${data.transactionHash}`)
                    }
                  }
                })
              },
            });
          }
          if (props.activeTab === "Send" && recipient) {
            const transaction = transfer({
              contract: dgkTokenContract,
              to: recipient,
              amount: amount,
            });
            sendTransactionToWallet({ transaction, account })
              .then((data) => {
                Toast.show({
                  type: "success",
                  text1: `Succssfully sent ${amount} $DGK`,
                  text2: 'Click to view transaction',
                  onPress: () => {
                    const explorers = data.chain.blockExplorers;
                    if (explorers?.length) {
                      Linking.openURL(`${explorers[0].url}/tx/${data.transactionHash}`)
                    }
                  }
                })
              })
              .catch((error) => {
                console.error("transfer: ", error);
              });
          }
        }
      }
    }
  }

  return (
    <View className="bg-gray-700 rounded-b flex flex-col gap-2 overflow-visible p-4">
      <Text className="text-2xl font-bold text-white mb-3">{props.activeTab} $DGK</Text>
      <View className="flex flex-col gap-2">
        <ThemedInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          accessibilityLabel="Buy Amount"
        />
        {props.activeTab === "Send" &&
          <ThemedInput
            placeholder="Recipient address 0x..."
            value={recipient}
            onChangeText={setRecipient}
            keyboardType="numeric"
            accessibilityLabel="Buy Amount"
          />
        }
      </View>
      <ThemedButton
        className={`${disabled ? 'bg-gray-500' : 'bg-blue-500'} w-1/2 m-auto p-3 mt-4`}
        onPress={confirm}
        title={account ? "Confirm" : "Please connect wallet"}
        disabled={disabled}
      />
    </View>
  );
}

const Wallet = () => {
  const account = useActiveAccount();
  const { data: ethPrice } = useReadContract({
    contract: priceFeedContract,
    method: "function getEthPrice() public view returns (uint256)",
  });
  const { data: xauPrice } = useReadContract({
    contract: priceFeedContract,
    method: "function getXauPrice() public view returns (uint256)",
  });
  const [dgkBalance, setDGKBalance] = useState<bigint | "NaN">("NaN");
  const [activeTab, setActiveTab] = useState<Tab>("Buy");

  useEffect(() => {
    if (account) {
      balanceOf({
        contract: dgkTokenContract,
        address: account.address,
      }).then((result) => {
        setDGKBalance(result);
      });
    } else {
      setDGKBalance("NaN");
    }
  }, [account]);

  return (
    <ScrollView className="flex-1 p-5 flex flex-col gap-4">
      <View className="p-5 bg-orange-50 rounded-[10px] mb-5 items-center">
        <View className="w-[50%] aspect-square">
          <Image
            source={require("@/assets/images/icon.png")}
            className="size-full"
            accessibilityIgnoresInvertColors
          />
        </View>
        <Text className="text-2xl font-bold text-[#050142] mb-2">
          Current Balance
        </Text>
        <Text className="text-lg text-[#454545]">
          {dgkBalance.toString()} DGK
        </Text>
      </View>

      {xauPrice && ethPrice ? (
        <Text className="text-md font-bold mb-3">
          {`1 Troy ounce gold = ${formatBigIntDivision(
            xauPrice,
            100000000n
          )} USD\n`}
          {`1 Ether = ${formatBigIntDivision(ethPrice, 100000000n)} USD\n`}
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

      <View className="rounded">
        <View className='flex-1'>
          {/* Tab headers */}
          <View className='flex-row border-b border-gray-200'>
            {TABS.map((tab, index) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`flex-1 items-center py-3 px-4 ${activeTab === tab && 'border-b-2 border-blue-500'}`}
              >
                <Text
                  className={`font-medium ${activeTab === tab ? 'text-blue-500' : 'text-gray-500'}`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab content */}
          <View className='flex-1'>
            {activeTab === 'Buy' && <Tab activeTab="Buy" />}
            {activeTab === 'Sell' && <Tab activeTab="Sell" />}
            {activeTab === 'Send' && <Tab activeTab="Send" />}
          </View>
        </View>
      </View>

      <View className="p-5 rounded">
        <Text className="text-2xl font-bold text-[#454545] text-center mb-3">
          Transaction History
        </Text>
        <FlatList
          data={TX_DUMMY_DATA}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
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
                className={`flex-1 text-center ${item.status === "confirmed"
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
    </ScrollView>
  );
};

export default Wallet;
