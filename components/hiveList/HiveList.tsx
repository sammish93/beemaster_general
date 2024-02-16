import React, { useContext } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Button, useTheme, Text } from "react-native-paper";
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { MobXProviderContext } from 'mobx-react';
import { View, Dimensions } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import styles from './styles';

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
        <TouchableRipple 
            style={styles(isListView, theme).hiveContainer}
            onPress={() => navigation.navigate('/hive/index', {hiveId: item.id})}
        >
            <View>
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
        </TouchableRipple>
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


export default HiveList;