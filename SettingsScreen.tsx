import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet, Platform, Alert, NativeModules } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { enableScreens } from 'react-native-screens';
enableScreens();

type SettingsStackParamList = {
  A1: undefined;
  A2: undefined;
  Settings: undefined;
  Modal: undefined;
};

type A1ScreenProps = NativeStackScreenProps<SettingsStackParamList, "A1">;
type A2ScreenProps = NativeStackScreenProps<SettingsStackParamList, "A2">;
type SettingsScreenProps = NativeStackScreenProps<SettingsStackParamList, "Settings">;
type ModalProps = NativeStackScreenProps<SettingsStackParamList, "Modal">;


function FullScreenModal({ navigation }: ModalProps) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
      <Text>이것은 풀화면 모달입니다!</Text>
      <Button title="닫기" onPress={() => navigation.goBack()} />
    </View>
  );
}


function A1Screen({ navigation }: A1ScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>현재화면 : A1Screen</Text>
      <Button title="다음 (A2Screen)" onPress={() => navigation.navigate("A2")} />
    </View>
  );
}

function A2Screen({ navigation }: A2ScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>현재화면 : A2Screen</Text>
      <Button title="닫기" onPress={() => navigation.popToTop()} />
    </View>
  );
}

function SettingsScreen({ navigation }: SettingsScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const openComposeScreen = () => {
    if (Platform.OS === 'android') {
      NativeModules.IntentLauncher.startActivityByName('com.rnwalk.HelloComposeActivity');
    } else {
      Alert.alert('Compose는 Android에서만 볼 수 있어요!');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 10 }}>
      <Text>Settings Screen 111</Text>
      <Button title="Hello Compose 열기" onPress={openComposeScreen} />
      <Button title="A1Screen 화면으로 이동" onPress={() => navigation.navigate("A1")} />
      <Button title="풀화면 다이얼로그(Modal) 열기" onPress={() => setModalVisible(true)} />
      <Button title="풀화면 다이얼로그(Stack.Screen) 열기" onPress={() => navigation.navigate("Modal")} />
      <Modal
        animationType="slide" // 모달 애니메이션 (fade, slide, none 가능)
        transparent={false} // true로 설정하면 배경이 투명해짐
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.text}>이것은 풀화면 다이얼로그입니다!</Text>
          <Button title="닫기" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export function SettingsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="A1" component={A1Screen} />
      <Stack.Screen name="A2" component={A2Screen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Modal" component={FullScreenModal}
        options={{ 
          presentation: "modal", 
          headerShown: false ,
          animation: "slide_from_bottom"
          }} />
    </Stack.Navigator>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});