import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Switch,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/authContext";

const KYC = () => {
  const { user } = useAuth();
  const [govID, setGovID] = useState<string>();
  const [facialRec, setFacialRec] = useState<string>();
  const [camPermission, requestCamPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const pickFile = (setFunc: any) => {
    if (!mediaPermission?.granted) requestMediaPermission();
    if (!mediaPermission?.granted) {
      Alert.alert(
        "Permission Denied",
        `DigiKoin needs photo library access for KYC.`
      );
      return;
    }

    // No permissions request is necessary for launching the image library
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((result) => {
      console.log("result", result.assets);
      if (result.assets) setFunc(result.assets[0].uri);
    });
  };

  const verifyKYC = async () => {
    if (govID && facialRec) {
      try {
        const userRef = doc(db, "users", user.uid);

        await updateDoc(userRef, {
          kyc: [govID, facialRec],
        });

        console.log("Gov ID URLs updated!");
      } catch (error) {
        console.error("Error updating gov ID URLs:", error);
      }
    } else {
      Alert.alert("Error", "Please upload both files.");
    }
  };

  const takePhoto = async () => {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0];
        const fileName = uri.split("/").pop();
        const uploadResp = await uploadToFirebase(uri, fileName, (v: any) =>
          console.log(v)
        );
        console.log(uploadResp);
      }
    } catch (e: any) {
      Alert.alert("Error Uploading Image " + e.message);
    }
  };

  const uploadToFirebase = async (uri: any, name: any, onProgress: any) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(storage, `images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
      );
    });
  };

  return (
    <View className={`flex-1 bg-gray-800`}>
      {/* <Header darkMode={darkMode} toggleMode={toggleMode} /> */}
      <View className="flex-1 p-5 justify-center">
        <Text className={`text-center text-2xl font-bold text-white`}>
          KYC Verification
        </Text>

        <View className={`p-4 rounded-lg shadow-md mb-5 bg-gray-700`}>
          <Text className={`text-lg text-gray-300 mb-2`}>Government ID:</Text>
          {govID ? (
            <Image
              source={{ uri: govID }}
              className="w-full aspect-video object-cover"
              accessibilityIgnoresInvertColors
            />
          ) : (
            <TouchableOpacity
              className={`border border-gray-300 p-3 rounded-md mb-4 bg-gray-600`}
              onPress={() => pickFile(setGovID)}
              accessibilityLabel="Upload Government ID"
            >
              <Text className={`text-white`}>
                {govID ? "File Selected" : "Tap to Upload"}
              </Text>
            </TouchableOpacity>
          )}

          <Text className={`text-lg text-gray-300`}>
            Facial Recognition Image:
          </Text>
          {facialRec ? (
            <Image
              source={{ uri: facialRec }}
              className="w-full aspect-video object-cover"
              accessibilityIgnoresInvertColors
            />
          ) : (
            <TouchableOpacity
              className={`border border-gray-300 p-3 rounded-md mb-4 bg-gray-600`}
              onPress={() => pickFile(setFacialRec)}
              accessibilityLabel="Upload Facial Recognition Image"
            >
              <Text className={`text-white`}>
                {facialRec ? "File Selected" : "Tap to Upload"}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="p-3 bg-[#050142] rounded-md"
            onPress={verifyKYC}
            accessibilityLabel="Verify KYC"
          >
            <Text className="text-white text-center text-base font-medium">
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default KYC;
