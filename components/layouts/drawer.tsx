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

const Drawer = createDrawerNavigator();

export const DrawerScreen = withLayoutContext(() => (
  <Drawer.Navigator
    screenOptions={{
      // API Reference: https://reactnavigation.org/docs/drawer-navigator#options
      drawerType: "front",
      headerShown: false,
    }}
  >
    <Drawer.Screen
      name="index"
      component={() => <IndexStack />}
      options={{
        headerTitle: "Home",
        drawerLabel: "Home",
        drawerIcon(props) {
          return (
            <MaterialCommunityIcons
              color={props.color}
              size={24}
              name={props.focused ? "alpha-a-circle" : "alpha-a-circle-outline"}
            />
          );
        },
      }}
    />
    <Drawer.Screen
      name="toolbox"
      component={() => <ToolboxStack />}
      options={{
        headerTitle: "Toolbox",
        drawerLabel: "Toolbox",
        drawerIcon(props) {
          return (
            <MaterialCommunityIcons
              color={props.color}
              size={24}
              name={props.focused ? "alpha-b-circle" : "alpha-b-circle-outline"}
            />
          );
        },
      }}
    />
    <Drawer.Screen
      name="updates"
      component={() => <UpdatesStack />}
      options={{
        headerTitle: "Updates",
        drawerLabel: "Updates",
        drawerIcon(props) {
          return (
            <MaterialCommunityIcons
              color={props.color}
              size={24}
              name={props.focused ? "alpha-c-circle" : "alpha-c-circle-outline"}
            />
          );
        },
      }}
    />
    <Drawer.Screen
      name="settings"
      component={() => <SettingsStack />}
      options={{
        headerTitle: "Settings",
        drawerLabel: "Settings",
        drawerIcon(props) {
          return (
            <MaterialCommunityIcons
              color={props.color}
              size={24}
              name={props.focused ? "alpha-d-circle" : "alpha-d-circle-outline"}
            />
          );
        },
      }}
    />
  </Drawer.Navigator>
));
