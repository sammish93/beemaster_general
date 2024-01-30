import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HivePage from "@/app/hive";
import IndexPage from "@/app/index";
import ToolboxPage from "@/app/toolbox";
import UpdatesPage from "@/app/updates";
import SettingsPage from "@/app/settings";

const Stack = createNativeStackNavigator();

type StackProps = {
  headerShown?: boolean;
};

export const IndexStack = (props: StackProps) => (
  <Stack.Navigator>
    <Stack.Screen
      name="index"
      component={IndexPage}
      options={{
        title: "Home",
        headerShown: props.headerShown,
      }}
    />
    <Stack.Screen
      name="hive"
      component={HivePage}
      options={{
        title: "Hive",
        headerShown: props.headerShown,
      }}
    />
    {/* Add other screens specific to the "index" tab here */}
  </Stack.Navigator>
);

export const ToolboxStack = (props: StackProps) => (
  <Stack.Navigator>
    <Stack.Screen
      name="toolbox"
      component={ToolboxPage}
      options={{
        title: "Toolbox",
        headerShown: props.headerShown,
      }}
    />
    {/* Add other screens specific to the "toolbox" tab here */}
  </Stack.Navigator>
);

export const UpdatesStack = (props: StackProps) => (
  <Stack.Navigator>
    <Stack.Screen
      name="updates"
      component={UpdatesPage}
      options={{
        title: "Updates",
        headerShown: props.headerShown,
      }}
    />
    {/* Add other screens specific to the "updates" tab here */}
  </Stack.Navigator>
);

export const SettingsStack = (props: StackProps) => (
  <Stack.Navigator>
    <Stack.Screen
      name="settings"
      component={SettingsPage}
      options={{
        title: "Settings",
        headerShown: props.headerShown,
      }}
    />
    {/* Add other screens specific to the "settings" tab here */}
  </Stack.Navigator>
);
