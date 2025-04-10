import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const Welcome = () => {
  return (
    <View className={`flex-1 justify-center items-center p-5 bg-gray-800 `}>
      <Text className={`text-[32px] font-bold text-white mb-3`}>
        Welcome to DigiKoin
      </Text>
      <Text className={`text-lg text-gray-300 mb-6`}>
        Mining Africa's Gold. Empowering Digital Wealth
      </Text>
      <TouchableOpacity
        className="p-3 px-6 bg-[#050142] rounded-md"
        onPress={() => router.push("/signIn")}
        accessibilityLabel="Get Started with DigiKoin"
      >
        <Text className="text-white text-base font-medium">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
