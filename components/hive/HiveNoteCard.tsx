import React, { useContext } from "react";
import { HiveModel } from "@/models/hiveModel";
import { View, Image } from "react-native";
import { useTheme, Text, Card, Icon } from "react-native-paper";
import { sensorData } from "@/data/hiveData";
import getWeatherTypeIconFromString from "@/domain/weatherIconMapper";
import { MobXProviderContext } from "mobx-react";
import { HorizontalSpacer } from "../Spacers";
import { HiveNote } from "@/models/note";

interface HiveNoteCardProps {
  item: HiveNote;
  onPress: () => void;
}

const HiveNoteCard = ({ onPress, item }: HiveNoteCardProps) => {
  const { userViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();

  //TODO Swap out with real data.

  return (
    <Card onPress={onPress} style={{ margin: 4, flex: 1, maxWidth: "100%" }}>
      <Card.Content
        style={{
          flexDirection: "row",
        }}
      >
        <Text
          style={theme.fonts.bodyMedium}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Note: {item.note} Sticky: {item.isSticky.toString()}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default HiveNoteCard;
