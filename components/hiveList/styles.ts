import { MD3Theme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { customLightTheme } from "../../assets/themes"

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

export default styles;