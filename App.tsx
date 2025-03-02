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
} from 'react-native';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Section = ({ children, title }: SectionProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? 'white' : 'black',
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription
        ]}>
        {children}
      </Text>
    </View>
  );
}

type TdoayActionProps = {
  title: string;
  category: string;
};

const TdoayAction = ({ title, category }: TdoayActionProps) => {
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


const HEADER_MAX_HEIGHT = 300; // 스크롤 전 큰 타이틀 높이
const HEADER_MIN_HEIGHT = 100; // 스크롤 후 작은 타이틀 높이
const TITLE_MAX_SIZE = 40; // 초기 글씨 크기
const TITLE_MIN_SIZE = 20; // 스크롤 후 글씨 크기

const App = ({ children, title }: SectionProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const scrollY = useRef(new Animated.Value(0)).current; // 스크롤 감지

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150], // 스크롤 위치 (최대 150까지)
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT], // 높이 변화
    extrapolate: "clamp",
  });

  const titleSize = scrollY.interpolate({
    inputRange: [0, 150],
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
      const opacity = 1 - Math.min(1, value / 150);
      setBackgroundOpacity(opacity);
    });

    return () => {
      scrollY.removeListener(listenerId); // ✅ 언마운트 시 리스너 제거 (메모리 누수 방지)
    };
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '0xF4F4F8' : '0xF4F4F8',
  };

  const safePadding = '5%';

  return (
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
        scrollEventThrottle={16} //? 부드러운 반응 속도
      >
        <View
          style={{
            backgroundColor: backgroundStyle.backgroundColor,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
          <Section title="오늘 걸음 수">
            매일 4000보만 걸어도 주세요
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
                <TdoayAction key={index} title={text} category="기억력" />
              ))}
            </View>
          </Section>

          <Section title="오늘의 목표">
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
          </Section>
          <Section title="오늘의 목표">
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
          </Section>
          <Section title="오늘 활동">
          </Section>
          <Section title="언제든지 메세지를 남겨보세요">
            운영시간 9시 ~ 6시
          </Section>
          <Section title="오늘의 목표">
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
          </Section>
          <Section title="오늘의 목표">
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
          </Section>
          <Section title="마지막">
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
            <Text>활동을 완료해주세요</Text>
          </Section>
        </View>
      </ScrollView>
    </View>
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