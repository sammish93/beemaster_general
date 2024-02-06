import { Link, router, useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button, useTheme, Text } from "react-native-paper";
import TopBar from "@/components/TopBar";
import styles from "@/assets/styles";

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const canOpenDrawer = !!navigation.openDrawer;
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);

  return (
    <View style={styles(theme).container}>
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title="Home"
      />
      <View style={styles(theme).main}>
        <Text style={theme.fonts.titleLarge}>Home</Text>
        <Text style={theme.fonts.bodyLarge}>
          Example of data from view model:
        </Text>
        <Text style={theme.fonts.bodyLarge}>{exampleViewModel.testString}</Text>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => exampleViewModel.handleButtonPress()}
        >
          Press me to change the above text
        </Button>
        <Button
          mode="elevated"
          onPress={() => {
            const hiveId = "hive-1234-1234-abc";
            navigation.navigate("/hive/index", { hiveId: hiveId });
          }}
        >
          Go to Hive Screen
        </Button>
        <Text style={theme.fonts.bodyLarge}>{userViewModel.userId}</Text>
      </View>
    </View>
  );
};

export default observer(HomeScreen);
