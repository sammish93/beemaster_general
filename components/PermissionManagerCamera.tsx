import React, { useEffect, useState } from 'react';
import { Text, View, Platform } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';

//Used in hive page to ask user for camera permission


type PermissionStatus = 'granted' | 'denied' | 'undetermined' | 'unavailable' | 'blocked' | 'limited';


const PermissionManagerCamera = () => {
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus>('undetermined');

    useEffect(() => {
        if (Platform.OS === 'web') {
            requestCameraPermissionWeb();
        } else {
            requestCameraPermissionMobile();
        }
    }, []);

    const requestCameraPermissionMobile = async () => {
        const status = await request(
            Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
        );
        handlePermissionStatus(status);
    };

    const requestCameraPermissionWeb = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            handlePermissionStatus('granted');
        } catch (error) {
            handlePermissionStatus('denied');
        }
    };

    const handlePermissionStatus = (status: PermissionStatus) => {
        setCameraPermission(status);
        if (status === 'granted') {
            console.log('Camera permission granted');
        }
        if (status === 'denied') {
            console.log('Camera permission denied');
        }
        else {
            console.log('Camera permission undetermined');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Request Camera Permission: </Text>

            {cameraPermission === 'granted' && (
                <Text>Camera Permission Granted</Text>
            )}
            {cameraPermission === 'denied' && (
                <Text>Camera Permission Denied</Text>
            )}
            {cameraPermission === 'undetermined' && (
                <Text>Camera Permission Undetermined</Text>
            )}
        </View>
    );
};

export default PermissionManagerCamera;



