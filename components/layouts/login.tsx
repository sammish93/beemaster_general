import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LoginStack } from "@/components/layouts/stacks";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const LoginScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="login"
      component={LoginStack}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
