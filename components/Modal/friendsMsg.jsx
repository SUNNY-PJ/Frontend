import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import MiddleBtn from "../Btn/middleBtn";
import MiddleBtnBlack from "../Btn/middleBtnBlack";

const FriendsMsg = ({ isVisible, toggleModal, name, onAccept, onRefuse }) => {
  return (
    <Modal animationType="none" transparent={true} visible={isVisible}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          height: "100%",
        }}
      >
        <View style={styles.container}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={require("../../assets/close.png")}
                style={{ width: 16, height: 16 }}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../assets/friendsMsg.png")}
            style={{
              width: 120,
              height: 120,
              alignSelf: "center",
              marginBottom: 24,
            }}
          />
          <Text style={styles.title}>
            {name}님에게서
            {"\n"}친구 신청이 왔어요!
          </Text>
          <View style={styles.buttonContainer}>
            <MiddleBtn text={"거절 "} onClick={onRefuse} />
            <MiddleBtnBlack text={"수락"} onClick={onAccept} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 315,
    // height: 480,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    backgroundColor: "#fff",
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  closeButtonContainer: {
    alignSelf: "flex-end",
    paddingTop: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
    fontFamily: "SUITE_Bold",
  },
  textContainer: {
    flexDirection: "cloumns",
    gap: 24,
    paddingLeft: 24,
    // marginBottom: 24,
  },
  textRow: {
    flexDirection: "cloumns",
    gap: 8,
    // justifyContent: "space-between",
    // marginBottom: 8,
  },
  textLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    fontFamily: "SUITE_Bold",
  },
  textValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    fontFamily: "SUITE",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 26,
    marginBottom: 32,
  },
});

export default FriendsMsg;