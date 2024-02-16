import React, { useState, useContext } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { Button, useTheme, Text, Switch } from "react-native-paper";
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { MobXProviderContext } from "mobx-react";
import { View, StyleSheet } from 'react-native';
import styles from '@/assets/styles';

interface Hive {
    id: string
    name: string
}

interface HiveListProps {
    navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const HiveList = ({ navigation }: HiveListProps) => {
    const { hiveViewModel } = useContext(MobXProviderContext);
    const [isGridView, setIsGridView] = useState(false);
    const theme = useTheme();

    const renderItem = ({ item }: { item: Hive }) => (
        <View style={styles(theme).hiveContainer}>
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
        </View>
    );

    return (
        <GestureHandlerRootView>
            <View style={styles(theme).toggleContainer}>
                <Switch value={isGridView} onValueChange={() => setIsGridView(!isGridView)} />
                <Text>{ isGridView ? "Detailed View" : "Simplified View"}</Text>
            </View>
            <FlatList 
                data={hiveViewModel.hives}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                key={isGridView ? 'grid' : 'list'}
                numColumns={isGridView ? 2 : 1}
            />
        </GestureHandlerRootView>
    );
};


export default HiveList;