import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";

import React from "react";
import { useTheme, Text, Switch } from "react-native-paper";
import { useContext, useEffect, useState } from "react";



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
const SwitchTheme = observer(() => {
    const theme = useTheme();
    const { userViewModel } = useContext(MobXProviderContext);


    const toggleTheme = () => {
        const newTheme = theme.dark ? "light" : "dark";
        userViewModel.setTheme(newTheme);
    };

    return (

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[theme.fonts.bodyLarge, { marginRight: 10 }]}>{userViewModel.i18n.t("switch light/dark mode")}: </Text>
            <Text style={theme.fonts.bodyLarge}>{theme.dark ? 'Dark' : 'Light'}</Text>
            <Switch
                value={theme.dark}
                onValueChange={toggleTheme}
            />
        </View>


    );
});
export default SwitchTheme;