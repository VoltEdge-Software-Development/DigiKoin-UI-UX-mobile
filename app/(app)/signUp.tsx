import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { useAuth } from "@/contexts/authContext";
import { Picker } from "@react-native-picker/picker";
import { USER_TYPES } from "@/constants/user";
import { UserType } from "@/types/user";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userType, setUserType] = useState<UserType>();
  const { register } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password || !userType) {
      Alert.alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await register(email, password, userType);
    setLoading(false);
  };

  return (
    <View className={`flex-1 bg-gray-800`}>
      <View className={`flex-1 p-5 justify-center mt-[70px]`}>
        <Text className={`text-2xl font-bold text-white mb-5 text-center`}>
          Sign Up
        </Text>
        <Text className="text-lg text-gray-300">User Type:</Text>
        <Picker
          selectedValue={userType}
          placeholder="Select user type"
          onValueChange={setUserType}
          className="border border-gray-300 p-2 rounded-md"
          style={{
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "gray",
          }}
        >
          {USER_TYPES.map((type, index) => (
            <Picker.Item key={index} label={type} value={type} />
          ))}
        </Picker>

        <Text className="text-lg text-gray-300 mb-2">Email:</Text>
        <TextInput
          className={`border border-gray-300 p-3 rounded-md mb-4 bg-gray-700 text-white`}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={"#A0A0A0"}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email input"
        />

        <Text className="text-lg text-gray-300 mb-2">Password:</Text>
        <TextInput
          className={`border border-gray-300 p-3 rounded-md mb-4 bg-gray-700 text-white`}
          onChangeText={setPassword}
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
