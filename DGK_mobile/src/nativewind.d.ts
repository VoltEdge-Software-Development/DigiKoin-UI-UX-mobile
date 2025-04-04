import { ViewProps, TextProps, TextInputProps, TouchableOpacityProps } from 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  // Add other components as needed (e.g., ScrollViewProps, ImageProps)
}