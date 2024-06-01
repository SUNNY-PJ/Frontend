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
  radioIcon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  content: {
    borderColor: "#C1C1C1",
    borderWidth: 1.5,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  reasonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  reasonText: {
    fontSize: 16,
    color: "#1F1F1F",
    marginLeft: 10,
    fontFamily: "SUITE",
  },
});
