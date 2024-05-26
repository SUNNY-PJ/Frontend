import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 24,
    marginTop: 17,
    marginBottom: 18,
  },
  tabText: {
    fontSize: 20,
    color: "#C1C1C1",
    fontFamily: "SUITE_Bold",
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
  name: {
    fontSize: 20,
    color: "#1F1F1F",
    fontFamily: "SUITE_ExtraBold",
  },
  setting: {
    fontSize: 16,
    color: "#5C5C5C",
    fontFamily: "SUITE_Medium",
  },
  scrapSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 29,
    marginBottom: 6,
  },
  box: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 12,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    color: "#000",
    padding: 4,
    fontFamily: "SUITE",
  },
  description: {
    fontSize: 12,
    color: "#000",
    padding: 4,
    fontFamily: "SUITE",
    gap: 8,
  },
  categoryText: {
    fontSize: 16,
    color: "#1F1F1F",
    alignSelf: "center",
    bottom: 20,
    fontFamily: "SUITE_Bold",
  },
  prevImg: { width: 24, height: 24, marginTop: 16, marginLeft: 20 },
});
