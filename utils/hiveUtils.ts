// File for hive related logic.

export const addHive = (
    hiveViewModel: any, 
    setModalVisible: (visible: boolean) => void, 
    hiveName: string
) => {
    const newHiveId = `hive-${Date.now()}`; 
    hiveViewModel.addHive({ id: newHiveId, name: hiveName });
    setModalVisible(false);
};

// TODO: Implement later.
export const removeHive = () => {}