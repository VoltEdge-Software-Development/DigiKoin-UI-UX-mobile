import { Text } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@/contexts/authContext";

export default function AppLayout() {
  const { session, kyc } = useAuth();
  const [loading, token] = session;
  const [checking, status] = kyc;

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/welcome" />;
  }

  if (checking) {
    return <Text>KYC Checking...</Text>;
  }

  if (status === "verified") {
    return <Redirect href="/investor" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Redirect href="/(app)/kyc" />;
}
