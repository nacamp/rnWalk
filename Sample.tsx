// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import { useStepCounter } from './useStepCounter';

// const StepCounterComponent = () => {
//   const [steps, setSteps] = useState(0);

//   useEffect(() => {
//     setSteps(useStepCounter());
//   }, []);

//   return (
//     <View>
//       <Text>현재 걸음 수: {steps}</Text>
//     </View>
//   );
// };

// export default StepCounterComponent;

// case: NativeLocalStorage
// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   Button,
// } from 'react-native';

// import NativeLocalStorage from './specs/NativeLocalStorage';

// const EMPTY = '<empty>';

// function App(): React.JSX.Element {
//   const [value, setValue] = React.useState<string | null>(null);

//   const [editingValue, setEditingValue] = React.useState<
//     string | null
//   >(null);

//   React.useEffect(() => {
//     const storedValue = NativeLocalStorage?.getItem('myKey');
//     setValue(storedValue ?? '');
//   }, []);

//   function saveValue() {
//     NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
//     setValue(editingValue);
//   }

//   function clearAll() {
//     NativeLocalStorage?.clear();
//     setValue('');
//   }

//   function deleteValue() {
//     NativeLocalStorage?.removeItem('myKey');
//     setValue('');
//   }

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Text style={styles.text}>
//         Current stored value is: {value ?? 'No Value'}
//       </Text>
//       <TextInput
//         placeholder="Enter the text you want to store"
//         style={styles.textInput}
//         onChangeText={setEditingValue}
//       />
//       <Button title="Save" onPress={saveValue} />
//       <Button title="Delete" onPress={deleteValue} />
//       <Button title="Clear" onPress={clearAll} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   text: {
//     margin: 10,
//     fontSize: 20,
//   },
//   textInput: {
//     margin: 10,
//     height: 40,
//     borderColor: 'black',
//     borderWidth: 1,
//     paddingLeft: 5,
//     paddingRight: 5,
//     borderRadius: 5,
//   },
// });

// export default App;



// import React from "react";
// import { SafeAreaView } from "react-native";
// import PermissionsScreen from "./PermissionsScreen";

// const App = () => {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <PermissionsScreen />
//     </SafeAreaView>
//   );
// };

// export default App;



import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, NativeModules, Platform } from "react-native";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { useStepCounter } from "./useStepCounter";

const { NativeStepCounter } = NativeModules;

const requestAndroidPermissions = async () => {
  if (Platform.OS !== "android") return true;

  try {
    const granted = await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
    return granted === RESULTS.GRANTED;
  } catch (err) {
    console.warn("권한 요청 중 오류 발생:", err);
    return false;
  }
};

const StepCounterScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const steps = useStepCounter();

  useEffect(() => {
    const checkPermissionAndStart = async () => {
      const granted = await requestAndroidPermissions();
      setHasPermission(granted);

      if (granted) {
        NativeStepCounter.startService(); // ✅ Foreground Service 실행
      } else {
        Alert.alert("권한 필요", "걸음 수 데이터를 가져오려면 권한이 필요합니다.");
      }
    };

    checkPermissionAndStart();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>권한 확인 중...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>권한이 거부되었습니다.</Text>
        <Button title="권한 요청 다시 하기" onPress={async () => setHasPermission(await requestAndroidPermissions())} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>걸음 수: {steps}</Text>
    </View>
  );
};

export default StepCounterScreen;
