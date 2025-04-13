import { useThemeColor } from "@/hooks/useThemeColor";
import {
  type PressableProps,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ThemedText } from "./ThemedText";

export type ThemedButtonProps = {
  lightColor?: string;
  darkColor?: string;
  onPress?: PressableProps["onPress"];
  title: string;
  disabled?: boolean;
  loading?: boolean;
  loadingTitle?: string;
  className?: string;
  variant?: "primary" | "secondary";
};

export function ThemedButton(props: ThemedButtonProps) {
  const variant = props.variant ?? "primary";
  const bg = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "tint"
  );
  const textInverted = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "textInverted"
  );
  const text = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "text"
  );
  const textColor = variant == "secondary" ? text : textInverted;
  return (
    <TouchableOpacity
      className={`flex flex-row gap-2 rounded-full justify-center items-center
				${props.className}`}
      disabled={props.loading || props.disabled}
      activeOpacity={0.5}
      onPress={(e) => {
        props.onPress?.(e);
      }}
    >
      {props.loading && (
        <ActivityIndicator animating={props.loading} color={textColor} />
      )}
      <ThemedText type="defaultSemiBold" style={{ color: textColor }}>
        {props.loading ? props.loadingTitle : props.title}
      </ThemedText>
    </TouchableOpacity>
  );
}
