import { useContext, useEffect, useMemo, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { Button, useTheme, Text, MD3Theme } from "react-native-paper";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { MobXProviderContext } from "mobx-react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { HiveModel } from "@/models/hiveModel";
import HiveCard from "./HiveNoteCard";
import { customLightTheme } from "@/assets/themes";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import UserViewModel from "@/viewModels/UserViewModel";
import HiveNoteCard from "./HiveNoteCard";
import { HiveNote } from "@/models/note";

export interface HiveNotesProps {
  notes: HiveNote[];
  sortNotes: () => void;
  onPress: () => void;
}

const HiveNotes = ({ notes, sortNotes, onPress }: HiveNotesProps) => {
  const { hiveViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();
  const [parentWidth, setParentWidth] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  const renderItem = ({ item }: { item: HiveNote }) => (
    <HiveNoteCard item={item} onAddNote={sortNotes} onPress={() => onPress()} />
  );

  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
      onLayout={({ nativeEvent }) => {
        // Update parentWidth when the layout is calculated
        setParentWidth(nativeEvent.layout.width);
      }}
    >
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        key={`flatList-${notes}-row`}
        ListEmptyComponent={
          <Text style={theme.fonts.bodyLarge}>
            No notes have been registered
            {/*TODO Refresh Button */}
          </Text>
        }
      />
    </GestureHandlerRootView>
  );
};

export default HiveNotes;
