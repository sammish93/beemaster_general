import { Platform } from "react-native";

export const isPlatformMobile = (): boolean => {
    switch (Platform.OS) {
        case "android":
            return true
        case "ios":
            return true
        default:
            return false
    }
}