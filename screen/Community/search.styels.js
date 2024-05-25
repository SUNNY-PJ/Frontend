import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
    // flex: 1,
  },
  contentContainer: {
    // marginBottom: 40,
    paddingTop: 69,
    // paddingRight: 20,
    // paddingLeft: 20,
  },
  input: {
    height: 30,
    borderRadius: 48,
    borderColor: "transparent",
    borderWidth: 1.5,
    width: "84%",
    backgroundColor: "#F1F1F1",
  },
  keyboard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 42,
    borderRadius: 48,
    borderColor: "transparent",
    borderWidth: 1.5,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#F1F1F1",
  },
  text: {
    fontSize: 16,
    fontFamily: "SUITE",
    color: "#C1C1C1",
  },
  recentSearchesHeader: {
    marginTop: 25,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 20,
  },
  recentSearch: {
    fontSize: 20,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  type: {
    fontSize: 12,
    fontFamily: "SUITE",
    color: "#1F1F1F",
  },
  title: {
    fontSize: 16,
    fontFamily: "SUITE_Bold",
    color: "#1F1F1F",
  },
  writer: {
    fontSize: 12,
    fontFamily: "SUITE",
    color: "#1F1F1F",
  },
});
