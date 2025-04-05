import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './types';
import Header from './Header';
import Nav from './Nav';
import tw from 'twrnc'; // Add twrnc import

interface ProfileProps {
  setIsLoggedIn: (value: boolean) => void;
  userType: 'minor' | 'investor' | 'admin' | null;
  darkMode: boolean;
  toggleMode: () => void;
}

interface UserInfo {
  name: string;
  verified: string;
}

const Profile: React.FC<ProfileProps> = ({ setIsLoggedIn, userType, darkMode, toggleMode }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Profile'>>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUserInfo({ name: 'Sandzile', verified: 'Verified' });
    }, 1000);
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

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove(['userType', 'isLoggedIn', 'kycVerified', 'darkMode']);
              setIsLoggedIn(false);
              setMessage('You have been logged out successfully!');
              setTimeout(() => {
                navigation.navigate('Welcome');
                setMessage('');
              }, 2000);
            } catch (error) {
              console.error('Error during logout:', error);
              setMessage('Logout failed. Please try again.');
              setTimeout(() => setMessage(''), 3000);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={tw`flex-1 ${darkMode ? 'bg-gray-800/85' : 'bg-gray-200/85'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-5 mt-[70px]`}>
          {/* Message Display */}
          {message ? (
            <Text
              style={tw`text-center text-base mb-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`}
              accessibilityRole="alert"
            >
              {message}
            </Text>
          ) : null}

          {/* User Info Section */}
          <View
            style={tw`mb-5 p-4 rounded-[10px] shadow-md ${darkMode ? 'bg-white/5' : 'bg-white/10'}`}
            accessibilityLabel="User Info Section"
          >
            <Text style={tw`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#454545]'}`}>
              User Info
            </Text>
            <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
              <Text style={tw`font-bold`}>Name: </Text>
              {userInfo ? userInfo.name : 'Loading...'}
            </Text>
            <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'}`}>
              <Text style={tw`font-bold`}>ID Verification Status: </Text>
              {userInfo ? userInfo.verified : 'Loading...'}
            </Text>
          </View>

          {/* Security Settings Section */}
          <View
            style={tw`mb-5 p-4 rounded-[10px] shadow-md ${darkMode ? 'bg-white/5' : 'bg-white/10'}`}
            accessibilityLabel="Security Settings Section"
          >
            <Text style={tw`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#454545]'}`}>
              Security Settings
            </Text>
            <TouchableOpacity onPress={changePassword}>
              <Text style={tw`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-2`}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={enable2FA}>
              <Text style={tw`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-2`}>Enable 2FA</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={setupBiometricLogin}>
              <Text style={tw`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Setup Biometric Login</Text>
            </TouchableOpacity>
          </View>

          {/* Notification Center Section */}
          <View
            style={tw`mb-5 p-4 rounded-[10px] shadow-md ${darkMode ? 'bg-white/5' : 'bg-white/10'}`}
            accessibilityLabel="Notification Center Section"
          >
            <Text style={tw`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#454545]'}`}>
              Notification Center
            </Text>
            <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'} mb-2`}>
              <Text style={tw`font-bold`}>Price Alerts: </Text>Enabled
            </Text>
            <Text style={tw`text-lg ${darkMode ? 'text-gray-300' : 'text-[#454545]'} mb-2`}>
              <Text style={tw`font-bold`}>Transaction Updates: </Text>Enabled
            </Text>
            <TouchableOpacity onPress={manageNotifications}>
              <Text style={tw`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Manage Notification</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Section */}
          <View
            style={tw`mb-5 p-4 rounded-[10px] shadow-md ${darkMode ? 'bg-white/5' : 'bg-white/10'}`}
            accessibilityLabel="Account Section"
          >
            <Text style={tw`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#454545]'}`}>Account</Text>
            <TouchableOpacity style={tw`p-3 bg-[#050142] rounded-md`} onPress={handleLogout}>
              <Text style={tw`text-white text-center text-base`}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Nav darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} userType={userType} />
    </View>
  );
};

export default Profile;