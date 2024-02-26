import { useContext, useMemo, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { Button, useTheme, Text, MD3Theme } from "react-native-paper";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { MobXProviderContext } from "mobx-react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { HiveModel } from "@/models/hiveModel";
import HiveCard from "./HiveCard";
import { customLightTheme } from "@/assets/themes";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";

export interface HiveListProps {
  isListView: boolean;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const HiveList = ({ isListView, navigation }: HiveListProps) => {
  const { hiveViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();
  const [parentWidth, setParentWidth] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  // Returns the number of columns to display. This ensures that the grid is responsive.
  const numColumns = useMemo(() => {
    // Ensure we don't divide by zero
    if (parentWidth === 0) return 1;

    return Math.floor(parentWidth / (isListView ? 250 : 150));
  }, [parentWidth]);

  // Returns the amount of items in the last row
  const itemsInLastRow = useMemo(() => {
    const totalItems = hiveViewModel.hives.length;
    const remainder = totalItems % numColumns;

    return remainder === 0 ? 0 : remainder;
  }, [hiveViewModel.hives.length, numColumns]);

  //TODO Modify onPress
  const renderItem = ({ item }: { item: HiveModel }) => (
    <HiveCard
      item={item}
      isDetailedView={isListView}
      onPress={() => navigation.navigate("/hive/index", { hiveId: item.id })}
      maxWidth={
        numColumns > 1 ? parentWidth / numColumns - itemsInLastRow * 8 : "100%"
      }
    />
  );

  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
      onLayout={({ nativeEvent }) => {
        setParentWidth(nativeEvent.layout.width); // Update parentWidth when the layout is calculated
      }}
    >
      <Text>
        {numColumns} {parentWidth} {screenWidth} {itemsInLastRow}
      </Text>
      <FlatList
        data={hiveViewModel.hives}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        key={`flatList-${numColumns}-columns`}
        numColumns={numColumns}
        ListEmptyComponent={
          <Text style={theme.fonts.bodyLarge}>
            No hives have been registered. To register, use the 'Add New Hive'
            button.
            {/*TODO Refresh Button */}
          </Text>
        }
      />
    </GestureHandlerRootView>
  );
};

export default HiveList;
