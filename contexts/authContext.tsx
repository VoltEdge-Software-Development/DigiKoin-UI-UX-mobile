import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStorageState } from "@/hooks/useStorageState";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AuthParams, UserType } from "@/types";
import Toast from "react-native-toast-message";

GoogleSignin.configure({
  // webClientId: process.env.EXPO_PUBLIC_WEB_ID,
  scopes: ["profile", "email"], // what API you want to access on behalf of the user, default is email and profile
  // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: false,
  // iosClientId: process.env.EXPO_PUBLIC_IOS_ID,
});

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};

// Define the type for the context
interface AuthContextType {
  user: User | null;
  signIn: (params: AuthParams) => Promise<void>;
  signUp: (email: string, password: string, type: UserType) => Promise<void>;
  signOut: () => void;
  session: [boolean, string | null];
  kyc: [boolean, string | null];
}

// Create the context with an initial value
const AuthContext: React.Context<AuthContextType | undefined> = createContext<
  AuthContextType | undefined
>(undefined);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useStorageState("session");
  const [kyc, setKYC] = useStorageState("kyc");

  // onAuthStateChange
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user.refreshToken);
        setUser(user);
        // ✅ Get user document from Firestore
        const userRef = doc(db, "users", user.uid);
        getDoc(userRef).then(userSnap => {
          if (!userSnap.exists()) {
            Toast.show({
              type: "error",
              text1: "User record not found.",
            });
            return;
          }

          const userData = userSnap.data();
          const { kyc } = userData;

          // ✅ Check if KYC is valid
          const isValidKYC = Array.isArray(kyc) && kyc.length === 2;
          setKYC(isValidKYC ? "verified" : "unverified")
        });
      } else {
        router.replace("/welcome");
        setSession(null);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const signIn = async (params: AuthParams) => {
    try {
      if ("method" in params) {
        if (params.method === "google") {
          await GoogleLogin();
        }
      } else {
        await signInWithEmailAndPassword(
          auth,
          params.email,
          params.password
        );
        await AsyncStorage.setItem("userEmail", params.email);
      }
      router.replace('/(app)');
    } catch (error: any) {
      let msg = error?.message;

      if (msg.includes("auth/invalid-email")) {
        msg = "Invalid email";
      }

      Alert.alert("Error", msg);
    }
  };

  const signOut = async () => {
    auth.signOut();
  };

  const signUp = async (email: string, password: string, type: UserType) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response?.user?.uid), {
        email,
        type,
        userId: response?.user?.uid,
      });

      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   emailRef.current,
      //   passwordRef.current
      // );

      // const usersCollection = collection(db, "users");

      // const emailQuery = query(
      //   usersCollection,
      //   where("email", "==", emailRef.current)
      // );
      // const emailSnapshot = await getDocs(emailQuery);

      // if (emailSnapshot.empty) {
      //   await addDoc(usersCollection, { email: emailRef.current });
      //   console.log("User signed up:", userCredential.user);

      //   await AsyncStorage.setItem("userEmail", emailRef.current);
      //   router.push("/home");
      // } else {
      //   Alert.alert("Login Instead");
      //   console.log("User with the email already exists.");
      // }

      // return { success: true, data: response?.user };
    } catch (error: any) {
      let msg = error?.message;

      if (msg.includes("auth/invalid-email")) {
        msg = "Invalid email";
      }

      Alert.alert("Error", msg);
      // return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        session,
        kyc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("use Auth must be wrapped inside AuthContextProvider");
  }

  return value;
};
