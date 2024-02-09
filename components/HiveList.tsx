import React, { useContext } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { Button, useTheme, Text } from "react-native-paper";
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { observer, MobXProviderContext } from "mobx-react";
import { View } from 'react-native';

interface Hive {
    id: string
    name: string
}

interface HiveListProps {
    navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const HiveList = ({ navigation }: HiveListProps) => {
    const theme = useTheme();
    const { hiveViewModel } = useContext(MobXProviderContext);

    const renderItem = ({ item }: { item: Hive }) => (
        <View style={{ marginVertical: 8}}>
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
                data={hiveViewModel.hives}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </GestureHandlerRootView>
    );
};

export default HiveList;