import { useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { useTheme } from "react-native-paper";
import styles from "@/assets/styles";

const UpdatesScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={theme.fonts.titleLarge}>Updates</Text>
      </View>
    </View>
  );
};

export default observer(UpdatesScreen);
