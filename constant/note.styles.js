import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBF6",
    height: "100%",
  },
  contentContainer: {
    marginTop: 25,
    marginBottom: 40,
    paddingLeft: 28,
    paddingRight: 27,
  },
  headerText: {
    fontSize: 22,
    fontFamily: "SUITE_Bold",
    color: "#1F1F1F",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontFamily: "SUITE_Medium",
    color: "#1F1F1F",
    marginBottom: 8,
    marginTop: 32,
    paddingLeft: 10,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  noticeContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    top: 17,
  },
  noticeIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    marginBottom: 9,
    marginRight: 2,
  },
  noticeText: {
    fontSize: 12,
    fontFamily: "SUITE",
    color: "#5C5C5C",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioText: {
    fontSize: 16,
    color: "#5C5C5C",
    fontFamily: "SUITE_Medium",
  },
  radioIcon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    marginTop: 40,
  },
});
