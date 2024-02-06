import { useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { useTheme, Text } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";

const CommunityScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);

  return (
    <View style={styles(theme).container}>
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title="Community"
      />
      <View style={styles(theme).main}>
        <Text style={theme.fonts.titleLarge}>Community</Text>
        <Text style={theme.fonts.bodyLarge}>Disabled</Text>
      </View>
    </View>
  );
};

export default observer(CommunityScreen);
