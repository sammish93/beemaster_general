import React, { useContext, useEffect, useState } from "react";
import { Text, View, Platform } from "react-native";
import { Switch, useTheme } from "react-native-paper";
import { MobXProviderContext } from "mobx-react";
import { usePermissionManager } from "../domain/permissionManager";
import { VerticalSpacer } from "./Spacers";
import styles from "@/assets/styles";

type PermissionType =
  | "location permission"
  | "camera permission"
  | "media permission";

interface PermissionSwitchProps {
  type: PermissionType;
}

const PermissionSwitch = ({ type }: PermissionSwitchProps) => {
  const paperTheme = useTheme();
  const { status, isEnabled, location, toggleSwitch } =
    usePermissionManager(type);
  const { userViewModel } = useContext(MobXProviderContext);
  const [permissionValue, setPermissionValue] = useState<boolean>(false);

  useEffect(() => {
    switch (type) {
      case "location permission":
        setPermissionValue(userViewModel.getLocationPermission());
        break;
      case "camera permission":
        setPermissionValue(userViewModel.getCameraPermission());
        break;
      case "media permission":
        setPermissionValue(userViewModel.getMediaPermission());
        break;
      default:
        setPermissionValue(false);
    }
  }, [userViewModel]);

  const translateType = (type: PermissionType): string => {
    switch (type) {
      case "location permission":
        return userViewModel.i18n.t("location permission");
      case "camera permission":
        return userViewModel.i18n.t("camera permission");
      case "media permission":
        return userViewModel.i18n.t("media permission");

      default:
        return type;
    }
  };

  if (Platform.OS === "web" && type === "media permission") {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={[
            paperTheme.fonts.bodyLarge,
            { marginRight: 10, color: paperTheme.colors.onSurface },
          ]}
        >
          {translateType(type)}
        </Text>
        <Switch value={isEnabled} onValueChange={toggleSwitch} />
      </View>
      <VerticalSpacer size={6} />
      {type === "location permission" && location && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[
              paperTheme.fonts.bodyLarge,
              { marginRight: 10, color: paperTheme.colors.onSurface },
            ]}
          >
            {userViewModel.i18n.t("position")}: Lat: {location.latitude}, Long:{" "}
            {location.longitude}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PermissionSwitch;
