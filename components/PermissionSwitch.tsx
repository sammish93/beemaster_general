import React, { useState, useEffect } from 'react';
import { Text, View, Platform } from 'react-native';
import { Switch, useTheme } from 'react-native-paper';
import { requestForegroundPermissionsAsync, PermissionStatus, getCurrentPositionAsync, LocationObject } from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
//import { PERMISSIONS, request, check } from 'react-native-permissions';
import * as Camera from 'expo-camera';

type PermissionType = 'location' | 'camera' | 'media';

type LocationState = null | LocationObject['coords'];

interface PermissionSwitchProps {
    type: PermissionType;
}

/**
 * A component that manages and displays permission status for location, camera, or media access.
 * Depending on the permission type (`location`, `camera`, or `media`), it checks the current
 * permission status on mount and provides a toggle switch to request permission if not already granted.
 * For location permissions, it also retrieves and displays the current position coordinates if permission is granted.
 * 
 * Note: Media permission checking and requesting is not supported on the web platform.
 * 
 * Props:
 *  - type: `PermissionType` - Specifies the type of permission to manage (`location`, `camera`, or `media`).
 *
 */

const PermissionSwitch = ({ type }: PermissionSwitchProps) => {

    const [status, setStatus] = useState<PermissionStatus | 'denied' | 'granted' | 'limited' | 'unavailable' | 'blocked' | 'undetermined' | undefined>(undefined);
    const [isEnabled, setIsEnabled] = useState(false);
    const [location, setLocation] = useState<LocationState>(null);
    const paperTheme = useTheme();



    useEffect(() => {
        checkPermissionStatus();
    }, []);

    const checkPermissionStatus = async () => {
        if (Platform.OS === 'web' && type === 'media') {
            return null;
        }

        switch (type) {
            case 'location':
                if (Platform.OS === 'ios' || Platform.OS === 'android' || Platform.OS === 'web') {
                    const locationStatus = await requestForegroundPermissionsAsync();
                    setStatus(locationStatus.status);
                    setIsEnabled(locationStatus.status === PermissionStatus.GRANTED);
                    if (locationStatus.status === PermissionStatus.GRANTED) {
                        const { coords } = await getCurrentPositionAsync({});
                        setLocation(coords);
                    }
                }
                break;
            case 'camera':
                if (Platform.OS === 'web') {
                    navigator.permissions.query({ name: 'camera' as PermissionName }).then(result => {
                        if (result.state === 'granted') {
                            setStatus('granted');
                            setIsEnabled(true);
                        } else if (result.state === 'denied') {
                            setStatus('denied');
                            setIsEnabled(false);
                        } else {
                            setStatus('undetermined');
                            setIsEnabled(false);
                        }
                    });
                } else {
                    if (Platform.OS === 'ios' || Platform.OS === 'android') {

                        const cameraStatus = await Camera.requestCameraPermissionsAsync();
                        setStatus(cameraStatus.status);
                        setIsEnabled(cameraStatus.status === 'granted');
                        break;
                    }
                }


            case 'media':   //Not compatible with web
                if (Platform.OS !== 'web') {
                    const mediaStatus = await MediaLibrary.requestPermissionsAsync();
                    setStatus(mediaStatus.status);
                    setIsEnabled(mediaStatus.status === 'granted');
                }
                break;
            default:
                break;
        }
    };

    const toggleSwitch = async () => {
        if (!isEnabled) {
            switch (type) {
                case 'location':
                    const locationStatus = await requestForegroundPermissionsAsync();
                    setStatus(locationStatus.status);
                    setIsEnabled(locationStatus.status === PermissionStatus.GRANTED);
                    if (locationStatus.status === PermissionStatus.GRANTED) {
                        const { coords } = await getCurrentPositionAsync({});
                        setLocation(coords);
                    }
                    break;
                case 'camera':
                    if (Platform.OS === 'web') {
                        try {
                            await navigator.mediaDevices.getUserMedia({ video: true });
                            setStatus('granted');
                            setIsEnabled(true);
                        } catch (error) {
                            setStatus('denied');
                            setIsEnabled(false);
                        }
                    } else {
                        if (Platform.OS === 'ios' || Platform.OS === 'android') {

                            const cameraStatus = await Camera.requestCameraPermissionsAsync();
                            setStatus(cameraStatus.status);
                            setIsEnabled(cameraStatus.status === 'granted');
                            break;
                        }
                    }

                    break;
                case 'media':
                    if (Platform.OS !== 'web') {
                        const mediaStatus = await MediaLibrary.requestPermissionsAsync();
                        setStatus(mediaStatus.status);
                        setIsEnabled(mediaStatus.status === 'granted');
                    }

                    break;
                default:
                    break;
            }
        } else {
            //setStatus('denied');
            setStatus(undefined);
            setIsEnabled(false);
            setLocation(null);
        }
    };
    if (Platform.OS === 'web' && type === 'media') {
        return null;
    }



    return (


        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[paperTheme.fonts.bodyMedium, { marginRight: 10, color: paperTheme.colors.onSurface }]}>
                    {type === 'location' ? 'Location' : type === 'camera' ? 'Camera' : 'Media File'} permission: {status}
                </Text>

                <Switch
                    value={isEnabled}
                    onValueChange={toggleSwitch}
                />
            </View>
            {type === 'location' && location && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[paperTheme.fonts.bodyMedium, { marginRight: 10, color: paperTheme.colors.onSurface }]}>Posisjon: Lat: {location.latitude}, Long: {location.longitude}</Text>
                </View>
            )}
        </View>
    );
}

export default PermissionSwitch;
