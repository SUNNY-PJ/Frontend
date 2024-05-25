import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 28,
    paddingRight: 28,
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomColor: "#C1C1C1",
    borderBottomWidth: 1,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 8,
  },
  nickname: {
    marginLeft: 8,
    fontSize: 16,
    color: "#1F1F1F",
    alignSelf: "center",
    fontFamily: "SUITE_Medium",
  },
  mainTitle: {
    fontSize: 22,
    color: "#1F1F1F",
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "SUITE_Bold",
  },
  title: {
    fontSize: 20,
    fontFamily: "SUITE_Bold",
    color: "#1F1F1F",
  },
  menuItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  deleteBox: {
    backgroundColor: "#5C5C5C",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: "#C1C1C1",
    borderBottomWidth: 1,
  },
  deleteButtonText: {
    color: "#fff",
    fontFamily: "SUITE",
  },
});
