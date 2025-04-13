import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { useAuth } from "@/contexts/authContext";
import { ThemedButton } from "@/components/ThemedButton";
import Toast from "react-native-toast-message";
import { ThemedInput } from "@/components/ThemedInput";
import { AuthMethod } from "@/types";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signIn } = useAuth();
  const altAuth = [
    {
      icon: require("@/assets/images/google.png"),
      method: "google",
    },
    {
      icon: require("@/assets/images/apple.png"),
      method: "apple",
    },
    {
      icon: require("@/assets/images/facebook.png"),
      method: "facebook",
    },
    {
      icon: require("@/assets/images/metamask.png"),
      method: "metamask",
    },
  ];

  const handleSignIn = async (method?: AuthMethod) => {
    setLoading(true);
    if (method) {
      await signIn({ method });
    } else {
      await signIn({ email, password });
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-gray-800">
      <View className="flex-1 p-5 justify-center">
        <Text className="text-2xl font-bold text-white mb-5 text-center">
          Login
        </Text>
        <View className="p-4 rounded-lg bg-gray-700 flex flex-col gap-4">
          <View>
            <Text className="text-lg text-gray-300">Email</Text>
            <ThemedInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Email input"
            />
          </View>
          <View>
            <Text className="text-lg text-gray-300">Password</Text>
            <ThemedInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              accessibilityLabel="Password input"
            />
          </View>
          <ThemedButton
            className="bg-blue-800 p-3 w-full mt-4"
            title="Sign In"
            onPress={() => handleSignIn()}
            disabled={!email || !password}
            loading={loading}
            loadingTitle="Singing In..."
          />
        </View>
        <Text className="text-center mb-2">
          Don't have an account?{"  "}
          <Link href="/signUp" className="text-blue-500 underline">
            Sign up
          </Link>
        </Text>
        <View className="flex-row justify-around mb-5">
          {altAuth.map((auth, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSignIn(auth.method as AuthMethod)}
            >
              <Image
                source={auth.icon}
                className="w-10 h-10"
                accessibilityIgnoresInvertColors
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SignIn;
