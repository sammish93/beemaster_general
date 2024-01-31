import { useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button, useTheme } from "react-native-paper";
import styles from "@/assets/styles";

const ToolboxScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={theme.fonts.titleLarge}>Toolbox</Text>
        <Text style={theme.fonts.bodyLarge}>
          String from View Model with a state: {exampleViewModel.testString}
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("/toolbox/community");
          }}
        >
          Community
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("/toolbox/checklist");
          }}
        >
          Checklist
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("/toolbox/calendar");
          }}
        >
          Calendar
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("/toolbox/hiveScan");
          }}
        >
          Hive Scan
        </Button>
      </View>
    </View>
  );
};

export default observer(ToolboxScreen);
