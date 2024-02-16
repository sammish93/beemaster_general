import styles from "@/assets/styles";
import { MobXProviderContext } from "mobx-react";
import React, { useContext, useState } from "react";
import { Switch, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import AddHiveButton from "./AddHiveButton";
import AddHiveModal from "./AddHiveModal";
import HiveList from "./hiveList/HiveList";
import { HiveListProps } from "./hiveList/HiveList";

const Hives = ({ navigation }: HiveListProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { hiveViewModel } = useContext(MobXProviderContext);
    const [isListView, setIsListView] = useState(false);
    const theme = useTheme();

    const handleAddHive = (hiveName: string) => {
        const newHiveId = `hive-${Date.now()}`; // Temporarly solution.
        hiveViewModel.addHive({ id: newHiveId, name: hiveName });
        setModalVisible(false);
      }
    
    return (
        <View>
            <View style={styles(theme).toggleContainer}>
                <Switch value={isListView} onValueChange={() => setIsListView(!isListView)} />
                <Text style={{ color: "white"}}>{ isListView ? "Detailed View" : "Simplified View"}</Text>
            </View>
            <HiveList isListView={isListView} navigation={navigation} />
            <AddHiveButton onAddHivePress={() => setModalVisible(true)}/>
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