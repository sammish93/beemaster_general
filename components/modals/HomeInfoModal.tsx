import { useContext, useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";

interface HomeInfoModalProps {
  isOverlayModalVisible: boolean;
  onClose: () => void;
}

interface ModalContentProps {
  onClose: () => void;
}

const HomeInfoModal = (props: HomeInfoModalProps) => {
  return (
    <OverlayModal
      isOverlayModalVisible={props.isOverlayModalVisible}
      onClose={props.onClose}
    >
      <ModalContent onClose={props.onClose} />
    </OverlayModal>
  );
};

const ModalContent = (props: ModalContentProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ ...theme.fonts.headlineSmall, flex: 1 }}>
          {userViewModel.i18n.t("information")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <View>
        <Text style={theme.fonts.bodyLarge}>
          Click the 'Add new hive' button to get started adding your beehive.
          You must give your hive a name and specify where it is located. The
          location allows the application to retrieve weather forecasts to
          better inform you on important events such as strong winds or an early
          snowfall.
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          Once you have added your hive you can choose to view your hives with
          even more detail - simply click on the switch at the top of the screen
          to toggle from simplified to detailed view.
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>Simplified view here</Text>
        <Text style={theme.fonts.bodyLarge}>Detailed view here</Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          Do you have many hives and are struggling to remember exact
          specifications about each of them? Filters provide functionality so
          that you can better organise which hives appear on this screen. Simply
          click on the 'Add new filter' button and give your filter a name. Once
          your filter is added you can add a filter to a hive of your choosing,
          either by a long press on the hive, or by clicking on the 'Modify hive
          filters' button on a hive's settings page. From there on you can click
          your filter at the top of this page and it will filter out all hives
          that don't include said filter.
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          Tip: You can use filters for many uses. Try using filters to organise
          your hives by geographical location, whether the hive has been
          harvested this season, or even if they have signs of disease.
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          Finally, click on a hive to visit a screen that displays even more
          information - here you'll find detailed weather forecasts, sensor
          data, notes, and much more.
        </Text>
      </View>
    </>
  );
};

export default HomeInfoModal;
