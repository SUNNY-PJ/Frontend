import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
  },
  contentContainer: {
    marginBottom: 300,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  tabBar: {
    flexDirection: "row",
  },
  tabBarLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#C1C1C1",
  },
  box: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 12,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    color: "#000",
    padding: 4,
    fontFamily: "SUITE",
  },
  writer: {
    fontFamily: "SUITE",
    fontSize: 12,
    color: "#000",
    padding: 3,
    gap: 8,
  },
  description: {
    fontFamily: "SUITE",
    fontSize: 10,
    color: "#000",
    padding: 4,
    gap: 8,
  },
});
