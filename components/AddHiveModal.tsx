import React, { useState } from 'react';
import { useTheme } from "react-native-paper";
import { Modal, Portal, Button, TextInput } from 'react-native-paper';
import styles from "@/assets/styles";

interface AddHiveModalProps {
    isVisible: boolean
    onClose: () => void
    onAddHive: (hiveName: string) => void
}

const AddHiveModal = ({ isVisible, onClose, onAddHive }: AddHiveModalProps) => {
    const [newHiveName, setNewHiveName] = useState('');
    const theme = useTheme();

    const containerStyle = {backgroundColor: 'white', padding: 20};

    const handleAddNewHive = () => {
        onAddHive(newHiveName);
        onClose();
        resetHiveName();
    }

    const resetHiveName = () => setNewHiveName('');

    // TODO: Need to add some styling.
    return (
            <Modal 
            style={styles(theme).modal}
                testID='test-modal'
                visible={isVisible}
                onDismiss={onClose} 
                contentContainerStyle={containerStyle}
            >
                <TextInput
                    label='Hive Name'
                    value={newHiveName}
                    onChangeText={setNewHiveName}
                />
                <Button mode='contained' onPress={handleAddNewHive}>
                    Add Hive
                </Button>
            </Modal>
    );
};

export default AddHiveModal;