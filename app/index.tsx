import { useNavigation } from "expo-router";
import { View, Image } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button, useTheme, Text } from "react-native-paper";
import TopBar from "@/components/TopBar";
import styles from "@/assets/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import getWeatherTypeIconFromString from "@/domain/weatherIconMapper";

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
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
    </SafeAreaView>
  );
};

export default observer(HomeScreen);
