import React, { useEffect, useRef } from "react";
import { View, Animated, Image, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import styles from "@/assets/styles";

// Based off code found here: https://codesandbox.io/p/sandbox/orbit-animation-ev6lj
const LoadingScreen = () => {
  const theme = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    spinValue.setValue(0); // Reset the animation value back to 0
    Animated.timing(spinValue, {
      toValue: 1, // End at a full rotation
      duration: 3000, // Duration for one rotation cycle
      useNativeDriver: true, // Use native driver for performance
    }).start(() => startRotation()); // Restart the animation indefinitely
  };

  useEffect(() => {
    startRotation();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Rotate from 0 to 360 degrees
  });

  return (
    <View style={{ ...styles(theme).main, alignItems: "center" }}>
      <Image
        style={style.orbitCentre}
        source={require("@/assets/images/weather/snow.png")} // Update the path to your nucleus image
      />

      {/* Animated orbit with electron as an Image */}
      <Animated.View
        style={[
          style.orbitPath,
          {
            // Apply the rotation
            transform: [{ rotate: spin }],
          },
        ]}
      >
        {/* Replace View with Image for electron */}
        <Image
          style={[style.orbitObject]}
          source={require("@/assets/images/weather/rain.png")} // Update the path to your electron image
        />
      </Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3d4553",
    justifyContent: "center",
    alignItems: "center",
  },
  orbitCentre: {
    height: 100,
    width: 100,
  },
  orbitObject: {
    height: 50,
    width: 50,
    position: "absolute",
    top: -25, // Adjust to position the electron correctly on the orbit
    left: 100, // Adjust to set the starting point of the electron on the orbit path
  },
  orbitPath: {
    borderColor: "transparent",
    borderWidth: 4,
    borderRadius: 125,
    height: 250,
    width: 250,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;

/*
import { View } from "react-native";
import { useTheme, ActivityIndicator } from "react-native-paper";
import styles from "@/assets/styles";

// Loading Screen with an activity indicator so that all loading screens in app have the same appearance.
// Remember to nest the loading screen between top elements such as <StatusBarCustom> and <TopBar> so that
// they are still visible.
const LoadingScreen = () => {
  const theme = useTheme();

  return (
    <View style={styles(theme).main}>
      <ActivityIndicator
        animating={true}
        size={"large"}
        color={theme.colors.onSurfaceVariant}
      />
    </View>
  );
};

export default LoadingScreen;

*/
