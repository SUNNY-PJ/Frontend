import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import CalendarComponent from "../../components/Calendar/calendar";

const History = () => {
  const [data, setData] = useState([]);

  const onDataFetched = (data) => {
    console.log("받아온 데이터::", data);
    setData(data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <CalendarComponent onDataFetched={onDataFetched} />
        {/* <RangeCalendar /> */}
      </View>
      {data.map((item) => (
        <View style={styles.bottomSection} key={item.name}>
          <View style={styles.bottomBar} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.bottomText}>{item.name}</Text>
            <Text style={styles.bottomPriceText}>{item.money}원</Text>
          </View>
        </View>
      ))}
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
    // marginBottom: 40,
    // paddingLeft: 28,
    // paddingRight: 27,
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
    fontWeight: 700,
    marginLeft: 16,
    alignSelf: "center",
  },
  bottomPriceText: {
    color: "#1F1F1F",
    fontSize: 16,
    fontWeight: 500,
    alignSelf: "center",
  },
});

export default History;
