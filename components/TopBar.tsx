import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import styles from "@/assets/styles";
import { NavigationProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

interface TopBarProps {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  canOpenDrawer: boolean;
  title: string;
  trailingIcons?: React.ReactNode[];
}

const TopBar = (props: TopBarProps) => {
  const theme = useTheme();
  const navigation = props.navigation;
  const canGoBack = props.navigation?.canGoBack();

  return (
    <View style={styles(theme).topBarContainer}>
      <View style={styles(theme).leadingIconsContainer}>
        {/* Shows the drawer navigation bar if the draw layout is used*/}
        {props.canOpenDrawer && (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <MaterialCommunityIcons
              style={styles(theme).leadingIcon}
              name="menu"
            />
          </TouchableOpacity>
        )}
        {canGoBack && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialCommunityIcons
              style={styles(theme).leadingIcon}
              name="arrow-left"
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles(theme).headlineContainer}>
        <Text
          style={{
            ...theme.fonts.titleLarge,
            color: styles(theme).headline.color,
          }}
        >
          {props.title}
        </Text>
      </View>

      <View style={styles(theme).trailingIconsContainer}>
        {props.trailingIcons &&
          props.trailingIcons.map((icon, index) => (
            <View key={index}>{icon}</View>
          ))}
      </View>
    </View>
  );
};

export default TopBar;
