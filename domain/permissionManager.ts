// PermissionManager.js
import { useState, useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import { requestForegroundPermissionsAsync, PermissionStatus, getCurrentPositionAsync, LocationObject } from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import * as Camera from 'expo-camera';
import { MobXProviderContext } from "mobx-react";

type PermissionType = 'location permission' | 'camera permission' | 'media permission';

type LocationState = null | LocationObject['coords'];

export const usePermissionManager = (type: PermissionType) => {
    const [status, setStatus] = useState<PermissionStatus | 'denied' | 'granted' | 'limited' | 'unavailable' | 'blocked' | 'undetermined' | undefined>(undefined);
    const [isEnabled, setIsEnabled] = useState(false);
    const [location, setLocation] = useState<LocationState>(null);
    const { userViewModel } = useContext(MobXProviderContext);

    useEffect(() => {
        checkPermissionStatus();
    }, []);

    const checkPermissionStatus = async () => {
        if (Platform.OS === 'web' && type === 'media permission') {
            return null;
        }

        switch (type) {
            case 'location permission':
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
            case 'camera permission':
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


            case 'media permission':   //Not compatible with web
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
                case 'location permission':
                    const locationStatus = await requestForegroundPermissionsAsync();
                    setStatus(locationStatus.status);
                    setIsEnabled(locationStatus.status === PermissionStatus.GRANTED);
                    if (locationStatus.status === PermissionStatus.GRANTED) {
                        const { coords } = await getCurrentPositionAsync({});
                        setLocation(coords);
                    }
                    break;
                case 'camera permission':
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
                case 'media permission':
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

    return { status, isEnabled, location, toggleSwitch };
};
