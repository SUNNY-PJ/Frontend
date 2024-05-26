import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {
    paddingLeft: 28,
    paddingRight: 27,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 24,
    marginTop: 17,
    marginBottom: 18,
  },
  topTitle: {
    fontSize: 16,
    color: "#1F1F1F",
    alignSelf: "center",
    bottom: 17,
    fontFamily: "SUITE_Bold",
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  name: {
    fontSize: 20,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  setting: {
    fontSize: 16,
    color: "#5C5C5C",
    fontFamily: "SUITE_Medium",
  },
  title: {
    fontSize: 16,
    color: "#1F1F1F",
    paddingLeft: 20,
    paddingTop: 16,
    marginBottom: 8,
    fontFamily: "SUITE_ExtraBold",
  },
  profileImage: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 28,
    borderRadius: 50,
  },
  prevImg: { width: 24, height: 24, marginTop: 16 },
  nicknameText: {
    paddingLeft: 12,
    fontSize: 16,
    color: "#1F1F1F",
    marginBottom: 16,
    fontFamily: "SUITE",
  },
  notiText: {
    marginTop: 8,
    fontSize: 12,
    color: "#5C5C5C",
    textAlign: "left",
    paddingLeft: 12,
    marginBottom: 278,
    fontFamily: "SUITE",
  },
});
