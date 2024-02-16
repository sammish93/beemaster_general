import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { requestForegroundPermissionsAsync, PermissionStatus, getCurrentPositionAsync, LocationObject } from 'expo-location';

type LocationState = null | LocationObject['coords'];

const LocationPermissionComponent = () => {
    const [status, setStatus] = useState<PermissionStatus>();
    const [isEnabled, setIsEnabled] = useState(false);
    const [location, setLocation] = useState<LocationState>(null);

    const toggleSwitch = async () => {
        if (!isEnabled) {
            const { status } = await requestForegroundPermissionsAsync();
            setStatus(status);
            if (status === PermissionStatus.GRANTED) {
                setIsEnabled(true);
                const { coords } = await getCurrentPositionAsync({});
                setLocation(coords);
            }
        } else {
            setIsEnabled(false);
            setStatus(undefined);
            setLocation(null);
        }
    };

    return (
        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>Location permission: {status}</Text>
                <Switch
                    value={isEnabled}
                    onValueChange={toggleSwitch}
                />
            </View>
            {location && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginRight: 10 }}>Posisjon: Lat: {location.latitude}, Long: {location.longitude}</Text>
                </View>
            )}
        </View>

    );
};

export default LocationPermissionComponent;


