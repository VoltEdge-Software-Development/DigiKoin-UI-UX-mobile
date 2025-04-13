import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  StyleSheet,
  TextInputProps,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ThemedView } from "./ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";

export type ThemedInputProps = {
  lightColor?: string;
  darkColor?: string;
  onSubmit?: (value: string) => void;
  isSubmitting?: boolean;
} & TextInputProps;

export function ThemedInput(props: ThemedInputProps) {
  const [val, setVal] = React.useState("");
  const onSubmit = props.onSubmit;
  const borderColor = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "border"
  );
  const primaryText = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "text"
  );
  const secondaryText = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "icon"
  );
  return (
    <ThemedView
      className={`flex flex-row items-center gap-2 rounded-md ${props.className}`}
    >
      <TextInput
        placeholderTextColor={secondaryText}
        value={val}
        onChangeText={setVal}
        {...props}
        className={`flex-1 flex flex-row gap-2 p-3 justify-center items-center ${props.className}`}
      />
      {onSubmit && (
        <TouchableOpacity
          onPress={() => onSubmit(val)}
          disabled={props.isSubmitting}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}
        >
          {props.isSubmitting ? (
            <ActivityIndicator size={32} />
          ) : (
            <Ionicons
              name="arrow-forward-circle-outline"
              size={32}
              color={secondaryText}
            />
          )}
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}
