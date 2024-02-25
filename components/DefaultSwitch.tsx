import * as React from 'react';
import { Switch, useTheme } from 'react-native-paper';
import { Text, View } from 'react-native';


type Type = 'snow' | 'potential swarm' | 'mobile' | 'sms' | 'email';
interface PermissionSwitchProps {
    type: Type;
}
const DefaultSwitchComponent = ({ type }: PermissionSwitchProps) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const paperTheme = useTheme();


    return (
        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Text style={[paperTheme.fonts.bodyMedium, { marginRight: 10, color: paperTheme.colors.onSurface }]}>
                    {type === 'snow' ? 'Snow' : type === 'potential swarm' ? 'Potential Swarm' : type === 'mobile' ? 'Mobile' : type === 'sms' ? 'SMS' : 'Email'}
                </Text>

                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
        </View >)
};

export default DefaultSwitchComponent;