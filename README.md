# 정리

## TODO 
- react-native-safe-area-context


# reference
- https://github.com/jondot/awesome-react-native/blob/master/README.md

# dev
## navigation
- https://reactnative.dev/docs/0.76/navigation
- https://velog.io/@fejigu/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%99%94%EB%A9%B4-%EA%B4%80%EB%A6%AC-React-Navigation-React-Native-Navigation
- https://adjh54.tistory.com/202
### @react-navigation
- https://reactnavigation.org/docs/getting-started/
- 파라미터 타입
- https://reactnavigation.org/docs/typescript/
```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens # react-native-safe-area-context
# tab
npm install   @react-navigation/bottom-tabs
```
### react-native-navigation
- https://wix.github.io/react-native-navigation/docs/before-you-start


## operation

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
```

### install
- https://reactnative.dev/docs/getting-started-without-a-framework
```bash
npm uninstall -g react-native-cli @react-native-community/cli
npx @react-native-community/cli@latest init rnWalk
``