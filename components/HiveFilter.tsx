import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import HiveButton from "./AddHiveButton";
import styles from '@/assets/styles';


const HiveFilter = () => {
    const theme = useTheme();

    return (
        <View style={styles(theme).filterContainer}>
            <HiveButton 
                text="Add New Filter"
                mode="contained-tonal"
                width={140}
                spaceV={5}
                onHivePress={() => {}}
            />
            <Text style={theme.fonts.bodyLarge}>
                All Hives
            </Text>
        </View>
    );
};

export default HiveFilter;