import { requestAndroidPermissions } from "./requestAndroidPermissions";
import { Platform } from "react-native";

export const requestStepPermissions = async () => {
  if (Platform.OS === "android") {
    return await requestAndroidPermissions();
//   } else if (Platform.OS === "ios") {
//     return await requestIOSPermissions();
  }
  return false;
};
