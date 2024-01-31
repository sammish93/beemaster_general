import { useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { useTheme } from "react-native-paper";
import styles from "@/assets/styles";

const CommunityScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={theme.fonts.titleLarge}>Community</Text>
        <Text style={theme.fonts.bodyLarge}>Disabled</Text>
      </View>
    </View>
  );
};

export default observer(CommunityScreen);
