import { Platform } from "react-native";
import MapView from "react-native-maps";

const Map = () => {
  return (
    <MapView
      style={{ flex: 1, height: 200, width: "100%" }}
      initialRegion={{
        latitude: -34.603738,
        longitude: -58.38157,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    />
  );
};

export default Map;
