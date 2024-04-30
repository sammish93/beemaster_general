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
  const [initialPermission, setInitialPermission] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    switch (type) {
      case "location permission":
        setInitialPermission(userViewModel.isLocationEnabled);
        break;
      case "camera permission":
        setInitialPermission(userViewModel.isCameraEnabled);
        break;
      case "media permission":
        setInitialPermission(userViewModel.isMediaEnabled);
        break;
      default:
        setInitialPermission(false);
    }
  }, [
    type,
    userViewModel.isLocationEnabled,
    userViewModel.isCameraEnabled,
    userViewModel.isMediaEnabled,
  ]);

  useEffect(() => {
    setInitialPermission(isEnabled);
  }, [isEnabled]);

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
      <View
        style={{
          ...styles(paperTheme).settingsSubitem,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            paperTheme.fonts.bodyLarge,
            { marginRight: 10, color: paperTheme.colors.onSurface },
          ]}
        >
          {translateType(type)}
        </Text>
        <Switch
          value={initialPermission || false}
          onValueChange={toggleSwitch}
        />
      </View>
      <VerticalSpacer size={4} />
      {type === "location permission" && location && (
        <>
          <View
            style={{
              ...styles(paperTheme).settingsSubitem,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...paperTheme.fonts.bodySmall,
                color: paperTheme.colors.onSurface,
              }}
            >
              {userViewModel.i18n.t("position")}: Lat: {location.latitude}, Lng:{" "}
              {location.longitude}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default PermissionSwitch;
