import React from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { enableScreens } from 'react-native-screens';
enableScreens();

type SettingsStackParamList = {
  A1: undefined;
  A2: undefined;
  Settings: undefined;
};

type A1ScreenProps = NativeStackScreenProps<SettingsStackParamList, "A1">;
type A2ScreenProps = NativeStackScreenProps<SettingsStackParamList, "A2">;
type SettingsScreenProps = NativeStackScreenProps<SettingsStackParamList, "Settings">;

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
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Button title="A1Screen 화면으로 이동" onPress={() => navigation.navigate("A1")} />
    </View>
  );
}

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export function SettingsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="A1" component={A1Screen} />
      <Stack.Screen name="A2" component={A2Screen} />
      <Stack.Screen name="Settings" component={SettingsScreen}  />
    </Stack.Navigator>
  );
}