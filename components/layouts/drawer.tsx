import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { withLayoutContext } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  IndexStack,
  ToolboxStack,
  UpdatesStack,
  SettingsStack,
} from "@/components/layouts/stacks";
import { Text } from "react-native";
import { MD3Theme } from "react-native-paper";

const Drawer = createDrawerNavigator();

type DrawerLabelProps = {
  label: string;
  theme: MD3Theme;
};

const CustomDrawerLabel = (props: DrawerLabelProps) => (
  <Text
    style={{
      ...props.theme.fonts.bodyLarge,
      color: props.theme.colors.onBackground,
    }}
  >
    {props.label}
  </Text>
);

export type DrawerScreenProps = {
  theme: MD3Theme;
};

export const DrawerScreen = withLayoutContext((props: DrawerScreenProps) => (
  <Drawer.Navigator
    screenOptions={{
      // API Reference: https://reactnavigation.org/docs/drawer-navigator#options
      drawerType: "front",
      headerShown: false,
      drawerActiveBackgroundColor: props.theme.colors.secondaryContainer,
      drawerStyle: {
        backgroundColor: props.theme.colors.elevation.level2,
      },
    }}
  >
    <Drawer.Screen
      name="index"
      component={() => <IndexStack />}
      options={{
        headerTitle: "Home",
        drawerLabel: () => (
          <CustomDrawerLabel label="Home" theme={props.theme} />
        ),
        drawerIcon(propsIcon) {
          return (
            <MaterialCommunityIcons
              color={
                propsIcon.focused
                  ? props.theme.colors.onSecondaryContainer
                  : props.theme.colors.onSurfaceVariant
              }
              size={24}
              name={
                propsIcon.focused ? "alpha-a-circle" : "alpha-a-circle-outline"
              }
            />
          );
        },
      }}
    />
    <Drawer.Screen
      name="toolbox/index"
      component={() => <ToolboxStack />}
      options={{
        headerTitle: "Toolbox",
        drawerLabel: () => (
          <CustomDrawerLabel label="Toolbox" theme={props.theme} />
        ),
        drawerIcon(propsIcon) {
          return (
            <MaterialCommunityIcons
              color={
                propsIcon.focused
                  ? props.theme.colors.onSecondaryContainer
                  : props.theme.colors.onSurfaceVariant
              }
              size={24}
              name={
                propsIcon.focused ? "alpha-b-circle" : "alpha-b-circle-outline"
              }
            />
          );
        },
      }}
    />
    <Drawer.Screen
      name="updates/index"
      component={() => <UpdatesStack />}
      options={{
        headerTitle: "Updates",
        drawerLabel: () => (
          <CustomDrawerLabel label="Updates" theme={props.theme} />
        ),
        drawerIcon(propsIcon) {
          return (
            <MaterialCommunityIcons
              color={
                propsIcon.focused
                  ? props.theme.colors.onSecondaryContainer
                  : props.theme.colors.onSurfaceVariant
              }
              size={24}
              name={
                propsIcon.focused ? "alpha-c-circle" : "alpha-c-circle-outline"
              }
            />
          );
        },
      }}
    />
    <Drawer.Screen
      name="settings/index"
      component={() => <SettingsStack />}
      options={{
        headerTitle: "Settings",
        drawerLabel: () => (
          <CustomDrawerLabel label="Settings" theme={props.theme} />
        ),
        drawerIcon(propsIcon) {
          return (
            <MaterialCommunityIcons
              color={
                propsIcon.focused
                  ? props.theme.colors.onSecondaryContainer
                  : props.theme.colors.onSurfaceVariant
              }
              size={24}
              name={
                propsIcon.focused ? "alpha-d-circle" : "alpha-d-circle-outline"
              }
            />
          );
        },
      }}
    />
  </Drawer.Navigator>
));
