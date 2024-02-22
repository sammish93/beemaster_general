import { Button } from "react-native-paper";

interface AddHiveButtonProps {
    icon?: string
    mode?: string
    width?: number,
    spaceV?: number,
    text: string
    onHivePress: () => void;
}

const HiveButton = ({ icon, mode, width, spaceV, text, onHivePress }: AddHiveButtonProps) => {
    const customIcon = icon ? icon : 'plus';
    const customMode = mode ? mode : "contained";
    const customWidth = width ? width : "100%";
    const customMargin = spaceV ? spaceV : 10

    return (
        <Button 
            icon={customIcon} 
            mode={customMode}
            onPress={onHivePress} 
            style={{marginVertical: customMargin, width: customWidth}}
        >
            {text}
        </Button>
    );
};

export default HiveButton;