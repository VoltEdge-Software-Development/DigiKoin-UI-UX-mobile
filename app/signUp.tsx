import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { useAuth } from "@/contexts/authContext";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedButton } from "@/components/ThemedButton";
import ThemedDropdown from "@/components/ThemedDropdown";
import Toast from "react-native-toast-message";
import { USER_TYPES } from "@/constants";
import { UserType } from "@/types";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userType, setUserType] = useState<UserType>();
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (email && password && confirmPassword && userType) {
      if (password !== confirmPassword) {
        Toast.show({
          type: "error",
          text1: "Incorrect password!",
        });
      } else {
        setLoading(true);
        await signUp(email, password, userType);
        setLoading(false);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields!",
      });
    }
  };

  return (
    <View className={`flex-1 bg-gray-800`}>
      <View className={`flex-1 p-5 justify-center mt-[70px]`}>
        <Text className={`text-2xl font-bold text-white mb-5 text-center`}>
          Sign Up
        </Text>
        <View className="p-4 rounded-lg bg-gray-700 flex flex-col gap-4">
          <Text className="text-lg text-gray-300">User Type</Text>
          <ThemedDropdown
            data={USER_TYPES}
            value={userType}
            onSelect={setUserType}
          />

          <View>
            <Text className="text-lg text-gray-300 mb-2">Email</Text>
            <ThemedInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={"#A0A0A0"}
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Email input"
            />
          </View>

          <View>
            <Text className="text-lg text-gray-300 mb-2">Password</Text>
            <ThemedInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={"#A0A0A0"}
              secureTextEntry
              accessibilityLabel="Password input"
            />
          </View>

          <View>
            <Text className="text-lg text-gray-300 mb-2">Confirm Password</Text>
            <ThemedInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              placeholderTextColor={"#A0A0A0"}
              secureTextEntry
              accessibilityLabel="Password input"
            />
          </View>

          <ThemedButton
            className="bg-blue-800 p-3 w-full mt-4"
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
            loadingTitle="Singing Up..."
          />
        </View>
        <Text className="text-center mt-4">
          Already have an account?{"  "}
          <Link href="/signIn" className="text-blue-500 underline">
            Sign In
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
