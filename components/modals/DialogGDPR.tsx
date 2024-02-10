import * as React from 'react';
import { Button, Dialog, Portal, Text as PaperText } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import getStyles from '@/assets/styles';

interface DialogGDPRProps {
    hideDialog: () => void;

}

const DialogGDPR = ({ hideDialog }: DialogGDPRProps) => {
    const dynamicStyles = getStyles();
    return (
        <Portal>
            <View style={dynamicStyles.centeredViewGDPR}>
                <Dialog style={dynamicStyles.dialogStyle} visible={true} onDismiss={hideDialog}>
                    <Dialog.Icon icon="alert" />
                    <Dialog.Title style={dynamicStyles.titleDialogGDPR} >Welcome to the Beemaster General App</Dialog.Title>
                    <Dialog.Content>
                        <PaperText>GDPR Information and Terms of Use</PaperText>
                        <Dialog.ScrollArea>
                            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                                <PaperText>{

                                    `
                                - Data controller: Group/HiØ\n
                                - The purpose of the processing of personal data: Clearly explain why you collect personal data, for example to improve services, customize the user experience, or for marketing purposes. -Legal basis for the processing:....\n
                                - Third parties who may receive personal data: such as subcontractors, cloud services, marketing partners, etc.\n
                                - Storage period: Describe how long the personal data will be stored.\n
                                - The rights of the data subject: Inform users about their rights under GDPR, such as the right to request access to, correction or deletion of the personal data stored about them, the right to object to processing, and the right to data portability.\n
                                - The right to withdraw consent:....\n
                                - The right to lodge a complaint with a supervisory authority: Provide information on how and to whom users can complain if they believe the processing of their personal data violates GDPR.\n
                            `}
                                </PaperText>
                            </ScrollView>
                        </Dialog.ScrollArea>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={() => console.log('Ok pressed')}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        </Portal>
    );
};


export default DialogGDPR;