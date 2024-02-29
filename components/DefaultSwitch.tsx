import * as React from 'react';
import { Switch, useTheme } from 'react-native-paper';
import { Text, View } from 'react-native';
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";

type Type = 'mobile' | 'sms' | 'email';
interface PermissionSwitchProps {
    type: Type;

}
const DefaultSwitchComponent = ({ type }: PermissionSwitchProps) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const { userViewModel } = useContext(MobXProviderContext);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const paperTheme = useTheme();

    const translateType = (type: Type): string => {
        switch (type) {

            case 'mobile':
                return userViewModel.i18n.t('mobile');
            case 'sms':
                return userViewModel.i18n.t('SMS');
            case 'email':
                return userViewModel.i18n.t('email');
            default:
                return type;
        }
    };

    return (
        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Text style={[paperTheme.fonts.bodyMedium, { marginRight: 10, color: paperTheme.colors.onSurface }]}>
                    {translateType(type)}
                </Text>

                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
        </View >)
};

export default DefaultSwitchComponent;