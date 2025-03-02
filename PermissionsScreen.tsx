import React, { useState } from "react";
import { View, Text, Button, Alert, NativeModules } from "react-native";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Platform } from "react-native";

const { NativeStepCounter } = NativeModules; // ✅ 네이티브 모듈 가져오기

export const requestAndroidPermissions = async () => {
  if (Platform.OS !== "android") return true;

  try {
    const granted = await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);

    return granted === RESULTS.GRANTED;
  } catch (err) {
    console.warn("권한 요청 중 오류 발생:", err);
    return false;
  }
};

const PermissionsScreen = () => {
  const [granted, setGranted] = useState(false);

  const handlePermissionRequest = async () => {
    const isGranted = await requestAndroidPermissions();
    setGranted(isGranted);

    if (isGranted) {
      Alert.alert("권한 승인됨", "이제 걸음 수 데이터를 사용할 수 있습니다!");
      NativeStepCounter.startService(); // ✅ 권한 승인 후 Foreground Service 실행
    } else {
      Alert.alert("권한 거부됨", "앱 설정에서 권한을 활성화하세요.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>걸음 수 데이터를 사용하려면 권한을 승인하세요.</Text>
      <Button title="권한 요청" onPress={handlePermissionRequest} />
      {granted && <Text>✅ 모든 권한이 승인되었습니다!</Text>}
    </View>
  );
};

export default PermissionsScreen;
