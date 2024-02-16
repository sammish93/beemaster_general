import styles from "@/assets/styles";
import { MobXProviderContext } from "mobx-react";
import React, { useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import AddHiveButton from "./AddHiveButton";
import AddHiveModal from "./AddHiveModal";
import HiveList from "./HiveList";
import { HiveListProps } from "./HiveList";

const Hives = ({ navigation }: HiveListProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { hiveViewModel } = useContext(MobXProviderContext);
    const theme = useTheme();

    const handleAddHive = (hiveName: string) => {
        const newHiveId = `hive-${Date.now()}`; // Temporarly solution.
        hiveViewModel.addHive({ id: newHiveId, name: hiveName });
        setModalVisible(false);
      }
    
    return (
        <ScrollView>
            <View style={styles(theme).main}>
                <HiveList navigation={navigation} />
                <AddHiveButton onAddHivePress={() => setModalVisible(true)}/>
                <AddHiveModal 
                    isVisible={modalVisible}
                    title="Enter New Hive Information"
                    onClose={() => setModalVisible(false)}
                    onAddHive={handleAddHive}
                />
            </View>
      </ScrollView>
    );
};

export default Hives;