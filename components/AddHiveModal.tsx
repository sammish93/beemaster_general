import React, { useState } from 'react';
import { Modal, Portal, Button, TextInput } from 'react-native-paper';

interface AddHiveModalProps {
    isVisible: boolean
    onClose: () => void
}

const AddHiveModal = ({ isVisible, onClose }: AddHiveModalProps) => {
    const [newHiveName, setNewHiveName] = useState('');

    const handleAddNewHive = () => {
        console.log(`Added new hive with name: ${newHiveName}`);
        onClose();
        resetHiveName();
    }

    const resetHiveName = () => setNewHiveName('');

    return (
        <Portal>
            <Modal visible={isVisible} onDismiss={onClose} contentContainerStyle={{padding: 20, backgroundColor: 'white'}}>
                <TextInput
                    label='Hive Name:'
                    value={newHiveName}
                    onChangeText={setNewHiveName}
                    autoFocus
                />
                <Button onPress={handleAddNewHive}>
                    Add Hive
                </Button>
            </Modal>
        </Portal>
    )
}