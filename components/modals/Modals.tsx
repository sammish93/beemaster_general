import styles from "@/assets/styles";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Keyboard, Platform, ScrollView } from "react-native";
import { Modal, Portal, useTheme } from "react-native-paper";

interface ModalProps {
  isOverlayModalVisible?: boolean;
  bottomSheetModalRef?: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
  children: ReactNode;
}

/**
 * A modal component to create an overlay over the current screen.
 * @param isOverlayModalVisible Optional parameter of type boolean. Used when overlay modal functionality
 * is present.
 * @param bottomSheetModalRef Optional parameter of type useRef<BottomSheetModal>. Used when bottom sheet
 * modal functionality is present.
 * @param onClose A function that handles how the modal will close.
 * @param children The content of the modal.
 * @returns Returns an overlay modal with child components.
 * @example
 * // Include these in the modal's parent comonent
 * const [modalVisible, setModalVisible] = useState(false);
 *
 * const handleCloseModal = () => {
 *     if (Platform.OS === "android" || Platform.OS === "ios") {
 *         // Mobile solution.
 *     } else {
 *         setModalVisible(false);
 *     }
 * };
 *
 * const handleOpenModal = () => {
 *     if (Platform.OS === "android" || Platform.OS === "ios") {
 *         // Mobile solution.
 *     } else {
 *         setModalVisible(true);
 *     }
 * };
 *
 * // Create a component that will be able to open the modal.
 * <Button onPress={handleOpenModal}>Click to open modal</Button>
 * // Create a modal that implements this component.
 * // This allows the implementation of other modals for other platforms.
 * <ExampleModal
 *     isWebModalVisible={modalVisible}
 *     // In case the modal will have different behaviour for mobile devices.
 *     mobileModalRef={bottomSheetModalRef}
 *     onClose={() => handleCloseModal()}
 * />
 */
export const OverlayModal = (props: ModalProps) => {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        style={styles(theme).overlayModal}
        testID="test-modal"
        visible={
          props.isOverlayModalVisible ? props.isOverlayModalVisible : false
        }
        onDismiss={props.onClose}
        contentContainerStyle={styles(theme).overlayContainer}
      >
        <ScrollView contentContainerStyle={styles(theme).overlayScrollView}>
          {props.children}
        </ScrollView>
      </Modal>
    </Portal>
  );
};

// NOTE: There's a bug with 'enableDynamicSizing' and keyboard behaviour on android. I implemented
// fix recommendations from here: https://github.com/gorhom/react-native-bottom-sheet/issues/1602#issuecomment-1916774449
/**
 * A modal component to create a bottom sheet over the current screen.
 * @param isOverlayModalVisible Optional parameter of type boolean. Used when overlay modal functionality
 * is present.
 * @param bottomSheetModalRef Optional parameter of type useRef<BottomSheetModal>. Used when bottom sheet
 * modal functionality is present.
 * @param onClose A function that handles how the modal will close.
 * @param children The content of the modal.
 * @returns Returns a bottom sheet modal with child components.
 * @example
 * // Include these in the modal's parent comonent
 * const bottomSheetModalRef = useRef<BottomSheetModal>(null);
 *
 * const bottomSheetModalRef = useRef<BottomSheetModal>(null);
 *     const handleModalSheetPressOpen = useCallback(() => {
 *     bottomSheetModalRef.current?.present();
 * }, []);
 *
 * const handleModalSheetPressClose = useCallback(() => {
 *     bottomSheetModalRef.current?.dismiss();
 * }, []);
 *
 * const handleCloseModal = () => {
 *     if (Platform.OS === "android" || Platform.OS === "ios") {
 *         handleModalSheetPressClose();
 *     } else {
 *        // Web solution.
 *     }
 * };
 *
 * const handleOpenModal = () => {
 *     if (Platform.OS === "android" || Platform.OS === "ios") {
 *         handleModalSheetPressOpen();
 *     } else {
 *         // Web solution.
 *     }
 * };
 *
 * // Create a component that will be able to open the modal.
 * <Button onPress={handleOpenModal}>Click to open modal</Button>
 * // Create a modal that implements this component.
 * // This allows the implementation of other modals for other platforms.
 * <ExampleModal
 *     // In case the modal will have different behaviour for web.
 *     isWebModalVisible={modalVisible}
 *     mobileModalRef={bottomSheetModalRef}
 *     onClose={() => handleCloseModal()}
 * />
 */
export const BottomModal = (props: ModalProps) => {
  const theme = useTheme();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [enableDismissOnClose, setEnableDismissOnClose] = useState(true);

  // Variables required for the modal bottom sheet
  // The percentage of screen height that the bottom sheet snaps to (starts at whatever the index is set to).
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // Allows behaviour on bottom sheet appearing/being dismissed.
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) null; // Sheet closing behaviour.
    else if (index === 1) null; // Sheet opening behaviour.
  }, []);

  // Code used to fix Android bug with keyboard overlay and bottom sheets.
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        onPress={() => {
          if (!enableDismissOnClose && keyboardOpen) {
            setEnableDismissOnClose(true);
          }
          props.mobileModalRef.current?.close();
        }}
      />
    ),
    [enableDismissOnClose, props.onClose, keyboardOpen]
  );

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardOpen(true)
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardOpen(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    setEnableDismissOnClose(!keyboardOpen);
  }, [keyboardOpen]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={props.bottomSheetModalRef}
        enableDynamicSizing={true}
        enableDismissOnClose={enableDismissOnClose}
        backdropComponent={renderBackdrop}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={styles(theme).bottomSheet}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles(theme).bottomSheetScrollContainer}
        >
          {props.children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
