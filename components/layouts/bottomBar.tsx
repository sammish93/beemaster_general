import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  HiveStack,
  ToolboxStack,
  UpdatesStack,
  SettingsStack,
} from "@/components/layouts/stacks";
import { Text } from "react-native";
import { MD3Theme } from "react-native-paper";
import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";

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
  mode: string;
};

export const MaterialBottomTabsScreen = (props: BottomTabsScreenProps) => {
  // Correct placement of useContext hook
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <MaterialBottomTabs.Navigator
      activeColor={props.theme.colors.onBackground}
      inactiveColor={props.theme.colors.onBackground}
      theme={{
        colors: { secondaryContainer: props.theme.colors.surfaceDisabled },
      }}
      barStyle={{
        backgroundColor: props.theme.colors.primaryContainer,
      }}
    >
      <MaterialBottomTabs.Screen
        name="index"
        component={HiveStack}
        options={{
          tabBarLabel: userViewModel.i18n.t("home"),
          tabBarIcon: (propsIcon) => (
            <MaterialCommunityIcons
              color={
                propsIcon.focused
                  ? props.theme.colors.onSecondaryContainer
                  : props.theme.colors.onSurfaceVariant
              }
              size={24}
              name={propsIcon.focused ? "home" : "home-outline"}
            />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name="toolbox/index"
        component={ToolboxStack}
        options={{
          tabBarLabel: userViewModel.i18n.t("toolbox"),
          tabBarIcon: (propsIcon) => (
            <MaterialCommunityIcons
              color={
                propsIcon.focused
                  ? props.theme.colors.onSecondaryContainer
                  : props.theme.colors.onSurfaceVariant
              }
              size={24}
              name={propsIcon.focused ? "toolbox" : "toolbox-outline"}
            />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name="updates/index"
        component={UpdatesStack}
        options={{
          tabBarLabel: userViewModel.i18n.t("updates"),
          tabBarIcon: (propsIcon) => (
            <MaterialCommunityIcons
              color={
                propsIcon.focused
                  ? props.theme.colors.onSecondaryContainer
                  : props.theme.colors.onSurfaceVariant
              }
              size={24}
              name={propsIcon.focused ? "bell" : "bell-outline"}
            />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name="settings/index"
        component={SettingsStack}
        options={{
          tabBarLabel: userViewModel.i18n.t("settings"),
          tabBarIcon: (propsIcon) => (
            <MaterialCommunityIcons
              color={
                propsIcon.focused
                  ? props.theme.colors.onSecondaryContainer
                  : props.theme.colors.onSurfaceVariant
              }
              size={24}
              name={propsIcon.focused ? "cog" : "cog-outline"}
            />
          ),
        }}
      />
    </MaterialBottomTabs.Navigator>
  );
};
