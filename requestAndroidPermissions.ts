import { PermissionsAndroid, Platform } from "react-native";

export const requestAndroidPermissions = async () => {
  if (Platform.OS !== "android") return true;

  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION, // ✅ 걸음 센서 사용 권한
    ]);

    return (
      granted[PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION] === PermissionsAndroid.RESULTS.GRANTED 
    );
  } catch (err) {
    console.warn("권한 요청 중 오류 발생:", err);
    return false;
  }
};
