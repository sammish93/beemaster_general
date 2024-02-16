import React, { useState } from 'react';
import { Text, View, Platform } from 'react-native';
import { Switch } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';

//Not compatible with web

const MediaFilePermissionSwitch = () => {
    const [status, setStatus] = useState<MediaLibrary.PermissionStatus | 'denied' | undefined>(undefined);


    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = async () => {
        if (!isEnabled) {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setStatus(status);
            if (status === 'granted') {
                setIsEnabled(true);

            }
        } else {

            setIsEnabled(false);
            setStatus('denied');


        }
    };
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
        return null;
    }

    return (
        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>Media File permission: {status}</Text>
                <Switch
                    value={isEnabled}
                    onValueChange={toggleSwitch}
                />
            </View>
        </View>
    );
};

export default MediaFilePermissionSwitch;


