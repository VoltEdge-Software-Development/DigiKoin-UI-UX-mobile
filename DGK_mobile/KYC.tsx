import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, PermissionsAndroid, Switch, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import { RootStackParamList } from './types';

interface Message {
  text: string;
  type: 'success' | 'error' | '';
}

interface KYCProps {
  setIsLoggedIn: (value: boolean) => void;
}

// Define Header props type
interface HeaderProps {
  darkMode: boolean;
  toggleMode: () => void;
}

// Header Component
const Header: React.FC<HeaderProps> = ({ darkMode, toggleMode }) => {
  return (
    <View
      className={`w-full flex-row items-center justify-between p-5 shadow-md fixed top-0 left-0 z-[1000] min-h-[70px] ${
        darkMode ? 'bg-[#333333]/95' : 'bg-[#111111]/80'
      }`}
      style={{ elevation: 4 }}
    >
      <Image
        source={require('../assets/Gorilla.png')}
        className="w-[50px] h-[50px] ml-5"
        resizeMode="contain"
        accessibilityLabel="DigiKoin Logo"
      />
      <Text
        className={`text-[24px] font-bold flex-1 mr-auto ${
          darkMode ? 'text-[#FFB84D]' : 'text-[#B36300]'
        }`}
      >
        DigiKoin
      </Text>
      <Switch
        value={darkMode}
        onValueChange={toggleMode}
        thumbColor={darkMode ? '#FFFFFF' : '#050142'}
        trackColor={{ false: '#CCC', true: darkMode ? '#FFB84D' : '#AEADAD' }}
        className="mr-5"
        accessibilityLabel="Toggle Dark Mode"
      />
    </View>
  );
};

const KYC: React.FC<KYCProps> = ({ setIsLoggedIn }) => {
  const [govID, setGovID] = useState<string | null>(null);
  const [facialRec, setFacialRec] = useState<string | null>(null);
  const [message, setMessage] = useState<Message>({ text: '', type: '' });
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'KYC'>>();

  const toggleMode = () => setDarkMode(prev => !prev);

  const requestPermissions = async (type: 'govID' | 'facialRec') => {
    try {
      if (type === 'govID') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Photo Library Permission',
            message: 'DigiKoin needs access to your photo library for KYC.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'DigiKoin needs camera access for facial recognition.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (error) {
      console.error(`Error requesting ${type} permission:`, error);
      return false;
    }
  };

  const pickFile = async (type: 'govID' | 'facialRec') => {
    const hasPermission = await requestPermissions(type);
    if (!hasPermission) {
      Alert.alert('Permission Denied', `DigiKoin needs ${type === 'govID' ? 'photo library' : 'camera'} access for KYC.`);
      return;
    }

    const picker = type === 'govID' ? launchImageLibrary : launchCamera;
    picker(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false, 
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error(`ImagePicker Error: ${response.errorMessage}`);
          setMessage({ text: `Failed to pick ${type === 'govID' ? 'Government ID' : 'facial image'}.`, type: 'error' });
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri || null;
          if (uri) {
            if (type === 'govID') setGovID(uri);
            else setFacialRec(uri);
          }
        }
      }
    );
  };

  const verifyKYC = async () => {
    if (!govID || !facialRec) {
      setMessage({ text: 'Please upload both files.', type: 'error' });
      return;
    }

    try {
      setMessage({ text: 'KYC Verification submitted successfully!', type: 'success' });
      await AsyncStorage.setItem('kycVerified', 'true');
      await AsyncStorage.setItem('isLoggedIn', 'true');
      const userType = await AsyncStorage.getItem('userType');
      setIsLoggedIn(true);

      setTimeout(() => {
        if (userType === 'admin') {
          navigation.replace('AdminDashboard');
        } else if (userType === 'investor') {
          navigation.replace('InvestorDashboard');
        } else if (userType === 'minor') {
          navigation.replace('MinorDashboard');
        } else {
          setMessage({ text: 'Invalid user type.', type: 'error' });
          navigation.navigate('Login', { setIsLoggedIn });
        }
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error('Error during KYC verification:', error);
      setMessage({ text: 'An error occurred during verification.', type: 'error' });
    }
  };

  return (
    <View className={`flex-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <Header darkMode={darkMode} toggleMode={toggleMode} />
      <View className="flex-1 p-5 justify-center">
        <Text className="text-2xl font-bold text-[#050142] mb-5 text-center">KYC Verification</Text>
        {message.text ? (
          <Text
            className={`text-center text-base mb-4 ${
              message.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message.text}
          </Text>
        ) : null}

        <View className="bg-white p-4 rounded-lg shadow-md mb-5">
          <Text className="text-lg text-[#454545] mb-2">Government ID:</Text>
          <TouchableOpacity
            className="border border-gray-300 p-3 rounded-md mb-4 bg-gray-200"
            onPress={() => pickFile('govID')}
            accessibilityLabel="Upload Government ID"
          >
            <Text className="text-[#454545]">{govID ? 'File Selected' : 'Tap to Upload'}</Text>
          </TouchableOpacity>

          <Text className="text-lg text-[#454545] mb-2">Facial Recognition Image:</Text>
          <TouchableOpacity
            className="border border-gray-300 p-3 rounded-md mb-4 bg-gray-200"
            onPress={() => pickFile('facialRec')}
            accessibilityLabel="Upload Facial Recognition Image"
          >
            <Text className="text-[#454545]">{facialRec ? 'File Selected' : 'Tap to Upload'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="p-3 bg-[#050142] rounded-md"
            onPress={verifyKYC}
            accessibilityLabel="Verify KYC"
          >
            <Text className="text-white text-center text-base font-medium">Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default KYC;