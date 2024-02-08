import React from 'react';
import { Button } from 'react-native-paper';

interface AddHiveButtonProps {
    onAddHivePress: () => void;
}

const AddHiveButton = ({ onAddHivePress }: AddHiveButtonProps) => {
    return (
        <Button icon='plus' mode='contained' onPress={onAddHivePress}>
            Add New Hive
        </Button>
    )
}

export default AddHiveButton;