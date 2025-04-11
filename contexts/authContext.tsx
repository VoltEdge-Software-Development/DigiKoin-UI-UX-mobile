import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter, useSegments } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserType } from "@/types/user";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for the context
interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, type: UserType) => Promise<void>;
  logout: () => void;
}

// Create the context with an initial value
const AuthContext: React.Context<AuthContextType | undefined> = createContext<
  AuthContextType | undefined
>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const segments = useSegments();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // onAuthStateChange
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);

        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return unsub;
  }, []);

  useEffect(() => {
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(app)";

    if (isAuthenticated && !inApp) {
      checkKYC();
    } else if (isAuthenticated == false) {
      // redirect to welcome
      router.replace("/welcome");
    }
  }, [isAuthenticated]);

  const checkKYC = async () => {
    if (!user) return;
    const { uid } = user;

    // ✅ Get user document from Firestore
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      Alert.alert("User record not found.");
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
      router.replace("/kyc");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      await AsyncStorage.setItem("userEmail", email);

      checkKYC();
    } catch (error: any) {
      let msg = error?.message;

      if (msg.includes("auth/invalid-email")) {
        msg = "Invalid email";
      }

      Alert.alert("Error", msg);
    }
  };

  const logout = async () => {
    try {
      auth.signOut();
    } catch (error) {}
  };

  const register = async (email: string, password: string, type: UserType) => {
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
      value={{ user, isAuthenticated, login, register, logout }}
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
