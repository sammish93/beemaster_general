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
  mode: string;
};

export const DrawerScreen = withLayoutContext((props: DrawerScreenProps) => (
  <Drawer.Navigator
    screenOptions={{
      // API Reference: https://reactnavigation.org/docs/drawer-navigator#options
      drawerType: "front",
      headerShown: false,
      drawerActiveBackgroundColor: props.theme.colors.surfaceDisabled,
      drawerStyle: {
        backgroundColor: props.theme.colors.primaryContainer,
      },
    }}
  >
    <Drawer.Screen
      name="index"
      component={IndexStack}
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
              name={propsIcon.focused ? "home" : "home-outline"}
            />
          );
        },
      }}
    />
    <Drawer.Screen
      name="toolbox/index"
      component={ToolboxStack}
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
              name={propsIcon.focused ? "toolbox" : "toolbox-outline"}
            />
          );
        },
      }}
    />
    <Drawer.Screen
      name="updates/index"
      component={UpdatesStack}
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
              name={propsIcon.focused ? "bell" : "bell-outline"}
            />
          );
        },
      }}
    />
    <Drawer.Screen
      name="settings/index"
      component={SettingsStack}
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
              name={propsIcon.focused ? "cog" : "cog-outline"}
            />
          );
        },
      }}
    />
  </Drawer.Navigator>
));
