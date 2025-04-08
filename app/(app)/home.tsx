import { View, Text, TouchableOpacity, Button } from "react-native";
import React from "react";
import { auth } from "@/firebaseConfig";

const Home = () => {
  return (
    <View className={`flex-1 justify-center items-center p-5 bg-gray-800 `}>
      <Text className={`text-[32px] font-bold text-white mb-3`}>
        Home
      </Text>
      <Button title="Sign out" onPress={() => auth.signOut()} />
    </View>
  );
};

export default Home;
