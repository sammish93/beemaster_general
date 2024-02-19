import { View } from "react-native";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import React from "react";
import { useTheme, Text, Switch } from "react-native-paper";



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