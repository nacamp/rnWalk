# 정리

## TODO 
- ?


# reference
- https://github.com/jondot/awesome-react-native/blob/master/README.md
- https://reactnative.dev/docs/components-and-apis

# dev


## case: permission
- https://www.npmjs.com/package/react-native-permissions

## case: 상태바/노치/홈 인디케이터 양역관리
- react-native-safe-area-context
- https://appandflow.github.io/react-native-safe-area-context/

## case: native interface
### event pub/sub
- https://reactnative.dev/docs/legacy/native-modules-android
```kotlin
val steps: StateFlow<Int> get() = _steps
...
override fun startListeningToSteps() {
    StepCounterService.steps
        .onEach { stepCount ->
            sendEvent("onStepCountUpdate", stepCount)
        }
        .launchIn(scope)
}
private fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap?) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
}
```
```typescript
export const useStepCounter = () => {
  const [steps, setSteps] = useState(0);
  useEffect(() => {
    setSteps(NativeStepCounter.getStepCount());
    const subscription = stepEventEmitter.addListener("onStepCountUpdate", setSteps);
    NativeStepCounter.startListeningToSteps();
    return () => subscription.remove();
  }, []);\
  return steps;
};
```
### turbo module
- https://reactnative.dev/docs/turbo-native-modules-introduction?platforms=android
```js
//1. package.json
"codegenConfig": {
    "name": "NativeStepCounterSpec",
    "name1": "NativeLocalStorageSpec",
    "type": "modules",
    "jsSrcsDir": "specs",
    "android": {
      "javaPackageName": "com.rnwalk"
    }
},
// 여러개의 파일을 만들지 못해서, 기존 모듈은 name1으로 잠시 바꾸고 실행
```
```bash
// 2. 생성
cd android  && ./gradlew generateCodegenArtifactsFromSchema && cd ..
```
## case: native interface
### native modules(will be deprecated )
- https://reactnative.dev/docs/legacy/native-modules-android

## case: 화면 전환
### navigation
- https://reactnative.dev/docs/0.76/navigation
- https://velog.io/@fejigu/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%99%94%EB%A9%B4-%EA%B4%80%EB%A6%AC-React-Navigation-React-Native-Navigation
- https://adjh54.tistory.com/202
#### @react-navigation
- https://reactnavigation.org/docs/getting-started/
- 파라미터 타입
- https://reactnavigation.org/docs/typescript/
```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens # react-native-safe-area-context
# tab
npm install   @react-navigation/bottom-tabs
```
#### react-native-navigation
- https://wix.github.io/react-native-navigation/docs/before-you-start


## operation

## case: import com.facebook.react.PackageList 을 못찾으면
- https://github.com/facebook/react-native/issues/43426
```bash
npm run android 를 실행하면 보임
```

### case: JSI, turbo module 전달
```
1.ts spec 파일
2.codegen generate 하는 스크립트와
3.module, package 코드만 전달하면 되지 않을까?
```

### case: 배포
```bash
npx react-native start --reset-cache
cd android
mkdir -p app/src/main/assets
cd ..
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

### case: 휴대폰에 디버깅
```bash
# 휴대폰과 맥 장비가 같은  ap 를 참조
ifconfig
192.168.0.34

npx react-native start --host 192.168.0.34

# 폰에서 접속되는지 확인
http://192.168.0.34:8081

# 폰에서 디버깅 호스트 설정
adb devices
adb -s R5CW131CCHB shell input keyevent 82
Debug server host & port for device 메뉴를 클릭해서
192.168.0.34:8081 입력

커맨드라인에서 실행하는 방법
npx react-native run-android
```

### hot-key
- cmd + m   dev 메누 활성화

### react-native
- https://github.com/react-native-community/cli/blob/main/docs/commands.md
```bash
npx react-native start
npx react-native start --host 192.168.0.34
npx react-native run-android
```
### adb
- https://developer.android.com/tools/adb?hl=ko
```bash
adb devices
# dev tool 활성화
adb -s emulator-5554 shell input keyevent 82
# 앱종료
adb shell am force-stop com.rnwalk
```

### install
- https://reactnative.dev/docs/getting-started-without-a-framework
```bash
npm uninstall -g react-native-cli @react-native-community/cli
npx @react-native-community/cli@latest init rnWalk
``