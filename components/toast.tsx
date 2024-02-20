import { MD3Theme } from "react-native-paper";
import { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";

// Define or import ToastPosition type
type ToastPosition = "top" | "bottom";

interface ToastProps {
  title: string;
  text: string;
  type?: string;
  position?: ToastPosition;
  visibilityTime?: number;
  onPress?: () => void;
}

export const toastCrossPlatform = (props: ToastProps) => {
  const validatedType =
    props.type === "error" || props.type === "info" ? props.type : "success";

  const position: ToastPosition = "bottom";

  return {
    type: validatedType,
    text1: props.title,
    text2: props.text,
    position,
    visibilityTime: props.visibilityTime,
    onPress: props.onPress,
  };
};

export const toastConfig = (theme: MD3Theme) => {
  return {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#4BB543",
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}
        contentContainerStyle={{
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
          backgroundColor: theme.colors.surface,
        }}
        text1Style={{
          ...theme.fonts.titleMedium,
          color: theme.colors.onSurface,
        }}
        text2Style={{
          ...theme.fonts.bodyMedium,
          color: theme.colors.onSurfaceVariant,
        }}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: theme.colors.error,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}
        contentContainerStyle={{
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
          backgroundColor: theme.colors.errorContainer,
        }}
        text1Style={{
          ...theme.fonts.titleMedium,
          color: theme.colors.onErrorContainer,
        }}
        text2Style={{
          ...theme.fonts.bodyMedium,
          color: theme.colors.onErrorContainer,
        }}
      />
    ),

    info: (props) => (
      <InfoToast
        {...props}
        style={{
          borderLeftColor: "#1E92F4",
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}
        contentContainerStyle={{
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
          backgroundColor: theme.colors.surface,
        }}
        text1Style={{
          ...theme.fonts.titleMedium,
          color: theme.colors.onSurface,
        }}
        text2Style={{
          ...theme.fonts.bodyMedium,
          color: theme.colors.onSurfaceVariant,
        }}
      />
    ),
  };
};
