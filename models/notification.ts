import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export interface NotificationModalProps {
    isOverlayModalVisible: boolean;
    bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
    onClose: () => void;
    onSave: (newValue: string) => void;
    parameterName: string;
}

export interface ModalContentProps extends NotificationModalProps {
    onSave: (newValue: any) => void;
}
