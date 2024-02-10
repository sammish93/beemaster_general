import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { Button, Dialog, Paragraph, Portal, Provider } from 'react-native-paper';

interface PermissionManagerProps {
    onPermissionResult: (result: string | null) => void;
}

const PermissionManager = ({ onPermissionResult }: PermissionManagerProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [permissionResult, setPermissionResult] = useState<string | null>(null);

    useEffect(() => {
        const requestCameraPermission = async () => {
            try {
                let permissionType;
                if (Platform.OS === 'ios') {
                    permissionType = PERMISSIONS.IOS.CAMERA;
                } else if (Platform.OS === 'android') {
                    permissionType = PERMISSIONS.ANDROID.CAMERA;
                }
                if (permissionType) {
                    const result = await request(permissionType);
                    setPermissionResult(result);


                    onPermissionResult(result);
                    setVisible(true);
                }
            } catch (error) {
                console.error('Error requesting permission:', error);
            }
        };

        requestCameraPermission();
    }, [onPermissionResult]);

    return (
        <Provider>
            <View>
                <Portal>
                    <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                        <Dialog.Title>Tillatelse Resultat</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph> Permission Result: {permissionResult}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setVisible(false)}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    );
};

export default PermissionManager;
