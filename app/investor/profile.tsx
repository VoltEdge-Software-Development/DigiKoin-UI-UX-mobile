import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useAuth } from "@/contexts/authContext";
import { ThemedButton } from "@/components/ThemedButton";

const Profile = () => {
  const [message, setMessage] = useState<string>("");
  const { signOut, user, kyc } = useAuth();
  const [checkingKYC, kycStatus] = kyc

  const changePassword = () => {
    Alert.alert(
      "Change Password",
      "Are you sure you want to change your password?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            setMessage(
              "Password change request submitted! Check your email for further instructions."
            );
            setTimeout(() => setMessage(""), 3000);
          },
        },
      ]
    );
  };

  const enable2FA = () => {
    Alert.alert("Enable 2FA", "Enable Two-Factor Authentication?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          setTimeout(() => {
            setMessage("2FA enabled successfully!");
            setTimeout(() => setMessage(""), 3000);
          }, 1000);
        },
      },
    ]);
  };

  const setupBiometricLogin = () => {
    Alert.alert("Biometric Login", "Set up biometric login?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          setTimeout(() => {
            setMessage("Biometric login setup completed!");
            setTimeout(() => setMessage(""), 3000);
          }, 1000);
        },
      },
    ]);
  };

  const manageNotifications = () => {
    Alert.alert("Notifications", "Manage your notification settings?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          setMessage("Notification settings updated!");
          setTimeout(() => setMessage(""), 3000);
        },
      },
    ]);
  };

  const handleLogout = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          signOut();
        },
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 p-5">
      {/* Message Display */}
      {message ? (
        <Text className="text-center text-base text-green-600 mb-5">
          {message}
        </Text>
      ) : null}

      {/* User Info Section */}
      <View
        className="mb-5 bg-white p-4 rounded-lg shadow-md"
        accessibilityLabel="User Info"
      >
        <Text className="text-2xl font-bold text-[#454545] mb-2">
          User Info
        </Text>
        <Text className="text-lg text-[#454545]">
          <Text className="font-bold">Email: </Text>
          {user ? user.email : "Loading..."}
        </Text>
        <Text className="text-lg text-[#454545]">
          <Text className="font-bold">ID Verification Status: </Text>
          <Text className="uppercase">
            {checkingKYC
              ? "Loading..."
              : kycStatus}
          </Text>
        </Text>
      </View>

      {/* Security Settings Section */}
      <View
        className="mb-5 bg-white p-4 rounded-lg shadow-md"
        accessibilityLabel="Security Settings"
      >
        <Text className="text-2xl font-bold text-[#454545] mb-2">
          Security Settings
        </Text>
        <TouchableOpacity onPress={changePassword}>
          <Text className="text-lg text-blue-600 mb-2">Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={enable2FA}>
          <Text className="text-lg text-blue-600 mb-2">Enable 2FA</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={setupBiometricLogin}>
          <Text className="text-lg text-blue-600">Setup Biometric Login</Text>
        </TouchableOpacity>
      </View>

      {/* Notification Center Section */}
      <View
        className="mb-5 bg-white p-4 rounded-lg shadow-md"
        accessibilityLabel="Notification Center"
      >
        <Text className="text-2xl font-bold text-[#454545] mb-2">
          Notification Center
        </Text>
        <Text className="text-lg text-[#454545] mb-2">
          <Text className="font-bold">Price Alerts: </Text>Enabled
        </Text>
        <Text className="text-lg text-[#454545] mb-2">
          <Text className="font-bold">Transaction Updates: </Text>Enabled
        </Text>
        <TouchableOpacity onPress={manageNotifications}>
          <Text className="text-lg text-blue-600">Manage Notification</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Section */}
      <ThemedButton
        title="Sign out"
        className="p-3 bg-[#050142] rounded-md"
        onPress={handleLogout}
      />
    </ScrollView>
  );
};

export default Profile;
