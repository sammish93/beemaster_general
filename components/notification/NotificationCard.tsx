import React, { useContext } from "react";
import { HiveModel } from "@/models/hiveModel";
import { View, Image } from "react-native";
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

interface NotificationProps {
  item: HiveNotification;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const NotificationCard = ({ item, navigation }: NotificationProps) => {
  const { userViewModel } = useContext(MobXProviderContext);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const { notificationViewModel } = useContext(MobXProviderContext);
  const [showDialog, setShowDialog] = React.useState(false);
  const theme = useTheme();

  if (item.isRead) {
    return null;
  }

  const hideDialog = () => {
    setShowDialog(false);
  };

  const handleMuteHive = () => {
    //TODO Integrate functionality.
    setShowDialog(false);
  };

  const handleModifyNotification = () => {
    //TODO Db writing
    const existingNotification: HiveNotification =
      notificationViewModel.getNotificationFromId(item.id);
    const newNotification: HiveNotification = {
      id: existingNotification.id,
      hiveId: existingNotification.hiveId,
      notificationType: existingNotification.notificationType,
      timestamp: existingNotification.timestamp,
      isRead: true,
      message: existingNotification.message,
    };

    notificationViewModel.modifyNotification(newNotification);
    notificationViewModel.notifications = [
      ...notificationViewModel.notifications,
    ];
  };

  const handleCardPress = () => {
    // TODO DB integration and error handling when hive doesn't exist
    const hive: HiveModel = hiveViewModel.getHiveFromId(item.hiveId);

    hiveViewModel.addSelectedHive(hive);

    navigation.navigate("/hive/index", { hiveId: hive.id });
  };

  return (
    <>
      <Card
        onPress={handleCardPress}
        style={{ margin: 4, flex: 1, maxWidth: "100%" }}
      >
        <Card.Content
          style={{
            flex: 1,
            padding: 0,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 0,
            }}
          >
            <Image
              source={getImageResourceFromNotificationType(
                item.notificationType
              )}
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                borderBottomLeftRadius: 12,
                borderTopLeftRadius: 12,
              }}
              resizeMode="cover"
            />
          </View>

          <View style={{ flex: 9, padding: 16, flexDirection: "row" }}>
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Text
                style={{
                  ...theme.fonts.bodySmall,
                  color: theme.colors.onSurfaceVariant,
                }}
              >
                {dateTimeFormatter(
                  item.timestamp,
                  userViewModel.locale,
                  "long"
                )}
              </Text>
              <VerticalSpacer size={8} />
              <Text style={theme.fonts.bodyLarge}>{item.message}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                icon="bell-cancel"
                mode="contained"
                onPress={() => setShowDialog(true)}
                style={{
                  alignSelf: "flex-end",
                }}
              >
                Mute
              </Button>
              <HorizontalSpacer size={4} />
              <Button
                icon="checkbox-marked-circle"
                mode="contained"
                onPress={handleModifyNotification}
                style={{
                  alignSelf: "flex-end",
                }}
              >
                Read
              </Button>
            </View>
          </View>
        </Card.Content>
      </Card>
      {showDialog && (
        <DialogMuteSpecificHiveNotification
          hideDialog={hideDialog}
          muteHive={handleMuteHive}
          notification={item}
        />
      )}
    </>
  );
};

export default NotificationCard;
