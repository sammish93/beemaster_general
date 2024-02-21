import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const HiveFilterButton = () => {

    return (
        <View>
            <Button 
                style={{ width: 150}}
                mode='contained-tonal' 
                icon='plus'
            >
                Add New Filter
            </Button>
        </View>
    );
};

export default HiveFilterButton;