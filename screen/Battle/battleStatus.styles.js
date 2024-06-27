import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { backgroundColor: "#FFFBF6", height: "100%" },
  section: {
    paddingBottom: 14,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  boldText: { fontSize: 22, color: "#C1C1C1", fontFamily: "SUITE_ExtraBold" },
  boldText2: { fontSize: 22, color: "#1F1F1F", fontFamily: "SUITE_ExtraBold" },
  boldSmallText: {
    fontSize: 16,
    color: "#1F1F1F",
    marginTop: 14,
    fontFamily: "SUITE_ExtraBold",
  },
  text: { fontSize: 20, fontFamily: "SUITE" },
  subText: {
    fontSize: 16,
    color: "#5C5C5C",
    fontFamily: "SUITE_Bold",
  },
  vsIcon: {
    width: 51,
    height: 64,
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 11,
  },
  giveUp: { textDecorationLine: "underline", marginTop: 40 },
});
