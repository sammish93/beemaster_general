import { MobXProviderContext } from "mobx-react";
import { useContext, useEffect } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { HorizontalSpacer, VerticalSpacer } from "./Spacers";
import { LatLng } from "react-native-maps";
import { DimensionValue, Dimensions, View } from "react-native";
import { usePermissionManager } from "@/domain/permissionManager";
import { ScreenWidth } from "@/constants/Dimensions";

interface MapRelocateProps {
  lat: number;
  lng: number;
  onMapPress: (coordinate: LatLng) => void;
  newLocation: LatLng | undefined;
  height?: DimensionValue;
  width?: DimensionValue;
}

const MapRelocate = ({
  lat,
  lng,
  onMapPress,
  newLocation,
  height = "100%",
  width = "100%",
}: MapRelocateProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);
  const { status, location, isEnabled, checkPermissionStatus } =
    usePermissionManager("location permission");

  useEffect(() => {
    checkPermissionStatus();
  }, [userViewModel.getLocationPermission()]);

  const handlePress = () => {
    if (location?.latitude != null && location?.longitude != null) {
      const latLng = {
        latitude: location?.latitude,
        longitude: location?.longitude,
      };
      onMapPress(latLng);
    }
  };

  const handlePressDefault = () => {
    const latLng = { latitude: 59.9139, longitude: 10.7522 };
    onMapPress(latLng);
  };

  return (
    <>
      <Text
        style={{
          ...theme.fonts.bodyLarge,
          textAlign: "center",
        }}
      >
        {userViewModel.i18n.t("maps are only available")}
      </Text>
      <VerticalSpacer size={8} />
      <View
        style={{
          flexDirection:
            Dimensions.get("window").width <= ScreenWidth.Compact
              ? "column"
              : "row",
        }}
      >
        {location?.latitude != null && location?.longitude != null ? (
          <>
            <Button mode="contained" onPress={handlePress} style={{ flex: 1 }}>
              {userViewModel.i18n.t("use current location")}
            </Button>
            {Dimensions.get("window").width <= ScreenWidth.Compact ? (
              <VerticalSpacer size={8} />
            ) : (
              <HorizontalSpacer size={8} />
            )}
          </>
        ) : null}
        <Button
          mode="contained"
          onPress={handlePressDefault}
          style={{ flex: 1 }}
        >
          {userViewModel.i18n.t("use default location")}
        </Button>
      </View>
    </>
  );
};

export default MapRelocate;
