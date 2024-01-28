import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Statistics from "./statistics";
import History from "./history";

const Spending = () => {
  const [history, setHistory] = useState(false);
  const [statistics, setStatistics] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const historyClick = () => {
    setHistory(true);
    setStatistics(false);
  };

  const statisticsClick = () => {
    setStatistics(true);
    setHistory(false);
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}년 ${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}월`;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // console.log(year);
  // console.log(month);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {!history && (
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              marginBottom: 8,
              marginTop: 16,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={previousMonth}>
              <Image
                source={require("../../assets/arrowLeft.png")}
                style={[styles.vectorImage, { transform: [{ scaleX: -1 }] }]}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: 700, color: "#1F1F1F" }}>
              {formatDate(currentDate)}
            </Text>
            <TouchableOpacity onPress={nextMonth}>
              <Image
                source={require("../../assets/arrowLeft.png")}
                style={styles.vectorImage}
              />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 116,
            marginTop: 15,
            marginBottom: 6,
          }}
        >
          <TouchableOpacity onPress={statisticsClick} activeOpacity={0.6}>
            <Text style={[styles.tabText, statistics && styles.activeTabText]}>
              지출 통계
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={historyClick} activeOpacity={0.6}>
            <Text style={[styles.tabText, history && styles.activeTabText]}>
              지출 내역
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabBar}>
          <View
            style={[styles.tabBarLine, statistics && styles.activeTabBarLine]}
          />
          <View
            style={[styles.tabBarLine, history && styles.activeTabBarLine]}
          />
        </View>
        {statistics && <Statistics year={year} month={month} />}
        {history && <History />}
      </View>
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
    marginBottom: 40,
  },
  tabText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#C1C1C1",
    paddingTop: 9,
    paddingBottom: 6,
  },
  activeTabText: {
    color: "#1F1F1F",
  },
  tabBar: {
    flexDirection: "row",
    // marginBottom: 12,
  },
  tabBarLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#C1C1C1",
  },
  activeTabBarLine: {
    backgroundColor: "#1F1F1F",
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  vectorImage: {
    width: 24,
    height: 24,
  },
});

export default Spending;
