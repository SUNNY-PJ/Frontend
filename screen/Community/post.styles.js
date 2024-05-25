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
  section: {
    marginTop: 12,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  media: {
    flexDirection: "row",
    gap: 16,
  },
  text: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  closeImg: {
    width: 16,
    height: 16,
  },
  categoryText: {
    fontSize: 15,
    borderColor: "#1F1F1F",
    fontFamily: "SUITE_Bold",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  deleteImg: {
    width: 18,
    height: 18,
    position: "absolute",
    top: -6,
    right: -6,
  },
  notiText: {
    fontSize: 10,
    color: "#5C5C5C",
    marginTop: 8,
    fontFamily: "SUITE_Medium",
  },
});
