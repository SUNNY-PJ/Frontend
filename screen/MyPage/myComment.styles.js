import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  box: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    color: "#000",
    fontFamily: "SUITE_Medium",
    padding: 4,
  },
  description: {
    fontSize: 12,
    color: "#000",
    fontFamily: "SUITE",
    padding: 4,
    gap: 8,
  },
});
