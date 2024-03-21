import React, { useContext } from "react";
import { HiveModel } from "@/models/hiveModel";
import { View, Image } from "react-native";
import { useTheme, Text, Card, Icon, FAB, Title } from "react-native-paper";
import { sensorData } from "@/data/hiveData";
import getWeatherTypeIconFromString from "@/domain/weatherIconMapper";
import { MobXProviderContext } from "mobx-react";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { HiveNote } from "@/models/note";
import styles from "@/assets/styles";
import { dateTimeFormatter } from "@/domain/dateTimeFormatter";

interface HiveNoteCardProps {
  item: HiveNote;
  onAddNote: () => void;
  onPress: () => void;
}

const HiveNoteCard = ({ item, onAddNote, onPress }: HiveNoteCardProps) => {
  const { userViewModel } = useContext(MobXProviderContext);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();

  const handleOnPressCard = () => {
    hiveViewModel.addSelectedNote(item);
    onPress();
  };

  const handleOnPressSticky = () => {
    hiveViewModel.toggleNoteSticky(item);

    onAddNote();
  };

  //TODO Swap out with real data.
  return (
    <Card
      onPress={handleOnPressCard}
      style={{
        backgroundColor: item.isSticky
          ? theme.colors.elevation.level1
          : theme.colors.elevation.level5,
        margin: 4,
        flex: 1,
      }}
    >
      <Card.Content style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "100%",
            flex: 1,
          }}
        >
          <Text
            style={{
              ...theme.fonts.bodySmall,
              color: theme.colors.onSurfaceVariant,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {dateTimeFormatter(
              item.timestamp,
              userViewModel.i18n.locale,
              "long"
            )}
          </Text>
          <VerticalSpacer size={8} />
          <Text style={theme.fonts.bodyMedium}>{item.note}</Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <FAB
            icon={item.isSticky ? "pin-off" : "pin"}
            onPress={handleOnPressSticky}
            size="small"
            style={{ position: "relative", left: 0 }}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default HiveNoteCard;
