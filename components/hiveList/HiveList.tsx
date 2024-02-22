import { useContext } from "react";
import { NavigationProp } from "@react-navigation/native";
import { Button, useTheme, Text, MD3Theme } from "react-native-paper";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { MobXProviderContext } from "mobx-react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { HiveModel } from "@/models/hiveModel";
import HiveInfo from "../HiveInfo";
import { customLightTheme } from "@/assets/themes";

export interface HiveListProps {
  isListView: boolean;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const HiveList = ({ isListView, navigation }: HiveListProps) => {
  const { hiveViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();

  const renderItem = ({ item }: { item: HiveModel }) => (
    <TouchableRipple
      style={simpleDetailedStyle(isListView, theme).hiveContainer}
      onPress={() => navigation.navigate("/hive/index", { hiveId: item.id })}
    >
      <View>
        <HiveInfo item={item} isDetailedView={isListView} />
      </View>
    </TouchableRipple>
  );

  return (
    <GestureHandlerRootView>
      <FlatList
        data={hiveViewModel.hives}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        key={isListView ? "list" : "grid"}
        numColumns={isListView ? 1 : 2}
        ListEmptyComponent={
          <Text style={theme.fonts.bodyLarge}>
            No hives have been registered. To register, use the 'Add New Hive'
            button.
          </Text>
        }
      />
    </GestureHandlerRootView>
  );
};

const simpleDetailedStyle = (isListView: boolean, theme?: MD3Theme) => {
  const dynamicTheme = theme ? theme : customLightTheme;

  return StyleSheet.create({
    hiveContainer: {
      backgroundColor: dynamicTheme.colors.secondaryContainer,
      maxWidth: isListView ? "100%" : "50%",
      margin: 6,
      gap: 12,
      flex: 1,
      padding: 10,
      borderRadius: 10,
    },
  });
};

export default HiveList;
