import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const segments = useSegments();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

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
      // redirect to home
      router.replace("/home");
    } else if (isAuthenticated == false) {
      // redirect to welcome
      router.replace("/welcome");
    }
  }, [isAuthenticated]);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid } = userCredential.user;

      // ✅ Get user document from Firestore
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        Alert.alert("User record not found.");
        return;
      }

      const userData = userSnap.data();
      const kyc = userData?.kyc;

      // ✅ Check if KYC is valid
      const isValidKYC = Array.isArray(kyc) && kyc.length === 2;
      // &&
      // kyc.every(
      //   (item) => typeof item === "string" && item.startsWith("http")
      // );

      await AsyncStorage.setItem("userEmail", email);
      if (isValidKYC) {
        // ✅ KYC complete, navigating to home
        router.replace("/home");
      } else {
        // ❌ KYC incomplete, navigating to KYC screen
        router.replace("/kyc");
      }
    } catch (error) {
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

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response?.user?.uid), {
        email,
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

      return { success: true, data: response?.user };
    } catch (error) {
      let msg = error?.message;

      if (msg.includes("auth/invalid-email")) {
        msg = "Invalid email";
      }

      return { success: false, msg };
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
