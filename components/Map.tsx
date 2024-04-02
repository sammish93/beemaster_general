import { DimensionValue, Platform, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MapProps {
  lat: number;
  lng: number;
  height?: DimensionValue;
  width?: DimensionValue;
}

// TODO Localisation
const Map = ({ lat, lng, height = "100%", width = "100%" }: MapProps) => {
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
      >
        <Marker
          coordinate={{ latitude: lat, longitude: lng }}
          title={"Hive Location"}
          description={"Your hive is located here."}
        />
      </MapView>
    </View>
  );
};

export default Map;
