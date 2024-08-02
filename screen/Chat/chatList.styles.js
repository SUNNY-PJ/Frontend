import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    height: "100%",
  },
  section: {
    flexDirection: "column",
    marginTop: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1F1F1F",
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "SUITE_Bold",
  },
  chatSection: {
    flexDirection: "row",
    paddingTop: 14,
    paddingBottom: 17,
    justifyContent: "space-between",
    paddingLeft: 13,
    paddingRight: 19,
    backgroundColor: "#fff",
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  deleteBox: {
    backgroundColor: "#5C5C5C",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
  },
  deleteText: {
    color: "white",
    paddingHorizontal: 20,
    fontFamily: "SUITE",
  },
  msg: {
    fontSize: 15,
    fontWeight: 500,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  userName: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1F1F1F",
    marginBottom: 8,
    fontFamily: "SUITE_Bold",
  },
  time: {
    fontSize: 10,
    fontWeight: 500,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  cntBox: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderColor: "#6ADCA3",
    backgroundColor: "#6ADCA3",
    marginLeft: 4,
  },
  cnt: {
    fontSize: 10,
    fontWeight: 500,
    color: "#fff",
    textAlign: "center",
    top: 4,
    fontFamily: "SUITE",
  },
});
