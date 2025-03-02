import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  getStepCount(): number; // ✅ 동기 호출 지원
  startListeningToSteps(): void; // ✅ 걸음 수 업데이트 이벤트 시작
  startService(): void; // ✅ 백그라운드 서비스 시작
}

export default TurboModuleRegistry.getEnforcing<Spec>("NativeStepCounter");
