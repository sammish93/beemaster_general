import { useEffect, useRef } from "react";
import { View, Animated, Image, Easing } from "react-native";
import { useTheme } from "react-native-paper";
import styles from "@/assets/styles";

// Based off code found here: https://codesandbox.io/p/sandbox/orbit-animation-ev6lj

// Loading Screen with an activity indicator so that all loading screens in app have the same appearance.
// Remember to nest the loading screen between top elements such as <StatusBarCustom> and <TopBar> so that
// they are still visible.
const LoadingScreen = () => {
  const theme = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    // Orbiter position resets to 0 each time.
    spinValue.setValue(0);

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.linear,
    })
      // Restarts the animation for infinity loop.
      .start(() => startRotation());
  };

  useEffect(() => {
    startRotation();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{ ...styles(theme).main, alignItems: "center" }}>
      <Image
        style={styles(theme).activityIndicatorOrbitBody}
        source={require("@/assets/images/bee-hive.png")}
      />
      <Animated.View
        style={[
          styles(theme).activityIndicatorOrbitTrajectory,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <Image
          style={[styles(theme).activityIndicatorOrbiter]}
          source={require("@/assets/images/bee.png")}
        />
      </Animated.View>
    </View>
  );
};

export default LoadingScreen;
