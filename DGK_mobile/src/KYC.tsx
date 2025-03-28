import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation stack param list
type RootStackParamList = {
  Login: undefined;
};

// Define message type
interface Message {
  text: string;
  type: 'success' | 'error' | '';
}

// Define props type
interface KYCProps {
  setIsLoggedIn: (value: boolean) => void;
}

const KYC: React.FC<KYCProps> = ({ setIsLoggedIn }) => {
  const [govID, setGovID] = useState<string | null>(null); // Placeholder for file path or URI
  const [facialRec, setFacialRec] = useState<string | null>(null); // Placeholder for file path or URI
  const [message, setMessage] = useState<Message>({ text: '', type: '' });
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Placeholder for file picker (requires a library like react-native-document-picker or expo-image-picker)
  const pickFile = (type: 'govID' | 'facialRec') => {
    // Simulate file picking (replace with actual implementation)
    Alert.alert(`Pick ${type === 'govID' ? 'Government ID' : 'Facial Recognition Image'}`, 'File picking not implemented yet. Simulating upload.', [
      {
        text: 'OK',
        onPress: () => {
          const filePath = `${type}-simulated-file.jpg`; // Replace with real URI from picker
          if (type === 'govID') setGovID(filePath);
          else setFacialRec(filePath);
        },
      },
    ]);
  };

  const verifyKYC = () => {
    if (!govID || !facialRec) {
      setMessage({ text: 'Please upload both files.', type: 'error' });
      return;
    }
    setMessage({ text: 'KYC Verification submitted successfully!', type: 'success' });
    localStorage.setItem('kycVerified', 'true');
    setTimeout(() => {
      navigation.navigate('Login');
      setMessage({ text: '', type: '' });
      setIsLoggedIn(true); // Assuming KYC completion allows login
    }, 3000);
  };

  return (
    <View className="flex-1 p-5 bg-gray-100 justify-center">
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

      {/* Form */}
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
  );
};

export default KYC;