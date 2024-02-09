import React from 'react';
import { NavigationProp } from "@react-navigation/native";
import { Button, useTheme, Text } from "react-native-paper";
import { FlatList } from 'react-native-gesture-handler';

interface Hive {
    id: string
    name: string
}

interface HiveListProps {
    navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const HiveList = ({ navigation }: HiveListProps) => {
    const theme = useTheme();

    // Just a temporary solution.
    const hives: Hive[] = [{id: "hive-1234-1234-abc", name: "Hooney Beast"}, {id: "hive-1235-1235-abc", name: "Hooney Warrior"}];

    const renderItem = ({ item }: { item: Hive }) => (
        <>
            <Text style={theme.fonts.bodyLarge}>Name: {item.name}</Text>
            <Text style={theme.fonts.bodyLarge}>Hive ID: {item.id}</Text>
            <Button
                mode="contained"
                onPress={() => {
                    navigation.navigate("/hive/forecast", { hiveId: item.id });
                }}
            >
                Forecast
            </Button>
        </>
    );

    return (
        <FlatList 
            data={hives}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
};

export default HiveList;