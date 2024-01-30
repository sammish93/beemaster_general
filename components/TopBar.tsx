import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

//TODO insert back button behaviour and title
//TODO remove headers from other navigational methods
interface TopBarProps {
  onPress: () => void;
}

const TopBar = (props: TopBarProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <MaterialCommunityIcons name="menu" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 8,
  },
});

export default TopBar;
