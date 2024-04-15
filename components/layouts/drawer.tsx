import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { useNavigation, withLayoutContext } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IndexStack } from "@/components/layouts/stacks";

import { Text } from "react-native";
import { MD3Theme } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { MobXProviderContext } from "mobx-react";
import { StackNavigationProp } from "@react-navigation/stack";
import { reaction } from "mobx";

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

type RootParamList = {
  index: undefined;
};

export type DrawerScreenProps = {
  theme: MD3Theme;
  mode: string;
};

export const DrawerScreen = withLayoutContext((props: DrawerScreenProps) => {
  // Correct placement of useContext hook
  const { userViewModel } = useContext(MobXProviderContext);
  let navigation = useNavigation<StackNavigationProp<RootParamList>>();

  useEffect(() => {
    const disposer = reaction(
      () => userViewModel.currentLanguage,
      (newLanguage, previousLanguage) => {
        navigation.reset({
          index: 0,
          routes: [{ name: "index" }],
        });

        // Clunky fix that makes sure that the navigational stack has enough time to reset before
        // rerendering the UI in the new language.
        setTimeout(() => {
          navigation.navigate("settings/index");
        }, 100);
      }
    );

    return () => {
      disposer();
    };
  }, []);

  return (
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
      drawerContent={() => (
        <DrawerContentScrollView>
          <DrawerItem
            label={() => (
              <CustomDrawerLabel
                label={userViewModel.i18n.t("home")}
                theme={props.theme}
              />
            )}
            onPress={() => navigation.navigate("index")}
            icon={(focused) => (
              <MaterialCommunityIcons
                color={
                  focused
                    ? props.theme.colors.onSecondaryContainer
                    : props.theme.colors.onSurfaceVariant
                }
                size={24}
                name={focused ? "home" : "home-outline"}
              />
            )}
          />
          <DrawerItem
            label={() => (
              <CustomDrawerLabel
                label={userViewModel.i18n.t("toolbox")}
                theme={props.theme}
              />
            )}
            onPress={() => navigation.navigate("toolbox/index")}
            icon={(focused) => (
              <MaterialCommunityIcons
                color={
                  focused
                    ? props.theme.colors.onSecondaryContainer
                    : props.theme.colors.onSurfaceVariant
                }
                size={24}
                name={focused ? "toolbox" : "toolbox-outline"}
              />
            )}
          />
          <DrawerItem
            label={() => (
              <CustomDrawerLabel
                label={userViewModel.i18n.t("updates")}
                theme={props.theme}
              />
            )}
            onPress={() => navigation.navigate("updates/index")}
            icon={(focused) => (
              <MaterialCommunityIcons
                color={
                  focused
                    ? props.theme.colors.onSecondaryContainer
                    : props.theme.colors.onSurfaceVariant
                }
                size={24}
                name={focused ? "bell" : "bell-outline"}
              />
            )}
          />
          <DrawerItem
            label={() => (
              <CustomDrawerLabel
                label={userViewModel.i18n.t("settings")}
                theme={props.theme}
              />
            )}
            onPress={() => navigation.navigate("settings/index")}
            icon={(focused) => (
              <MaterialCommunityIcons
                color={
                  focused
                    ? props.theme.colors.onSecondaryContainer
                    : props.theme.colors.onSurfaceVariant
                }
                size={24}
                name={focused ? "cog" : "cog-outline"}
              />
            )}
          />
          {/* You can add more custom items here */}
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="index"
        component={IndexStack}
        options={{
          headerTitle: userViewModel.i18n.t("home"),
          drawerLabel: () => (
            <CustomDrawerLabel
              label={userViewModel.i18n.t("home")}
              theme={props.theme}
            />
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
    </Drawer.Navigator>
  );
});
