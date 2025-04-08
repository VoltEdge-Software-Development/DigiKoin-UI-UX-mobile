import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Switch,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather, Octicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { useAuth } from "@/context/authContext";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const navigation = useNavigation();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSignUp = async () => {
    // router.push('/KYC');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current,
        passwordRef.current
      );

      const usersCollection = collection(db, "users");

      const emailQuery = query(
        usersCollection,
        where("email", "==", emailRef.current)
      );
      const emailSnapshot = await getDocs(emailQuery);

      if (emailSnapshot.empty) {
        await addDoc(usersCollection, { email: emailRef.current });
        console.log("User signed up:", userCredential.user);

        await AsyncStorage.setItem("userEmail", emailRef.current);
        router.push("/home");
        // navigation.navigate('Home', { userEmail: emailRef.current });
      } else {
        Alert.alert("Login Instead");
        console.log("User with the email already exists.");
      }
    } catch (error) {
      Alert.alert("Error", "Invalid email or password");
      console.log("Error signing up:", error);
    }
  };

  return (
    <View className={`flex-1 bg-gray-800`}>
      {/* <Header darkMode={darkMode} toggleMode={toggleMode} /> */}
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
        >
          <Text className={`text-white text-center text-base font-medium`}>
            Sign Up
          </Text>
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
