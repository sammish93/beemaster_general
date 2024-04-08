import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IndexPage from "@/app/index";
import HivePage from "@/app/hive";
import HiveSettingsPage from "@/app/hive/settings";
import HiveForecastPage from "@/app/hive/forecast";
import ToolboxPage from "@/app/toolbox";
import CommunityPage from "@/app/toolbox/community";
import ChecklistPage from "@/app/toolbox/checklist";
import CalendarPage from "@/app/toolbox/calendar";
import HiveScanPage from "@/app/toolbox/hiveScan";
import UpdatesPage from "@/app/updates";
import SettingsPage from "@/app/settings";
import LoginPage from "@/app/login";

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
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="hive/index"
      component={HivePage}
      options={{
        title: "Hive",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="hive/settings"
      component={HiveSettingsPage}
      options={{
        title: "Hive Settings",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="hive/forecast"
      component={HiveForecastPage}
      options={{
        title: "Hive Forecast",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="toolbox/index"
      component={ToolboxPage}
      options={{
        title: "Toolbox",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="toolbox/community"
      component={CommunityPage}
      options={{
        title: "Community",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="toolbox/checklist"
      component={ChecklistPage}
      options={{
        title: "Checklist",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="toolbox/calendar"
      component={CalendarPage}
      options={{
        title: "Calendar",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="toolbox/hiveScan"
      component={HiveScanPage}
      options={{
        title: "Hive Scan",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="updates/index"
      component={UpdatesPage}
      options={{
        title: "Updates",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="settings/index"
      component={SettingsPage}
      options={{
        title: "Settings",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
  </Stack.Navigator>
);

export const HiveStack = (props: StackProps) => (
  <Stack.Navigator>
    <Stack.Screen
      name="index"
      component={IndexPage}
      options={{
        title: "Home",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="hive/index"
      component={HivePage}
      options={{
        title: "Hive",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="hive/settings"
      component={HiveSettingsPage}
      options={{
        title: "Hive Settings",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="hive/forecast"
      component={HiveForecastPage}
      options={{
        title: "Hive Forecast",
        headerShown: props.headerShown ? props.headerShown : false,
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
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="toolbox/community"
      component={CommunityPage}
      options={{
        title: "Community",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="toolbox/checklist"
      component={ChecklistPage}
      options={{
        title: "Checklist",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="toolbox/calendar"
      component={CalendarPage}
      options={{
        title: "Calendar",
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    <Stack.Screen
      name="toolbox/hiveScan"
      component={HiveScanPage}
      options={{
        title: "Hive Scan",
        headerShown: props.headerShown ? props.headerShown : false,
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
        headerShown: props.headerShown ? props.headerShown : false,
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
        headerShown: props.headerShown ? props.headerShown : false,
      }}
    />
    {/* Add other screens specific to the "settings" tab here */}
  </Stack.Navigator>
);

export const LoginStack = (props: StackProps) => (
  <Stack.Navigator>
    <Stack.Screen
      name="/login"
      component={LoginPage}
      options={{
        title: "Login",
        headerShown: false,
      }}
    />
    {/* Add other screens specific to the "login" tab here */}
  </Stack.Navigator>
);
