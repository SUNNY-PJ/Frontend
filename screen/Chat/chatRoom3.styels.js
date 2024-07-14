import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFBF6",
  },
  messagesContainer: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 60,
  },
  messageContainer: {
    marginBottom: 10,
  },
  message: {
    padding: 10,
    borderRadius: 9,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: "#1F1F1F",
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    maxWidth: "60%",
  },
  friendMessage: {
    padding: 10,
    borderRadius: 9,
    borderTopLeftRadius: 0,
    borderWidth: 1,
    borderColor: "#1F1F1F",
    backgroundColor: "#E8E9E8",
    alignSelf: "flex-start",
    maxWidth: "60%",
    bottom: 18,
    left: 45,
  },
  friendMessageContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderColor: "#C1C1C1",
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: 19,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 12,
    fontWeight: 700,
    color: "#5C5C5C",
  },
  icon: {
    width: 20,
    height: 21,
    marginLeft: 10,
  },
  time: {
    fontSize: 10,
    fontWeight: 500,
    color: "#C1C1C1",
    alignSelf: "flex-end",
  },
  inputSection: {
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  friendsName: {
    fontSize: 10,
    fontWeight: 700,
    color: "#1F1F1F",
    bottom: 10,
  },
  noti: {
    flex: 1,
    fontSize: 12,
    fontWeight: 700,
    color: "#5C5C5C",
    textAlign: "center",
  },
  date: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1F1F1F",
    fontFamily: "SUITE_Bold",
  },
  dateSection: {
    backgroundColor: "#6ADCA3",
    borderWidth: 1.5,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#1F1F1F",
    borderRadius: 55,
    paddingBottom: 9,
    paddingTop: 9,
    paddingRight: 18,
    paddingLeft: 18,
    alignSelf: "center",
    marginBottom: 15,
    marginTop: 15,
  },
  topSection: {
    alignItems: "center",
    gap: 16,
    paddingBottom: 20,
    paddingTop: 20,
  },
  topBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
  avatar: {
    width: 40,
    height: 40,
  },
});
