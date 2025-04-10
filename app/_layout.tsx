import { Slot } from "expo-router";
import "../global.css";
import { AuthContextProvider } from "../context/authContext";

const MainLayout = () => {
  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
