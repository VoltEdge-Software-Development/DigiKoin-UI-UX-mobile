import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { Picker } from "@react-native-picker/picker";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userType, setUserType] = useState<string>("investor");

  const handleEmailLogin = async () => {
    if (!email || !password || !userType) {
      Alert.alert("Please fill in all fields.");
      return;
    }
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);

      await AsyncStorage.setItem("userEmail", email);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", "Invalid email or password");
      console.log("Error signing in:", error);
    }
    setLoading(false);
  };

  const handleAltLogin = (provider: string) => async () => {
    Alert.alert(`Logging in with ${provider}`, "Coming soon!", [
      { text: "OK" },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-800">
      <View className="flex-1 p-5 justify-center">
        <Text className="text-2xl font-bold text-white mb-5 text-center">
          Login
        </Text>

        <View className="p-4 rounded-lg shadow-md mb-5 bg-gray-700">
          <Text className="text-lg text-gray-300">User Type:</Text>
          <Picker
            selectedValue={userType}
            placeholder="Select user type"
            onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
            // className="border border-gray-300"
            className="border border-gray-300 p-2 rounded-md"
            style={{
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: "gray",
            }}
          >
            <Picker.Item label="Investor" value="investor" />
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Minor" value="minor" />
          </Picker>

          <Text className="text-lg text-gray-300 mb-2">Email:</Text>
          <TextInput
            className="border border-gray-300 p-2 rounded-md mb-4 text-white"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email input"
          />

          <Text className="text-lg text-gray-300 mb-2">Password:</Text>
          <TextInput
            className="border border-gray-300 p-2 rounded-md mb-4 text-white"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            accessibilityLabel="Password input"
          />
          <TouchableOpacity
            className="p-3 bg-[#050142] rounded-md"
            onPress={handleEmailLogin}
            accessibilityLabel="Login to DigiKoin"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size={hp(4)} />
            ) : (
              <Text className="text-white text-center text-base font-medium">
                Login
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.replace("/signUp")}>
          <Text className="text-blue-600 text-center mb-2">
            Don’t have an account? Sign up
          </Text>
        </TouchableOpacity>

        <Text className={"text-gray-300 text-center mb-3"}>Or login with:</Text>
        <View className="flex-row justify-around mb-5">
          <TouchableOpacity
            onPress={handleAltLogin("Google")}
            accessibilityLabel="Login with Google"
          >
            <Image
              source={require("../assets/images/google-logo.png")}
              className="w-10 h-10"
              accessibilityIgnoresInvertColors
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAltLogin("Apple")}
            accessibilityLabel="Login with Apple"
          >
            <Image
              source={require("../assets/images/apple-logo.png")}
              className="w-10 h-10"
              accessibilityIgnoresInvertColors
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAltLogin("Facebook")}
            accessibilityLabel="Login with Facebook"
          >
            <Image
              source={require("../assets/images/facebook-logo.png")}
              className="w-10 h-10"
              accessibilityIgnoresInvertColors
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAltLogin("Metamask")}
            accessibilityLabel="Login with MetaMask"
          >
            <Image
              source={require("../assets/images/metamask-logo.png")}
              className="w-10 h-10"
              accessibilityIgnoresInvertColors
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="p-3 bg-gray-300 rounded-md"
          onPress={() => router.back()}
          accessibilityLabel="Back to Welcome"
        >
          <Text className="text-[#454545] text-center text-base font-medium">
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
