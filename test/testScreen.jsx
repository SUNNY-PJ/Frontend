import { ScrollView, Text, StyleSheet } from "react-native";
import DonutChart from "../components/Chart/donutChart";
import PieChartComponent from "../components/Chart/pieChartComponent";

const TestScreen = () => {
  return (
    <>
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.text}>직접 구현한 차트</Text>
        <Text style={styles.des}>
          이건 코드로 그렸다고 생각하시면 되는데 svg 형태라 범례를 해당 영역에
          배치하기엔 무리가 있을 것 같아요ㅜㅜ
        </Text>
        <DonutChart />
        <Text style={[styles.text, { marginTop: 20 }]}>
          라이브러리 사용한 차트
        </Text>
        <Text style={styles.des}>
          라이브러리에는 도넛 차트가 없어서 파이 차트 사용했습니다.....
        </Text>
        <PieChartComponent />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "SUITE_Bold",
    fontSize: 16,
  },
  des: {
    fontFamily: "SUITE_Medium",
    fontSize: 12,
  },
});

export default TestScreen;
