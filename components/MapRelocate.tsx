import { usePermissionManager } from "@/domain/permissionManager";
import { MobXProviderContext } from "mobx-react";
import { useContext, useState } from "react";
import { DimensionValue, Platform, View } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";

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
  const { userViewModel } = useContext(MobXProviderContext);

  const handlePress = (e) => {
    onMapPress(e.nativeEvent.coordinate);
  };

  return (
    <View
      style={{
        alignSelf: "center",
        width: width,
        height: height,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <MapView
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsMyLocationButton={true}
        showsUserLocation={true}
        onPress={handlePress}
      >
        {newLocation?.latitude != null && newLocation?.longitude != null ? (
          <Marker
            coordinate={{
              latitude: newLocation?.latitude,
              longitude: newLocation?.longitude,
            }}
            title={userViewModel.i18n.t("hive location")}
            description={userViewModel.i18n.t(
              "your hive will be positioned here"
            )}
          />
        ) : null}
      </MapView>
    </View>
  );
};

export default MapRelocate;
