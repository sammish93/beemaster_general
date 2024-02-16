import React, { useEffect, useState } from 'react';
import { Text, Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import { View, Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';


type PermissionStatus = 'granted' | 'denied' | 'undetermined';
const PermissionsModal = () => {

    if (Platform.OS === "android" || Platform.OS === "ios") {
        return <MobileModal />;
    } else {
        return <WebModal />;
    }

};

const MobileModal = () => {
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus>('undetermined');
    const [dialogVisible, setDialogVisible] = useState(false);
    const [permissionRequested, setPermissionRequested] = useState(false);

    useEffect(() => {
        if (permissionRequested) {
            requestCameraPermission();
        }
    }, [permissionRequested]);

    const requestCameraPermission = async () => {
        const status = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
        setCameraPermission(status as PermissionStatus);
        setDialogVisible(false);
    };

    const handleRequestCameraPermission = () => {
        setPermissionRequested(true);
        setDialogVisible(true);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button mode="contained" onPress={handleRequestCameraPermission}> Request Camera Permission</Button>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                    <Dialog.Title>Permission Request</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Do you want to give permissions for this app to access your camera?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)}>Deny</Button>
                        <Button onPress={requestCameraPermission}>Allow</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
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

const WebModal = () => {
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus>('undetermined');
    const [dialogVisible, setDialogVisible] = useState(false);
    const [permissionRequested, setPermissionRequested] = useState(false);

    useEffect(() => {
        if (permissionRequested) {
            requestCameraPermission();
        }
    }, [permissionRequested]);


    const requestCameraPermission = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraPermission('granted');
            setDialogVisible(false);
        } catch (error) {
            setCameraPermission('denied');
        }

    };
    const handleRequestCameraPermission = () => {
        setPermissionRequested(true);
        setDialogVisible(true);
    };


    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button mode="contained" onPress={handleRequestCameraPermission}> Request Camera Permission</Button>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                    <Dialog.Title>Permission Request</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Do you want to give permissions for this app to access your camera?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)}>Deny</Button>
                        <Button onPress={requestCameraPermission}>Allow</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
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

export default PermissionsModal;
