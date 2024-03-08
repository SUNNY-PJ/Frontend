import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CalendarComponent from "../../components/Calendar/calendar";
import { useEffect } from "react";

const History = () => {
  const [data, setData] = useState([]);
  // 숫자에 세 자리마다 쉼표를 추가하는 함수
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const onDataFetched = (data) => {
    setData(data);
  };

  useEffect(() => {
    onDataFetched;
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <CalendarComponent onDataFetched={onDataFetched} />
        {/* <RangeCalendar /> */}
      </View>
      {/* {data.map((item, index) => ( */}
      <ScrollView>
        {Array.isArray(data) &&
          data.map((item, index) => (
            <View style={styles.bottomSection} key={index}>
              <View style={styles.bottomBar} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text style={styles.bottomText}>{item.name}</Text>
                <Text style={styles.bottomPriceText}>
                  {formatNumberWithCommas(item.money)}원
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {
    marginTop: 24,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  bottomSection: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 16,
    marginTop: 16,
  },
  bottomBar: {
    width: 4,
    height: 32,
    backgroundColor: "#5C5C5C",
    borderRadius: 10,
  },
  bottomText: {
    color: "#1F1F1F",
    fontSize: 16,
    fontFamily: "SUITE_Bold",
    fontWeight: 700,
    marginLeft: 16,
    alignSelf: "center",
  },
  bottomPriceText: {
    color: "#1F1F1F",
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "SUITE_Medium",
    alignSelf: "center",
  },
});

export default History;
