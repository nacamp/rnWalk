import React, { useRef } from 'react';
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
          style={styles.headerBbackgroundImage}
          resizeMode="cover"
        >
          <View style={styles.headerTitleContainer}>
            <Animated.Text style={[styles.headerTitle, { fontSize: titleSize }]}>
              치매예방교실
            </Animated.Text>
          </View>
        </ImageBackground>
      </Animated.View>
      <ScrollView
        style={backgroundStyle}
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
    justifyContent: "center", 
    alignItems: "flex-start" 
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