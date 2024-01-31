import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  IndexStack,
  ToolboxStack,
  UpdatesStack,
  SettingsStack,
} from "@/components/layouts/stacks";
import { Text } from "react-native";
import { MD3Theme } from "react-native-paper";

const MaterialBottomTabs = createMaterialBottomTabNavigator();

type BottomTabsLabelProps = {
  label: string;
  theme: MD3Theme;
};

const CustomBottomTabsLabel = (props: BottomTabsLabelProps) => (
  <Text
    style={{
      ...props.theme.fonts.bodyLarge,
      color: props.theme.colors.onBackground,
    }}
  >
    {props.label}
  </Text>
);

export type BottomTabsScreenProps = {
  theme: MD3Theme;
};

export const MaterialBottomTabsScreen = (props: BottomTabsScreenProps) => (
  <MaterialBottomTabs.Navigator
    activeColor={props.theme.colors.onBackground}
    inactiveColor={props.theme.colors.onBackground}
    barStyle={{
      backgroundColor: props.theme.colors.elevation.level2,
    }}
  >
    <MaterialBottomTabs.Screen
      name="index"
      component={IndexStack}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: (propsIcon) => (
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
        ),
      }}
    />
    <MaterialBottomTabs.Screen
      name="toolbox/index"
      component={ToolboxStack}
      options={{
        tabBarLabel: "Toolbox",
        tabBarIcon: (propsIcon) => (
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
        ),
      }}
    />
    <MaterialBottomTabs.Screen
      name="updates/index"
      component={UpdatesStack}
      options={{
        tabBarLabel: "Updates",
        tabBarIcon: (propsIcon) => (
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
        ),
      }}
    />
    <MaterialBottomTabs.Screen
      name="settings/index"
      component={SettingsStack}
      options={{
        tabBarLabel: "Settings",
        tabBarIcon: (propsIcon) => (
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
        ),
      }}
    />
  </MaterialBottomTabs.Navigator>
);
