import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  text: {
    color: "#1F1F1F",
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "SUIT_Bold",
  },
  contentSection: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 85,
    gap: 16,
    marginBottom: 20,
    marginTop: 12,
  },
  selectedCategory: {
    backgroundColor: "#FFEFDF",
  },
  bar: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#1F1F1F",
  },
  section: {
    gap: 4,
    alignSelf: "center",
    width: 55,
  },
  bottomSection: {
    flexDirection: "row",
    paddingLeft: 20,
    marginBottom: 16,
    marginTop: 16,
  },
  bottomBar: {
    width: 4,
    height: 32,
    backgroundColor: "#5C5C5C",
    borderRadius: 10,
  },
  bottomText: {
    color: "#1F1F1F",
    fontSize: 16,
    fontFamily: "SUITE_Bold",
    marginLeft: 16,
    alignSelf: "center",
  },
  bottomPriceText: {
    color: "#1F1F1F",
    fontSize: 16,
    fontFamily: "SUITE_Medium",
    alignSelf: "center",
  },
  addItem: {
    position: "absolute",
    alignItems: "flex-end",
    bottom: 400,
    right: 21,
    zIndex: 10,
  },
  deleteBox: {
    backgroundColor: "#5C5C5C",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: "100%",
    marginLeft: 10,
  },
  deleteText: {
    color: "#fff",
    fontFamily: "SUITE",
  },
});
