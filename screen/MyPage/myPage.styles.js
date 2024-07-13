import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isLargeScreen = width > 375;

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: { marginBottom: isLargeScreen ? 100 : 80 },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 24,
    marginTop: 17,
    marginBottom: 18,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: isLargeScreen ? 12 : 10,
  },
  name: {
    fontSize: isLargeScreen ? 20 : 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_ExtraBold",
  },
  setting: {
    fontSize: isLargeScreen ? 16 : 14,
    color: "#5C5C5C",
    fontFamily: "SUITE_Medium",
  },
  title: {
    fontFamily: "SUITE_ExtraBold",
    fontSize: isLargeScreen ? 16 : 14,
    color: "#1F1F1F",
    paddingLeft: 20,
    paddingTop: isLargeScreen ? 16 : 12,
    marginBottom: isLargeScreen ? 8 : 6,
  },
  description: {
    fontFamily: "SUITE_Medium",
    fontSize: isLargeScreen ? 16 : 14,
    color: "#1F1F1F",
    paddingBottom: isLargeScreen ? 16 : 12,
    paddingTop: isLargeScreen ? 16 : 12,
    paddingLeft: 20,
  },
  alarmTitle: {
    fontSize: isLargeScreen ? 16 : 14,
    color: "#1F1F1F",
    fontFamily: "SUITE_ExtraBold",
    paddingLeft: 20,
    paddingTop: isLargeScreen ? 16 : 12,
    marginBottom: isLargeScreen ? 8 : 6,
  },
  alarmDescription: {
    fontSize: isLargeScreen ? 16 : 14,
    color: "#1F1F1F",
    fontFamily: "SUITE_Medium",
  },
  alarmSubDescription: {
    fontSize: isLargeScreen ? 12 : 10,
    color: "#5C5C5C",
    fontFamily: "SUITE_Medium",
  },
  alarmSection: {
    flexDirection: "column",
    gap: 8,
  },
  myInfo: {
    flexDirection: "row",
    marginTop: isLargeScreen ? 24 : 20,
    marginBottom: isLargeScreen ? 16 : 14,
    paddingLeft: 20,
    gap: isLargeScreen ? 24 : 20,
  },
  myInfoImg: {
    width: isLargeScreen ? 56 : 46,
    height: isLargeScreen ? 56 : 46,
    borderRadius: 50,
  },
});
