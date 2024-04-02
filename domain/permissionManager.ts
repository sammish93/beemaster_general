// PermissionManager.js
import { useState, useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import { requestForegroundPermissionsAsync, PermissionStatus, getCurrentPositionAsync, LocationObject, getForegroundPermissionsAsync } from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import * as Camera from 'expo-camera';
import { MobXProviderContext } from "mobx-react";
import Toast from 'react-native-toast-message';
import { toastCrossPlatform } from '@/components/ToastCustom';

type PermissionType = 'location permission' | 'camera permission' | 'media permission';

type LocationState = null | LocationObject['coords'];

export const usePermissionManager = (type: PermissionType) => {
    const { userViewModel } = useContext(MobXProviderContext);
    const [status, setStatus] = useState<PermissionStatus | 'denied' | 'granted' | 'limited' | 'unavailable' | 'blocked' | 'undetermined' | undefined>(undefined);
    const [isEnabled, setIsEnabled] = useState( type === "location permission"
    ? userViewModel.getLocationPermission()
    : type === "camera permission"
    ? userViewModel.getCameraPermission()
    : type === "media permission"
    ? userViewModel.getMediaPermission()
    : false);
    const [location, setLocation] = useState<LocationState>(null);

    /*
    useEffect(() => {
        checkPermissionStatus();
    }, []);
    */

    const checkPermissionStatus = async () => {
        if (Platform.OS === 'web' && type === 'media permission') {
            return null;
        }

        switch (type) {
            case 'location permission':
                if (Platform.OS === 'ios' || Platform.OS === 'android' || Platform.OS === 'web') {
                    let locationStatus = await getForegroundPermissionsAsync();
                    setStatus(locationStatus.status);
                    if (locationStatus.status != PermissionStatus.GRANTED) {
                        locationStatus = await requestForegroundPermissionsAsync();
                        setStatus(locationStatus.status);
                        userViewModel.setLocationPermission(locationStatus.status === PermissionStatus.GRANTED)
                        setIsEnabled(locationStatus.status === PermissionStatus.GRANTED)
                    }

                    if (locationStatus.status === PermissionStatus.GRANTED && userViewModel.getLocationPermission() === true) {
                        const { coords } = await getCurrentPositionAsync({});
                        setLocation(coords)
                    }
                }
                break;
            case 'camera permission':
                // TODO Maybe adjust it to be similar to location permissions. I haven't manually tested this block.
                if (Platform.OS === 'web') {
                    navigator.permissions.query({ name: 'camera' as PermissionName }).then(result => {
                        if (result.state === 'granted') {
                            setStatus('granted');
                            userViewModel.setCameraPermission(true)
                            setIsEnabled(true)
                        } else if (result.state === 'denied') {
                            setStatus('denied');
                            userViewModel.setCameraPermission(false)
                            setIsEnabled(false)
                        } else {
                            setStatus('undetermined');
                            userViewModel.setCameraPermission(false)
                            setIsEnabled(false)
                        }
                    });
                } else {
                    if (Platform.OS === 'ios' || Platform.OS === 'android') {

                        const cameraStatus = await Camera.requestCameraPermissionsAsync();
                        setStatus(cameraStatus.status);
                        userViewModel.setCameraPermission(cameraStatus.status === 'granted');
                        setIsEnabled(cameraStatus.status === 'granted')
                        break;
                    }
                }


            case 'media permission':   //Not compatible with web
                // TODO Maybe adjust it to be similar to location permissions. I haven't manually tested this block.
                if (Platform.OS !== 'web') {
                    const mediaStatus = await MediaLibrary.requestPermissionsAsync();
                    setStatus(mediaStatus.status);
                    userViewModel.setMediaPermission(mediaStatus.status === 'granted');
                    setIsEnabled(mediaStatus.status === 'granted')
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
                    let locationStatus = await getForegroundPermissionsAsync();
                    setStatus(locationStatus.status);
                    if (locationStatus.status != PermissionStatus.GRANTED) {
                        locationStatus = await requestForegroundPermissionsAsync();
                        setStatus(locationStatus.status);
                    } 
                    
                    if (locationStatus.canAskAgain === false) {
                        Toast.show(
                            toastCrossPlatform({
                              title: "Oops!",
                              text: `You need to manually change permissions in your settings.`,
                              type: "info",
                            })
                          );
                    }
                    
                    userViewModel.setLocationPermission(locationStatus.status === PermissionStatus.GRANTED);
                    setIsEnabled(locationStatus.status === PermissionStatus.GRANTED)

                    if (locationStatus.status === PermissionStatus.GRANTED  && userViewModel.getLocationPermission() === true) {
                        const { coords } = await getCurrentPositionAsync({});
                        setLocation(coords);
                    }
                    break;
                case 'camera permission':
                    if (Platform.OS === 'web') {
                        try {
                            await navigator.mediaDevices.getUserMedia({ video: true });
                            setStatus('granted');
                            userViewModel.setCameraPermission(true);
                            setIsEnabled(true)
                        } catch (error) {
                            setStatus('denied');
                            userViewModel.setCameraPermission(false);
                            setIsEnabled(false)
                        }
                    } else {
                        if (Platform.OS === 'ios' || Platform.OS === 'android') {
                            let cameraStatus = await Camera.getCameraPermissionsAsync();
                            setStatus(cameraStatus.status);

                            if (cameraStatus.status != PermissionStatus.GRANTED) {
                                cameraStatus = await Camera.requestCameraPermissionsAsync();
                            setStatus(cameraStatus.status);
                            } 
                            
                            if (cameraStatus.canAskAgain === false) {
                                Toast.show(
                                    toastCrossPlatform({
                                      title: "Oops!",
                                      text: `You need to manually change permissions in your settings.`,
                                      type: "info",
                                    })
                                  );
                            }

                            userViewModel.setCameraPermission(cameraStatus.status === 'granted');
                            setIsEnabled(cameraStatus.status === 'granted')
                            break;
                        }
                    }

                    break;
                case 'media permission':
                    if (Platform.OS !== 'web') {
                        let mediaStatus = await MediaLibrary.getPermissionsAsync();
                        setStatus(mediaStatus.status);

                        if (mediaStatus.status != PermissionStatus.GRANTED) {
                            mediaStatus = await MediaLibrary.requestPermissionsAsync();
                        setStatus(mediaStatus.status);
                        } 
                        
                        if (mediaStatus.canAskAgain === false) {
                            Toast.show(
                                toastCrossPlatform({
                                    title: "Oops!",
                                    text: `You need to manually change permissions in your settings.`,
                                    type: "info",
                                })
                                );
                        }

                        userViewModel.setCameraPermission(mediaStatus.status === 'granted');
                        setIsEnabled(mediaStatus.status === 'granted')
                        break;
                    }

                    break;
                default:
                    break;
            }
        } else {
            //setStatus('denied');
            setStatus(undefined);
            if (type === 'location permission') {
                userViewModel.setLocationPermission(false)
            } else if (type === 'media permission') {
                userViewModel.setMediaPermission(false)
            } else if (type === 'camera permission') {
                userViewModel.setCameraPermission(false)
            }
            setIsEnabled(false);
            setLocation(null);
        }
    };

    return { status, isEnabled, location, toggleSwitch, checkPermissionStatus };
};
