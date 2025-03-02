// import { NativeModules } from 'react-native';

// const { StepCounter } = NativeModules;

// export const useStepCounter = () => {
//   if (!StepCounter) {
//     console.error("⚠️ StepCounter 모듈을 찾을 수 없음!");
//     return 0;
//   }
//   return StepCounter.getStepCount();
// };


import { useEffect, useState } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";

const { NativeStepCounter } = NativeModules;
const stepEventEmitter = new NativeEventEmitter(NativeStepCounter);

export const useStepCounter = () => {
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    // 초기 걸음 수 가져오기
    setSteps(NativeStepCounter.getStepCount());

    // 실시간 업데이트 구독
    const subscription = stepEventEmitter.addListener("onStepCountUpdate", setSteps);

    // 네이티브에서 이벤트 전송 시작
    NativeStepCounter.startListeningToSteps();

    return () => subscription.remove();
  }, []);

  return steps;
};
