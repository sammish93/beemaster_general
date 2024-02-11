import * as React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { ScrollView, View, Platform } from 'react-native';
import getStyles from '@/assets/styles';
import { useTheme } from 'react-native-paper';

interface DialogGDPRProps {
    hideDialog: () => void;

}
const DialogGDPR = ({ hideDialog }: DialogGDPRProps) => {

    if (Platform.OS === "android" || Platform.OS === "ios") {
        return <MobileModal hideDialog={hideDialog} />;
    } else {
        return <WebModal hideDialog={hideDialog} />;
    }

};

const MobileModal = ({ hideDialog }: DialogGDPRProps) => {
    const dynamicStyles = getStyles();
    const theme = useTheme();

    return (
        <Portal>
            <Dialog style={dynamicStyles.dialogStyleMobile} visible={true} onDismiss={hideDialog}>
                <Dialog.Icon icon="alert" />
                <Dialog.Title style={dynamicStyles.titleDialogGDPR} >Welcome to the Beemaster General App</Dialog.Title>

                <Dialog.Content >
                    <Text style={theme.fonts.titleMedium}>GDPR Information and Terms of Use</Text>
                </Dialog.Content>
                <Dialog.ScrollArea >
                    <ScrollView contentContainerStyle={dynamicStyles.scrollViewContent}>

                        <Text style={dynamicStyles.listItem} > • Data controller: Group/HiØ</Text>
                        <Text style={dynamicStyles.listItem} > • The purpose of the processing of personal data: Clearly explain why you collect personal data, for example to improve services, customize the user experience, or for marketing purposes. </Text>
                        <Text style={dynamicStyles.listItem} > • Legal basis for the processing:....</Text>
                        <Text style={dynamicStyles.listItem} > • Third parties who may receive personal data: such as subcontractors, cloud services, marketing partners, etc.</Text>
                        <Text style={dynamicStyles.listItem} > • Storage period: Describe how long the personal data will be stored.</Text>
                        <Text style={dynamicStyles.listItem} > • The rights of the data subject: Inform users about their rights under GDPR, such as the right to request access to, correction or deletion of the personal data stored about them, the right to object to processing, and the right to data portability.</Text>
                        <Text style={dynamicStyles.listItem} > • The right to withdraw consent:....</Text>
                        <Text style={dynamicStyles.listItem} > • The right to lodge a complaint with a supervisory authority: Provide information on how and to whom users can complain if they believe the processing of their personal data violates GDPR.</Text >

                    </ScrollView>
                </Dialog.ScrollArea>


                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                    <Button onPress={() => console.log('Ok pressed')}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal >
    );
};

const WebModal = ({ hideDialog }: DialogGDPRProps) => {
    const dynamicStyles = getStyles();
    const theme = useTheme();

    return (
        <Portal>
            <Dialog style={dynamicStyles.dialogStyle} visible={true} onDismiss={hideDialog}>
                <Dialog.Icon icon="alert" />
                <Dialog.Title style={dynamicStyles.titleDialogGDPR} >Welcome to the Beemaster General App</Dialog.Title>
                <Dialog.Content>
                    <Text style={theme.fonts.titleMedium}>GDPR Information and Terms of Use</Text>
                </Dialog.Content>
                <Dialog.ScrollArea >
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}>
                        <Text style={dynamicStyles.listItem} > • Data controller: Group/HiØ</Text>
                        <Text style={dynamicStyles.listItem} > • The purpose of the processing of personal data: Clearly explain why you collect personal data, for example to improve services, customize the user experience, or for marketing purposes. </Text>
                        <Text style={dynamicStyles.listItem} > • Legal basis for the processing:....</Text>
                        <Text style={dynamicStyles.listItem} > • Third parties who may receive personal data: such as subcontractors, cloud services, marketing partners, etc.</Text>
                        <Text style={dynamicStyles.listItem} > • Storage period: Describe how long the personal data will be stored.</Text>
                        <Text style={dynamicStyles.listItem} > • The rights of the data subject: Inform users about their rights under GDPR, such as the right to request access to, correction or deletion of the personal data stored about them, the right to object to processing, and the right to data portability.</Text>
                        <Text style={dynamicStyles.listItem} > • The right to withdraw consent:....</Text>
                        <Text style={dynamicStyles.listItem} > • The right to lodge a complaint with a supervisory authority: Provide information on how and to whom users can complain if they believe the processing of their personal data violates GDPR.</Text >

                    </ScrollView>
                </Dialog.ScrollArea>

                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                    <Button onPress={() => console.log('Ok pressed')}>Ok</Button>
                </Dialog.Actions>
            </Dialog>

        </Portal>
    );
};





export default DialogGDPR;

/*                    */