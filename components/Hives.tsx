import styles from "@/assets/styles";
import { MobXProviderContext } from "mobx-react";
import React, { useContext, useState } from "react";
import { Switch, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import HiveButton from "./AddHiveButton";
import AddHiveModal from "./AddHiveModal";
import HiveList from "./hiveList/HiveList";
import { HiveListProps } from "./hiveList/HiveList";
import { addHive } from "@/utils/hiveUtils";

const Hives = ({ navigation }: HiveListProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { hiveViewModel } = useContext(MobXProviderContext);
    const [isListView, setIsListView] = useState(false);
    const theme = useTheme();
    const handleAddHive = (hiveName: string) => addHive(hiveViewModel, setModalVisible, hiveName);
    
    return (
        <View>
            <HiveButton 
                text="Add New Filter"
                mode="contained-tonal"
                width={140}
                spaceV={5}
            />
            
            <View style={styles(theme).toggleContainer}>
                <Switch value={isListView} onValueChange={() => setIsListView(!isListView)} />
                <Text style={{ color: "white"}}>{ isListView ? "Detailed View" : "Simplified View"}</Text>
            </View>
            <HiveList isListView={isListView} navigation={navigation} />
            <HiveButton text="Add New Hive" onAddHivePress={() => setModalVisible(true)}/>
            <AddHiveModal 
                isVisible={modalVisible}
                title="Enter New Hive Information"
                onClose={() => setModalVisible(false)}
                onAddHive={handleAddHive}
            />
        </View>
    );
};

export default Hives;