import { View } from "react-native";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import React from "react";
import { useTheme, Text, Switch } from "react-native-paper";



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
    const paperTheme = useTheme();

    const { userViewModel } = useContext(MobXProviderContext);

    const toggleTheme = () => {
        const newTheme = paperTheme.dark ? "light" : "dark";
        userViewModel.setTheme(newTheme);
    };

    return (

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[paperTheme.fonts.bodyMedium, { marginRight: 10 }]}>Switch light/dark mode: </Text>
            <Text>{paperTheme.dark ? 'Dark' : 'Light'}</Text>
            <Switch
                value={paperTheme.dark}
                onValueChange={toggleTheme}
            />
        </View>


    );
};

export default SwitchTheme;