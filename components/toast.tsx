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
  };
};

export const toastConfig = (theme: MD3Theme) => {
  return {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "pink" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),

    info: (props) => (
      <InfoToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
  };
};
