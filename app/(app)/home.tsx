import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@/context/authContext";

const Home = () => {
  const { logout } = useAuth();
  return (
    <View className={`flex-1 justify-center items-center p-5 bg-gray-800 `}>
      <Text className={`text-[32px] font-bold text-white mb-3`}>Home</Text>
      <Button title="Sign out" onPress={logout} />
    </View>
  );
};

export default Home;
