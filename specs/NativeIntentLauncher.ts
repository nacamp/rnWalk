import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  startActivityByName(activityName: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>("NativeIntentLauncher");