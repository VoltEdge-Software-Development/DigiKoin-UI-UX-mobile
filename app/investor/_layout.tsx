import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Image } from "react-native";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "@/constants/thirdweb";
import { sepolia } from "thirdweb/chains";
// import "@/styles/index.css";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet", {
    appMetadata: {
      name: "DigiKoin",
    },
    mobileConfig: {
      callbackURL: "com.voltedge.digikoin://",
    },
    walletConfig: {
      options: "smartWalletOnly",
    },
  }),
  createWallet("me.rainbow"),
  createWallet("com.trustwallet.app"),
  createWallet("io.zerion.wallet"),
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: useClientOnlyValue(false, true),
        // tabBarBackground: "black",
        tabBarStyle: {
          backgroundColor: "#000000", // Black background
          borderTopWidth: 0, // Remove top border
          elevation: 0, // Remove shadow on Android
        },
        tabBarInactiveTintColor: "#888888", // Gray for inactive tabs
        headerStyle: {
          backgroundColor: "#1a1a1a", // Dark header
        },
        headerTitleStyle: {
          color: "white", // White text
          fontWeight: "bold",
        },
        headerTintColor: "white", // Back button color
        headerLeft: () => (
          <Image
            source={require("@/assets/images/Gorilla.png")}
            className="h-[80%] w-auto aspect-square ml-3"
            accessibilityIgnoresInvertColors
          />
        ),
        headerRight: () => (
          <ConnectButton
            client={client}
            theme={"dark"}
            wallets={wallets}
            chain={sepolia}
            connectButton={{
              label: "Connect",
            }}
          />
        ),
        // account ? (
        //   <ThemedButton
        //     className="p-3 mt-4"
        //     onPress={() => {
        //       Alert.alert("Disconnect?", "", [
        //         { text: "OK", onPress: () => disconnect() },
        //         { text: "Cancel", style: "cancel" },
        //       ]);
        //     }}
        //     title={shortenAddress(account.address)}
        //   />
        // ) : (
        //   <ThemedButton
        //     className="p-3 mt-4"
        //     onPress={() => {
        //       connect(async () => {
        //         const w = createWallet("io.metamask");
        //         await w.connect({
        //           client,
        //         });
        //         return w;
        //       });
        //     }}
        //     title={"Connect wallet"}
        //     loading={isConnecting}
        //     disabled={isConnecting}
        //   />
        // ),
      }}
      sceneContainerStyle={{ backgroundColor: Colors["dark"].tint }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <TabBarIcon name="dashboard" color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
        }}
      />
      <Tabs.Screen
        name="trackStorage"
        options={{
          title: "Track",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="compass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
