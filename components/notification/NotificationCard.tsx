import React, { useContext } from "react";
import { HiveModel } from "@/models/hiveModel";
import { View, Image, Dimensions } from "react-native";
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
    //TODO Toast feedback on success.
    hiveViewModel.toggleNotificationPreferenceForSpecificHive(
      item.notificationType,
      item.hiveId
    );

    // Also hides the notification.
    handleModifyNotification();

    setShowDialog(false);
  };

  const handleModifyNotification = () => {
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

    notificationViewModel.setNotifications([
      ...notificationViewModel.notifications,
    ]);
  };

  const handleCardPress = () => {
    const hive: HiveModel = hiveViewModel.getHiveFromId(item.hiveId);

    hiveViewModel.addSelectedHive(hive);

    navigation.navigate("hive/index");
  };

  return (
    <>
      {Dimensions.get("window").width >= ScreenWidth.Compact ? (
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
                  {userViewModel.i18n.t("mute")}
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
                  {userViewModel.i18n.t("read")}
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      ) : (
        <Card
          onPress={handleCardPress}
          style={{ margin: 4, flex: 1, maxWidth: "100%" }}
        >
          <Card.Cover
            source={getImageResourceFromNotificationType(item.notificationType)}
            style={{
              height: 60,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          />
          <Card.Content>
            <View style={{ paddingTop: 8, flexDirection: "column" }}>
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
              <VerticalSpacer size={8} />
              <View style={{ flexDirection: "row" }}>
                <Button
                  icon="bell-cancel"
                  mode="contained"
                  onPress={() => setShowDialog(true)}
                  style={{
                    alignSelf: "flex-end",
                    flex: 1,
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
                    flex: 1,
                  }}
                >
                  Read
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}

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
