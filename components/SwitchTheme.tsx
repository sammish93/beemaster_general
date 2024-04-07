import * as React from "react";
import { View } from "react-native";
import { useTheme, Text, Switch } from "react-native-paper";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";


/**
 * A functional component that provides a UI toggle for switching between light and dark themes.
 * 
 * The component displays a row with text indicating the current theme ("Light" or "Dark")
 * and a switch toggle. 
 * Toggling the switch invokes the `toggleTheme` function, which
 * determines the new theme based on the current theme's `dark` property and updates the
 * application's theme accordingly.
 * 
 * 
*/
const SwitchTheme = () => {
    const { userViewModel } = useContext(MobXProviderContext);
    const theme = useTheme();

    const isDarkTheme = theme.dark;

    const toggleTheme = () => {
        const newTheme = isDarkTheme ? "light" : "dark";
        userViewModel.setTheme(newTheme);
    };
    const switchLabel = userViewModel.i18n.t("switch between light or dark mode");

    return (
        <>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={theme.fonts.bodyLarge}>{switchLabel} : </Text>
                <Text style={theme.fonts.bodyLarge}>{isDarkTheme ? 'Dark' : 'Light'}</Text>
                <Switch
                    value={isDarkTheme}
                    onValueChange={toggleTheme}
                />
            </View>
        </>
    );
};
export default SwitchTheme;