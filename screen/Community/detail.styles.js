import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {
    paddingLeft: 20,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 17,
    marginBottom: 26,
    paddingRight: 20,
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
  subDescription: {
    fontSize: 10,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  contents: {
    fontSize: 15,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  prevImg: {
    width: 24,
    height: 24,
  },
  typeText: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_Bold",
    left: 12,
  },
  scrapSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  menuImg: {
    width: 20,
    height: 4,
  },
  title: {
    fontSize: 20,
    color: "#1F1F1F",
    fontFamily: "SUITE_Medium",
    marginBottom: 9,
    padding: 4,
    marginBottom: 28,
  },
  profileImg: { width: 40, height: 40, borderRadius: 50 },
  box: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 28,
  },
  photoImg: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginTop: 14,
  },
  arrowImg: {
    width: 18,
    height: 18,
    right: 4,
  },
  commentCnt: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 20,
    paddingBottom: 20,
  },
});
