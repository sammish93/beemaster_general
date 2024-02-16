import React, { useEffect, useState } from 'react';
import { Text, Switch } from 'react-native-paper';
import { View, Platform } from 'react-native';
import { PERMISSIONS, request, check } from 'react-native-permissions';
//import { Camera } from 'expo-camera';

type PermissionStatus = 'granted' | 'denied' | 'undetermined' | 'limited' | 'blocked' | 'unavailable';

const CameraPermissionsSwitch = () => {
    return Platform.OS === "web" ? <Web /> : <Mobile />;
};

const Mobile = () => {
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus>('undetermined');
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        checkAndRequestCameraPermission();
    }, []);

    const checkAndRequestCameraPermission = async () => {
        const permissionType = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
        const existingStatus = await check(permissionType);
        setCameraPermission(existingStatus);
        setIsEnabled(existingStatus === 'granted');
    };

    const handleSwitchChange = async (newValue: boolean) => {
        if (newValue) {
            const permissionType = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
            const newStatus = await request(permissionType);
            setCameraPermission(newStatus);
            setIsEnabled(newStatus === 'granted');
        } else {
            setCameraPermission('denied');
            setIsEnabled(false);
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Camera Permission: {cameraPermission}</Text>
            <Switch
                onValueChange={handleSwitchChange}
                value={isEnabled}
            />
        </View>
    );
};/* using expo, but web crashes:
const Mobile = () => {
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        checkAndRequestCameraPermission();
    }, []);

    const checkAndRequestCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(status);
        setIsEnabled(status === 'granted');
    };

    const handleSwitchChange = async (newValue: boolean) => {
        if (newValue) {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(status);
            setIsEnabled(status === 'granted');
        } else {
            setCameraPermission('denied');
            setIsEnabled(false);
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Camera Permission: {cameraPermission}</Text>
            <Switch
                onValueChange={handleSwitchChange}
                value={isEnabled}
            />
        </View>
    );
};
*/
const Web = () => {
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus>('undetermined');
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        navigator.permissions.query({ name: 'camera' as PermissionName }).then(result => {
            if (result.state === 'granted') {
                setCameraPermission('granted');
                setIsEnabled(true);
            } else if (result.state === 'denied') {
                setCameraPermission('denied');
                setIsEnabled(false);
            } else {
                setCameraPermission('undetermined');
                setIsEnabled(false);
            }
        });
    }, []);

    const handleSwitchChange = async (newValue: boolean) => {
        if (newValue) {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });
                setCameraPermission('granted');
                setIsEnabled(true);
            } catch (error) {
                setCameraPermission('denied');
                setIsEnabled(false);
            }
        } else {
            setCameraPermission('denied');
            setIsEnabled(false);
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10 }}>Camera Permission: {cameraPermission}</Text>
            <Switch
                onValueChange={handleSwitchChange}
                value={isEnabled}
            />
        </View>
    );
};

export default CameraPermissionsSwitch;

