import React, { useState } from 'react';
import { useTheme } from "react-native-paper";
import { Modal, Portal, Button, TextInput, IconButton, Text } from 'react-native-paper';
import styles from "@/assets/styles";
import { View } from 'react-native';

interface AddHiveModalProps {
    isVisible: boolean
    title: string
    onClose: () => void
    onAddHive: (hiveName: string) => void
}

const AddHiveModal = ({ isVisible, title, onClose, onAddHive }: AddHiveModalProps) => {
    const [newHiveName, setNewHiveName] = useState('');
    const theme = useTheme();

    const containerStyle = {backgroundColor: 'white', padding: 20};

    const handleAddNewHive = () => {
        onAddHive(newHiveName);
        onClose();
        resetHiveName();
    }

    const resetHiveName = () => setNewHiveName('');

    return (
        <Portal>
            <Modal 
                style={styles(theme).modal}
                testID='test-modal'
                visible={isVisible}
                onDismiss={onClose} 
                contentContainerStyle={containerStyle}
      
            >
                <IconButton 
                    style={styles(theme).closeButton}
                    icon='close'
                    iconColor='black'
                    onPress={onClose}
                />
                 <Text 
                    variant='headlineLarge' 
                    style={styles(theme).modalTitle}
                >
                    {title}
                </Text>
                <View style={styles(theme).modalContent}>
                    <TextInput
                        label='Hive Name'
                        value={newHiveName}
                        onChangeText={setNewHiveName}
                    />
                    <Button mode='contained' onPress={handleAddNewHive}>
                        Add Hive
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};

export default AddHiveModal;