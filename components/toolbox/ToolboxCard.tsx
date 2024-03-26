import React, { useContext } from "react";
import { HiveModel } from "@/models/hiveModel";
import { View, Image, Dimensions, ImageSourcePropType } from "react-native";
import { useTheme, Text, Card, Icon, Button } from "react-native-paper";
import { sensorData } from "@/data/hiveData";
import getWeatherTypeIconFromString from "@/domain/weatherIconMapper";
import { MobXProviderContext } from "mobx-react";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { HiveNotification } from "@/models/notification";
import { dateTimeFormatter } from "@/domain/dateTimeFormatter";
import { NavigationProp } from "@react-navigation/native";
import DialogMuteSpecificHiveNotification from "../modals/DialogMuteSpecificHiveNotification";
import getImageResourceFromNotificationType from "@/domain/notificationImageMapper";
import { ScreenWidth } from "@/constants/Dimensions";

interface ToolboxProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
  onClick: () => void;
}

const ToolboxCard = (props: ToolboxProps) => {
  const { userViewModel } = useContext(MobXProviderContext);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const { notificationViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();

  return (
    <Card onPress={props.onClick} style={{ maxWidth: "100%", flex: 1 }}>
      <Card.Cover
        source={props.image}
        resizeMode="cover"
        style={{
          height: 100,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      <Card.Content style={{ paddingTop: 8, flexDirection: "column" }}>
        <Text variant="titleLarge">{props.title}</Text>
        <Text variant="bodyMedium">{props.description}</Text>
      </Card.Content>
    </Card>
  );
};

export default ToolboxCard;
