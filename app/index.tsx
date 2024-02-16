import React from "react";
import { useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { useTheme } from "react-native-paper";
import TopBar from "@/components/TopBar";
import styles from "@/assets/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import Hives from "@/components/Hives";


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
        <Hives isListView={true} navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};

export default observer(HomeScreen);

/*
        <Button
          mode="elevated"
          onPress={() => {
            const hiveId = "hive-1234-1234-abc";
            navigation.navigate("/hive/index", { hiveId: hiveId });
          }}
        >
          Go to Hive Screen
        </Button>
*/
