import * as React from "react";
import { View } from "react-native";

interface SpacerProps {
  size: number;
}

// Two components that act like Jetpack Compose Spacers.
export const VerticalSpacer = (props: SpacerProps) => {
  return <View style={{ height: props.size }} />;
};

export const HorizontalSpacer = (props: SpacerProps) => {
  return <View style={{ width: props.size }} />;
};
