import React, { useRef, useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Animated,
  ImageBackground,
  Button,
  Alert,
  Platform,
  NativeModules
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { useStepCounter } from "./useStepCounter";

const { NativeStepCounter } = NativeModules;

const requestPermissions = async () => {
  if (Platform.OS !== "android") return true;

  try {
    const granted = await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
    return granted === RESULTS.GRANTED;
  } catch (err) {
    console.warn("권한 요청 중 오류 발생:", err);
    return false;
  }
};

type SectionProps = PropsWithChildren<{
  title: string;
  noPadding?: boolean;
}>;

const Section = ({ children, title, noPadding = false }: SectionProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  if (noPadding) {
    // ✅ noPadding이 true라면 기존 스타일을 무시하고 새로운 View 사용
    return (
      <View style={[styles.sectionContainer, { paddingHorizontal: 0, padding: 0 }]}>
        {children}
      </View>
    );
  }
  return (
    <View style={[styles.sectionContainer]}>
      {title && (
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? 'white' : 'black' },
          ]}>
          {title}
        </Text>
      )}
      <View
        style={[
          styles.sectionDescription]}
      >
        {children}
      </View>
    </View>
  );
}

type TdoayActionCardProps = {
  title: string;
  category: string;
};

const TdoayActionCard = ({ title, category }: TdoayActionCardProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        //flex: 1, // 이걸 사용하면 목록이 2개부터 글씨가 짤림
        width: "100%",
        // paddingHorizontal: 10,
        // paddingVertical: 20,
        // borderWidth: 1,
        // borderColor: "#ddd",
        // borderStyle: "solid",
        // alignSelf: "stretch",
      }}
    >
      {/* ✅ 왼쪽 이미지 */}
      <ImageBackground
        style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden" }}
        source={{ uri: "https://picsum.photos/50/50" }}
        resizeMode="cover"
      />

      {/* ✅ 가운데 텍스트 (줄바꿈 가능) */}
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',

        flex: 1,
        paddingLeft: 5,
      }}>
        <View style={{
          // alignSelf: "stretch",
          // borderWidth: 1,
          // borderColor: "#ddd",
          // borderStyle: "solid",
        }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: "left",
              //flexWrap: "wrap", // ✅ 긴 텍스트 자동 줄바꿈
              //minWidth: 100, // ✅ 최소 너비 유지
              //marginHorizontal: 10,
              //paddingVertical: 20,
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
        </View>
        <View style={{

        }}>
          <Text
            style={{
              fontSize: 12,
              textAlign: "left",
              //flexWrap: "wrap", // ✅ 긴 텍스트 자동 줄바꿈
              //minWidth: 100, // ✅ 최소 너비 유지
              //marginHorizontal: 10,
            }}
          >
            {category}
          </Text>
        </View>
      </View>
      {/* ✅ 오른쪽 이미지 (위치 고정) */}
      <ImageBackground
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          overflow: "hidden",
        }}
        source={{ uri: "https://picsum.photos/50/50" }}
        resizeMode="cover"
      />
    </View>
  );
}
const ChattingCard = () => {
  return (
    <View style={{
      width: "100%",
      height: 150,
      position: "relative",
    }}>
      <ImageBackground
        source={{ uri: "https://picsum.photos/300/200" }}
        style={{ ...StyleSheet.absoluteFillObject }}
        resizeMode="cover"
      >
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(155, 248, 155, 0.5)" }} />
      </ImageBackground>
      <View style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        flex: 1,
        gap: 10,
        paddingHorizontal: 20,
      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "black",
        }}>
          메세지를 남겨 보세요
        </Text>
        <Text style={{
          fontSize: 25,
          color: "black",
        }}>
          상담실
        </Text>
        <Text style={{
          fontSize: 22,
          color: "black",
          fontWeight: "bold",
        }}>
          운영시간 9시 ~ 6시
        </Text>
      </View>
    </View>
  );
}

type ProgressBarProps = {
  currentValue: number;
  maxValue: number;
};
const ProgressBar = ({ currentValue, maxValue }: ProgressBarProps) => {
  // 0~100%의 비율을 계산
  const progressPercentage = (currentValue / maxValue) * 100;
  const marker4000Percentage = (4000 / maxValue) * 100;
  const marker10000Percentage = 100; // 항상 100% 위치

  return (
    <View style={{ width: "100%", alignItems: "center", marginVertical: 10 }}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 20,
          position: "relative",
          paddingHorizontal: 5,
        }}
      >
        <Text style={{ fontSize: 12, color: "#333", position: "absolute", left: `${marker4000Percentage}%`, transform: [{ translateX: -10 }] }}>
          4,000
        </Text>
        <Text style={{ fontSize: 12, color: "#333", position: "absolute", right: 0 }}>
          10,000
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          height: 15,
          backgroundColor: "#ddd",
          borderRadius: 10,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${progressPercentage}%`,
            height: "100%",
            backgroundColor: "#72caa5",
            borderRadius: 10,
          }}
        />
        <View
          style={{
            position: "absolute",
            width: 10,
            height: "100%",
            backgroundColor: "#72caa5",
            left: `${marker4000Percentage}%`,
            transform: [{ translateX: -5 }], // 중앙 정렬
          }}
        />
        <View
          style={{
            position: "absolute",
            width: 10,
            height: "100%",
            backgroundColor: "#72caa5",
            right: 0,
          }}
        />
      </View>
    </View>
  );
};

interface TodayWalkingCardProps {
  steps: number;
}
const TodayWalkingCard = ({ steps }: TodayWalkingCardProps) => {
  return (
    <View style={{
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "center",
      gap: 5,
    }}>
      <Text style={{
        color: "#72caa5",
        fontSize: 30,
        fontWeight: "bold",
      }}> {steps.toLocaleString()}</Text>
      <ProgressBar currentValue={steps} maxValue={10000} />
      <Text style={{ fontSize: 20, marginEnd: 10 }}>매일 4000보만 걸어 주세요</Text>
    </View>
  );
}

const HEADER_MAX_HEIGHT = 300; // 스크롤 전 큰 타이틀 높이
const HEADER_MIN_HEIGHT = 100; // 스크롤 후 작은 타이틀 높이
const TITLE_MAX_SIZE = 40; // 초기 글씨 크기
const TITLE_MIN_SIZE = 20; // 스크롤 후 글씨 크기

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const scrollY = useRef(new Animated.Value(0)).current; // 스크롤 감지

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 250], // 스크롤 위치 (최대 150까지)
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT], // 높이 변화
    extrapolate: "clamp",
  });

  const titleSize = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [TITLE_MAX_SIZE, TITLE_MIN_SIZE], // 글씨 크기 변화
    extrapolate: "clamp",
  });

  // object 형태로 변환되서 에러 발생
  // const backgroundOpacity = scrollY.interpolate({
  //   inputRange: [0, 150], // 200 이상 스크롤되면 배경이 사라짐
  //   outputRange: [1, 0],  // 1 (완전 보임) → 0 (완전 투명)
  //   extrapolate: "clamp",
  // });
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      const opacity = 1 - Math.min(1, value / 250);
      setBackgroundOpacity(opacity);
    });

    return () => {
      scrollY.removeListener(listenerId); // ✅ 언마운트 시 리스너 제거 (메모리 누수 방지)
    };
  }, []);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  // const [steps, setSteps] = useState(0);
  const steps = useStepCounter();

  useEffect(() => {
    const checkPermissionAndStart = async () => {
      const granted = await requestPermissions();
      setHasPermission(granted);

      if (granted) {
        NativeStepCounter.startService(); // ✅ 권한 승인 후 Foreground Service 실행
        NativeStepCounter.startListeningToSteps();
        // NativeStepCounter.getStepCount().then(setSteps);
      } else {
        Alert.alert("권한 필요", "걸음 수 데이터를 가져오려면 권한이 필요합니다.");
      }
    };

    checkPermissionAndStart();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '0xF4F4F8' : '0xF4F4F8',
  };

  const safePadding = '5%';

  if (hasPermission === null) {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Text>권한 확인 중...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Text>권한이 거부되었습니다.</Text>
        <Button
          title="권한 요청 다시 하기"
          onPress={async () => {
            const granted = await requestPermissions();
            setHasPermission(granted);
            if (granted) {
              NativeStepCounter.startService();
              NativeStepCounter.startListeningToSteps();
            }
          }}
        />
       </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={[]}>
        <View style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
            <ImageBackground
              source={{ uri: "https://picsum.photos/300/200" }}
              style={[styles.headerBbackgroundImage, { opacity: backgroundOpacity }]}
              resizeMode="cover"
            />
            <View style={styles.headerTitleContainer}>
              <Animated.Text style={[styles.headerTitle, { fontSize: titleSize }]}>
                치매예방교실
              </Animated.Text>
            </View>
          </Animated.View>
          <ScrollView
            style={backgroundStyle}
            contentContainerStyle={{
              paddingBottom: 100,
              //flexGrow: 1 
            }}

            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={7} //? 부드러운 반응 속도
          >
            <View
              style={{
                backgroundColor: backgroundStyle.backgroundColor,
                paddingHorizontal: safePadding,
                paddingBottom: safePadding,
              }}>
              <Section title="오늘 걸음 수">
                <TodayWalkingCard steps={steps % 10000} />
              </Section>
              <Section title="오늘의 목표">
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 20, marginEnd: 10 }}>활동을 완료해주세요</Text>
                  </View>

                  <View style={{ width: '100%', paddingHorizontal: 50, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", alignSelf: "stretch" }}>
                    <ImageBackground
                      style={{ width: 50, height: 50, borderRadius: 25, overflow: "hidden" }}
                      source={{ uri: "https://picsum.photos/50/50" }}
                      resizeMode="cover"
                    />
                    <ImageBackground
                      style={{ width: 50, height: 50, borderRadius: 25, overflow: "hidden" }}
                      source={{ uri: "https://picsum.photos/50/50" }}
                      // style={[styles.headerBbackgroundImage, { opacity: backgroundOpacity }]}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </Section>

              <Section title="오늘의 활동">
                <View style={{ flexDirection: "column", justifyContent: "center", gap: 30 }}>
                  {[
                    "이것은 매우 긴 텍스트로 테스트하는 예제입니다. 너무 길어지면 두 줄로 표시됩니다. ddd ddd ddd ddd ddd, 1111",
                    "색깔 맞추기",
                    "색깔 맞추기 색깔 맞추기, ooooooooooo",
                    "기억력 테스트",
                    "퍼즐 맞추기",

                  ].map((text, index) => (
                    <TdoayActionCard key={index} title={text} category="기억력" />
                  ))}
                </View>
              </Section>

              <Section title="" noPadding>
                <ChattingCard />
              </Section>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  headerContainer: {
    justifyContent: "center",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#ddd",

    backgroundColor: "white",
  },
  headerBbackgroundImage: {
    ...StyleSheet.absoluteFillObject
  },
  headerTitleContainer: {
    flex: 1,
    position: "absolute",
    top: 50,
    left: 5,
    // justifyContent: "center",
    // alignItems: "flex-start"
  },
  headerTitle: {
    fontWeight: "bold",
  },


  sectionContainer: {
    marginTop: 30,
    paddingHorizontal: 24,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ddd", // 보더 색상 (연한 회색)
    borderRadius: 10, // 라운드 처리
    padding: 10, // 내부 여백

    backgroundColor: "white", // 바탕 흰색

    // shadowColor: "#000", // 그림자 색상
    // shadowOffset: { width: 0, height: 1 }, // 그림자 위치
    // shadowOpacity: 0.1, // 그림자 투명도
    // shadowRadius: 4, // 그림자 퍼짐 정도
    // elevation: 3, // Android에서 그림자 효과 (iOS에서는 shadow 속성이 필요함)    
  },
  sectionTitle: {
    marginBottom: 20,

    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;