import { usePermissionManager } from "@/domain/permissionManager";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { DimensionValue, Platform, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MapRelocateProps {
  lat: number;
  lng: number;
  height?: DimensionValue;
  width?: DimensionValue;
}

// TODO Localisation
const MapRelocate = ({
  lat,
  lng,
  height = "100%",
  width = "100%",
}: MapRelocateProps) => {
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
      ></MapView>
    </View>
  );
};

export default MapRelocate;
