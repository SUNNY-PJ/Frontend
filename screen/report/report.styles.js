import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  section: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 16,
  },
  mainText: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_Bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  closeImg: {
    width: 16,
    height: 16,
    alignSelf: "flex-end",
    bottom: 25,
  },
});
