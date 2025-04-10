import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { useAuth } from "@/context/authContext";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { register } = useAuth();

  const handleSignUp = async () => {
    setLoading(true);
    await register(emailRef.current, passwordRef.current);
    setLoading(false);
  };

  return (
    <View className={`flex-1 bg-gray-800`}>
      <View className={`flex-1 p-5 justify-center mt-[70px]`}>
        <Text className={`text-2xl font-bold text-white mb-5 text-center`}>
          Sign Up
        </Text>
        <TextInput
          className={`border border-gray-300 p-3 rounded-md mb-4 bg-gray-700 text-white`}
          onChangeText={(value) => (emailRef.current = value)}
          placeholder="Email"
          placeholderTextColor={"#A0A0A0"}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email input"
        />
        <TextInput
          className={`border border-gray-300 p-3 rounded-md mb-4 bg-gray-700 text-white`}
          onChangeText={(value) => (passwordRef.current = value)}
          placeholder="Password"
          placeholderTextColor={"#A0A0A0"}
          secureTextEntry
          accessibilityLabel="Password input"
        />
        <TouchableOpacity
          className={`p-3 bg-[#050142] rounded-md mb-4`}
          onPress={handleSignUp}
          accessibilityLabel="Sign Up"
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size={hp(4)} />
          ) : (
            <Text className={`text-white text-center text-base font-medium`}>
              Sign Up
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.replace("/signIn")}
          accessibilityLabel="Go to Login"
        >
          <Text className={`text-center text-blue-400`}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
