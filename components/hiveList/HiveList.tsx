import React, { useContext } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Button, useTheme, Text } from "react-native-paper";
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { MobXProviderContext } from 'mobx-react';
import { View, Dimensions } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import styles from './styles';
import { HiveModel } from '@/models/hiveModel';
import HiveInfo from '../HiveInfo';

export interface HiveListProps {
    isListView: boolean
    navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const HiveList = ({ isListView, navigation }: HiveListProps) => {
    const { hiveViewModel } = useContext(MobXProviderContext);
    const theme = useTheme();
    const screenHeight = Dimensions.get("window").height / 2; 

    const renderItem = ({ item }: { item: HiveModel }) => (
        <TouchableRipple 
            style={styles(isListView, theme).hiveContainer}
            onPress={() => navigation.navigate('/hive/index', {hiveId: item.id})}
        >
            <View>
                <HiveInfo 
                    id={''}
                    name={item.name} 
                    weather={'Sunny'} 
                    wind={'4'} 
                    temprature={21} 
                    weight={57.6} 
                    humidity={54} 
                    precipitation={0.0} 
                />
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