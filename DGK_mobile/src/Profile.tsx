import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation stack param list
type RootStackParamList = {
  Home: undefined; // Assuming '/' routes to a Home screen
};

// Define user info type
interface UserInfo {
  name: string;
  verified: string;
}

// Define props type
interface ProfileProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Profile: React.FC<ProfileProps> = ({ setIsLoggedIn }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUserInfo({ name: 'Sandzile', verified: 'Verified' });
    }, 1000);

    // No DOM animations in React Native; could use Animated API if needed
  }, []);

  const changePassword = () => {
    Alert.alert(
      'Change Password',
      'Are you sure you want to change your password?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            setMessage('Password change request submitted! Check your email for further instructions.');
            setTimeout(() => setMessage(''), 3000);
          },
        },
      ]
    );
  };

  const enable2FA = () => {
    Alert.alert(
      'Enable 2FA',
      'Enable Two-Factor Authentication?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            setTimeout(() => {
              setMessage('2FA enabled successfully!');
              setTimeout(() => setMessage(''), 3000);
            }, 1000);
          },
        },
      ]
    );
  };

  const setupBiometricLogin = () => {
    Alert.alert(
      'Biometric Login',
      'Set up biometric login?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            setTimeout(() => {
              setMessage('Biometric login setup completed!');
              setTimeout(() => setMessage(''), 3000);
            }, 1000);
          },
        },
      ]
    );
  };

  const manageNotifications = () => {
    Alert.alert(
      'Notifications',
      'Manage your notification settings?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            setMessage('Notification settings updated!');
            setTimeout(() => setMessage(''), 3000);
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            localStorage.removeItem('userType');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('kycVerified');
            setIsLoggedIn(false);
            setMessage('You have been logged out successfully!');
            setTimeout(() => {
              navigation.navigate('Home');
              setMessage('');
            }, 2000);
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 p-5 bg-gray-100">
      {/* Message Display */}
      {message ? (
        <Text className="text-center text-base text-green-600 mb-5">{message}</Text>
      ) : null}

      {/* User Info Section */}
      <View className="mb-5 bg-white p-4 rounded-lg shadow-md" accessibilityRole="region" accessibilityLabel="User Info">
        <Text className="text-2xl font-bold text-[#454545] mb-2">User Info</Text>
        <Text className="text-lg text-[#454545]">
          <Text className="font-bold">Name: </Text>
          {userInfo ? userInfo.name : 'Loading...'}
        </Text>
        <Text className="text-lg text-[#454545]">
          <Text className="font-bold">ID Verification Status: </Text>
          {userInfo ? userInfo.verified : 'Loading...'}
        </Text>
      </View>

      {/* Security Settings Section */}
      <View className="mb-5 bg-white p-4 rounded-lg shadow-md" accessibilityRole="region" accessibilityLabel="Security Settings">
        <Text className="text-2xl font-bold text-[#454545] mb-2">Security Settings</Text>
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
      <View className="mb-5 bg-white p-4 rounded-lg shadow-md" accessibilityRole="region" accessibilityLabel="Notification Center">
        <Text className="text-2xl font-bold text-[#454545] mb-2">Notification Center</Text>
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
      <View className="mb-5 bg-white p-4 rounded-lg shadow-md" accessibilityRole="region" accessibilityLabel="Account">
        <Text className="text-2xl font-bold text-[#454545] mb-2">Account</Text>
        <TouchableOpacity
          className="p-3 bg-[#050142] rounded-md"
          onPress={handleLogout}
          accessibilityLabel="Log Out of Account"
        >
          <Text className="text-white text-center text-base">Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;