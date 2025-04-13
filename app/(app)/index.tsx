import { useAuth } from "@/contexts/authContext";
import { db } from "@/firebaseConfig";
import { UserType } from "@/types";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function Index() {
  const { user } = useAuth();

  const checkKYC = async () => {
    if (!user) return;
    const { uid } = user;

    // ✅ Get user document from Firestore
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      Toast.show({
        type: "error",
        text1: "User record not found.",
      });
      return;
    }

    const userData = userSnap.data();
    const { kyc, type } = userData;

    // ✅ Check if KYC is valid
    const isValidKYC = Array.isArray(kyc) && kyc.length === 2;
    if (isValidKYC) {
      // ✅ KYC complete
      if ((type as UserType) === "Investor") {
        router.replace("/investor/dashboard");
      }
    } else {
      // ❌ KYC incomplete, navigating to KYC screen
      router.replace("/(app)/kyc");
    }
  };

  useEffect(() => {
    checkKYC();
  }, []);

  return null;
}
