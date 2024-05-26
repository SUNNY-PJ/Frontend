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
    paddingBottom: 20,
    gap: 3,
  },
  termsTitle: {
    fontSize: 15,
    color: "#1F1F1F",
    fontFamily: "SUITE_Bold",
    marginTop: 10,
  },
  termsText: {
    fontSize: 12,
    color: "#1F1F1F",
    fontFamily: "SUITE_Medium",
  },
  prevImg: { width: 24, height: 24, marginTop: 16, marginLeft: 20 },
  title: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_Bold",
    alignSelf: "center",
    bottom: 20,
  },
});
