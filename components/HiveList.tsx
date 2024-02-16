import React, { useState, useContext } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { Button, useTheme, Text, Switch, MD3Theme } from "react-native-paper";
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { MobXProviderContext } from "mobx-react";
import { View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { customLightTheme } from "../assets/themes"

interface Hive {
    id: string
    name: string
}

export interface HiveListProps {
    isListView: boolean
    navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const HiveList = ({ isListView, navigation }: HiveListProps) => {
    const { hiveViewModel } = useContext(MobXProviderContext);
    const theme = useTheme();
    const screenHeight = Dimensions.get("window").height / 2; 

    const renderItem = ({ item }: { item: Hive }) => (
        <View style={styles(isListView, theme).hiveContainer}>
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
            <FlatList 
                style={{maxHeight: screenHeight}}
                data={hiveViewModel.hives}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                key={isListView ? 'list' : 'grid'}
                numColumns={isListView ? 1 : 2}
            />
        </GestureHandlerRootView>
    );
};


const styles = (isListView: boolean, theme?: MD3Theme) => {
    const dynamicTheme = theme ? theme : customLightTheme

    return StyleSheet.create({
        hiveContainer: {
            backgroundColor: dynamicTheme.colors.secondaryContainer,
            maxWidth: isListView ? "100%" : "50%",
            margin: 6,
            gap: 12,
            flex: 1,
            padding: 10,
            borderRadius: 10,
          }
    })

} 

export default HiveList;