import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  section: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_Bold",
    alignSelf: "center",
    bottom: 20,
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  btn: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_Medium",
    borderColor: "#C1C1C1",
    padding: 8,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
  },
  name: {
    marginLeft: 8,
    fontSize: 16,
    color: "#1F1F1F",
    alignSelf: "center",
    fontFamily: "SUITE_Medium",
  },
  prevImg: { width: 24, height: 24, marginTop: 16, marginLeft: 20 },
});
