import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme, Text } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";


// Components related to Add Hive functionality.
import AddHiveButton from "@/components/AddHiveButton";
import AddHiveModal from "@/components/AddHiveModal";
import HiveList from "@/components/HiveList";
import { set } from "mobx";

export type RootStackParamList = {
  hive: {
    hiveId: string;
  };
};

type HiveScreenProps = {
  route: RouteProp<RootStackParamList, "hive">;
  navigation: StackNavigationProp<RootStackParamList, "hive">;
};

const HiveScreen = (params: HiveScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const hiveId = params.route.params.hiveId;

  const handleAddHive = (hiveName: string) => {
    const newHiveId = `hive-${Date.now()}`; // Temporarly solution.
    hiveViewModel.addHive({ id: newHiveId, name: hiveName });
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={`Hive ${hiveId}`}
        trailingIcons={[
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("/hive/settings", { hiveId: hiveId });
            }}
          >
            <MaterialCommunityIcons
              style={styles(theme).trailingIcon}
              name="information-outline"
            />
          </TouchableOpacity>,
        ]}
      />
      <View style={styles(theme).main}>
        <Text style={theme.fonts.titleLarge}>Hive Screen</Text>
        <HiveList navigation={navigation} />
        {/* Temporarly implementation. */}
        <AddHiveButton onAddHivePress={() => setModalVisible(true)}/>
        <AddHiveModal 
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAddHive={handleAddHive}
        />
      </View>
    </SafeAreaView>
  );
};

export default observer(HiveScreen);
