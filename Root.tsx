import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import App from "./App";
import {SettingsStackNavigator} from "./SettingsScreen";

// 하단 탭 네비게이터 생성
const Tab = createBottomTabNavigator();

export default function Root() {
  return (
    <NavigationContainer>
      <Tab.Navigator  screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={App} />
        <Tab.Screen name="Settings" component={SettingsStackNavigator} />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true }} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}