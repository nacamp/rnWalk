import { NativeModules } from 'react-native';

const { StepCounter } = NativeModules;

export const useStepCounter = () => {
  if (!StepCounter) {
    console.error("⚠️ StepCounter 모듈을 찾을 수 없음!");
    return 0;
  }
  return StepCounter.getStepCount();
};
