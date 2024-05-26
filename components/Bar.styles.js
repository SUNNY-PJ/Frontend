import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 12,
    // marginBottom: 12,
    alignItems: "center",
    // paddingLeft: 28,
    // paddingRight: 27,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
  },
  text: {
    color: "#5C5C5C",
    fontSize: 15,
    fontFamily: "SUITE_Bold",
    alignSelf: "flex-end",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  progressBar: {
    position: "relative",
    width: "100%",
    // width: 335,
    height: 24,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  progressFill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#6ADCA3",
    borderRadius: 24,
    // borderColor: "#1F1F1F",
    // borderRightWidth: 1.5,
  },
  progressText: {
    // marginLeft: -20,
    left: 120,
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_ExtraBold",
  },
});
