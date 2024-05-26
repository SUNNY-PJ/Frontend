import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  section: {
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 12,
    borderBottomColor: "#C1C1C1",
    borderBottomWidth: 1,
  },
  dayText: {
    fontSize: 20,
    color: "#1F1F1F",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 8,
    fontFamily: "SUITE_Bold",
  },
  dateText: {
    fontSize: 12,
    fontFamily: "SUITE",
    color: "#1F1F1F",
  },
  nameText: {
    fontSize: 12,
    fontFamily: "SUITE",
    color: "#1F1F1F",
  },
  contentText: {
    fontSize: 16,
    fontFamily: "SUITE",
    color: "#1F1F1F",
  },
  titleText: {
    fontSize: 12,
    fontFamily: "SUITE_Bold",
    color: "#5C5C5C",
  },
  bottomSection: { flexDirection: "row", gap: 8, marginTop: 6 },
  clickedItemStyle: {
    opacity: 0.5,
  },
});
