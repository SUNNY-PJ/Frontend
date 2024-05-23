import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {
    marginBottom: 40,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: isIphone7 ? 13 : 15,
  },
  tabText: {
    fontSize: isIphone7 ? 18 : 20,
    fontFamily: "SUITE_Bold",
    color: "#C1C1C1",
    paddingTop: 9,
    paddingBottom: 6,
  },
  activeTabText: {
    color: "#1F1F1F",
  },
  tabBar: {
    flexDirection: "row",
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
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 24,
    marginTop: 17,
    marginBottom: 18,
  },
  icon: {
    width: 20,
    height: 20,
  },
  tipText: {
    color: "#262626",
    fontSize: 15,
    alignSelf: "center",
    fontFamily: "SUITE",
  },
  setting: { flexDirection: "row", gap: 3 },
  setting2: { flexDirection: "row", gap: 22 },
});
