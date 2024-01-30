import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  IndexStack,
  ToolboxStack,
  UpdatesStack,
  SettingsStack,
} from "@/components/layouts/stacks";

const MaterialBottomTabs = createMaterialBottomTabNavigator();

export const MaterialBottomTabsScreen = () => (
  <MaterialBottomTabs.Navigator>
    <MaterialBottomTabs.Screen
      name="index"
      component={IndexStack}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ focused, color }) => (
          <MaterialCommunityIcons
            color={color}
            size={24}
            name={focused ? "alpha-a-circle" : "alpha-a-circle-outline"}
          />
        ),
      }}
    />
    <MaterialBottomTabs.Screen
      name="toolbox"
      component={ToolboxStack}
      options={{
        tabBarLabel: "Toolbox",
        tabBarIcon: ({ focused, color }) => (
          <MaterialCommunityIcons
            color={color}
            size={24}
            name={focused ? "alpha-b-circle" : "alpha-c-circle-outline"}
          />
        ),
      }}
    />
    <MaterialBottomTabs.Screen
      name="updates"
      component={UpdatesStack}
      options={{
        tabBarLabel: "Updates",
        tabBarIcon: ({ focused, color }) => (
          <MaterialCommunityIcons
            color={color}
            size={24}
            name={focused ? "alpha-c-circle" : "alpha-c-circle-outline"}
          />
        ),
      }}
    />
    <MaterialBottomTabs.Screen
      name="settings"
      component={SettingsStack}
      options={{
        tabBarLabel: "Settings",
        tabBarIcon: ({ focused, color }) => (
          <MaterialCommunityIcons
            color={color}
            size={24}
            name={focused ? "alpha-d-circle" : "alpha-d-circle-outline"}
          />
        ),
      }}
    />
  </MaterialBottomTabs.Navigator>
);
