import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Image, View, Text } from "react-native";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "@/constants/thirdweb";
import { sepolia } from "thirdweb/chains";
import { LinearGradient } from "expo-linear-gradient";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <LinearGradient
      colors={['#2A1F1A', '#01011A']}
      start={{ x: 0.5, y: 0 }}   // Starts from top center
      end={{ x: 0.5, y: 1 }}     // Ends at bottom center
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1 }}>
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
            header: (props) => {
              return (
                <View className="h-20 w-full flex flex-row items-center justify-between px-4">
                  <View className="flex flex-row items-center gap-2">
                    <View className="h-[70%] aspect-square justify-center">
                      <Image
                        source={require("@/assets/images/Gorilla.png")}
                        className="size-full"
                        accessibilityIgnoresInvertColors
                      />
                    </View>
                    <Text className="text-[#9F9F9F] text-2xl font-bold">
                      {props.options.title}
                    </Text>
                  </View>
                  <View className="w-56">
                    <ConnectButton
                      client={client}
                      wallets={[createWallet("io.metamask")]}
                      chain={sepolia}
                      showAllWallets={false}
                    />
                  </View>
                </View>
              );
            },
          }}
          sceneContainerStyle={{
            backgroundColor: "transparent",
          }}
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
      </View>
    </LinearGradient>
  );
}
