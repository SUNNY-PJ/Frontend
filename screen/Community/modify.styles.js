import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 21,
  },
  mainTitle: {
    fontSize: 20,
    color: "#1F1F1F",
    alignSelf: "center",
    marginTop: 17,
    fontFamily: "SUITE_Bold",
  },
  topSection: {
    marginTop: 8,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 15,
    borderColor: "#1F1F1F",
    fontFamily: "SUITE_Bold",
  },
  media: {
    flexDirection: "row",
    gap: 16,
  },
  text: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_Medium",
  },
  contentText: {
    fontSize: 16,
    color: "#1F1F1F",
    marginBottom: 8,
    marginTop: 10,
    paddingLeft: 12,
    fontFamily: "SUITE_Medium",
  },
  removeImgSection: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  removeImg: {
    width: 18,
    height: 18,
    position: "absolute",
    top: -6,
    right: -6,
  },
});
