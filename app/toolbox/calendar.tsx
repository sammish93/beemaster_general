import { useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { useTheme, Text } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";

const CalendarScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);

  return (
    <SafeAreaView style={styles(theme).container}>
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title="Calendar"
      />
      <View style={styles(theme).main}>
        <Text style={theme.fonts.titleLarge}>Calendar</Text>
        <Text style={theme.fonts.bodyLarge}>Disabled</Text>
      </View>
    </SafeAreaView>
  );
};

export default observer(CalendarScreen);
