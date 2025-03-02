import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
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

const App = ({ children, title }: SectionProps) => {
  const isDarkMode = useColorScheme() === 'dark';

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
      <ScrollView
        style={backgroundStyle}>
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