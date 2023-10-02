import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Bar from "../components/Bar";
import Statistics from "./statistics";
import History from "./history";

const Spending = () => {
  const [history, setHistory] = useState(false);
  const [statistics, setStatistics] = useState(true);

  const historyClick = () => {
    setHistory(true);
    setStatistics(false);
  };

  const statisticsClick = () => {
    setStatistics(true);
    setHistory(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 116,
            marginTop: 25,
            marginBottom: 12,
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
        {statistics && <Statistics />}
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
});

export default Spending;
