import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { requestForegroundPermissionsAsync, PermissionStatus } from 'expo-location';



const LocationPermissionComponent = () => {
    const [status, setStatus] = useState<PermissionStatus>();
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = async () => {
        if (!isEnabled) {
            const { status } = await requestForegroundPermissionsAsync();
            setStatus(status);
            setIsEnabled(status === PermissionStatus.GRANTED);
        } else {
            setIsEnabled(false);
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10 }}>Tillatelsestatus for lokasjon:</Text>
            <Switch
                value={isEnabled}
                onValueChange={toggleSwitch}
                color="#6200EE"
            />
            <Text>{isEnabled ? 'Tillatelse gitt' : 'Tillatelse nektet'}</Text>

        </View>
    );
};



export default LocationPermissionComponent;
