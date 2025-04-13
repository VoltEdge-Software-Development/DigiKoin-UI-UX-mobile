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
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStorageState } from "@/hooks/useStorageState";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AuthParams, UserType } from "@/types";

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
  session?: string | null;
  isLoading: boolean;
}

// Create the context with an initial value
const AuthContext: React.Context<AuthContextType | undefined> = createContext<
  AuthContextType | undefined
>(undefined);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [[isLoading, session], setSession] = useStorageState("session");

  // onAuthStateChange
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user.refreshToken);
        // setIsAuthenticated(true);
        setUser(user);
      } else {
        setSession(null);
        // setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (session) {
      router.replace("/(app)");
    } else {
      // redirect to welcome
      router.replace("/welcome");
    }
  }, [session]);

  const signIn = async (params: AuthParams) => {
    try {
      if ("method" in params) {
        if (params.method === "google") {
          const response = await GoogleLogin();
          const { type, data: user } = response ?? {};
          setSession(user?.idToken ?? null);
        }
      } else {
        const user = await signInWithEmailAndPassword(
          auth,
          params.email,
          params.password
        );
        setSession(user.providerId);
        await AsyncStorage.setItem("userEmail", params.email);
      }
    } catch (error: any) {
      let msg = error?.message;

      if (msg.includes("auth/invalid-email")) {
        msg = "Invalid email";
      }

      Alert.alert("Error", msg);
    }
  };

  const signOut = async () => {
    setSession(null);
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
        isLoading,
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
