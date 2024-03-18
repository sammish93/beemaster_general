import React from "react";
import { Platform } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import ModalContent from "./ModalContentNotification";
import { NotificationType } from "@/constants/Notifications";

interface NotificationModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
  onSave: (newValue: string) => void;
  parameterName?: NotificationType;
}

const NotificationModal = (props: NotificationModalProps) => {
  if (props.parameterName === null) {
    return null;
  }

  return (
    <>
      {Platform.OS === "android" || Platform.OS === "ios" ? (
        <BottomModal
          isOverlayModalVisible={props.isOverlayModalVisible}
          bottomSheetModalRef={props.bottomSheetModalRef}
          onClose={props.onClose}
        >
          <ModalContent {...props} />
        </BottomModal>
      ) : (
        <OverlayModal
          isOverlayModalVisible={props.isOverlayModalVisible}
          bottomSheetModalRef={props.bottomSheetModalRef}
          onClose={props.onClose}
        >
          <ModalContent {...props} />
        </OverlayModal>
      )}
    </>
  );
};
export default NotificationModal;
