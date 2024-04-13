import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import MiddleBtn from "../../Btn/middleBtn";
import MiddleBtnBlack from "../../Btn/middleBtnBlack";

const MsgModal = ({ isVisible, toggleModal, onDelete, onCancel, msgTitle }) => {
  return (
    <Modal animationType="none" transparent={true} visible={isVisible}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <View style={styles.container}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={require("../../../assets/close.png")}
                style={{ width: 16, height: 16 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{msgTitle}</Text>
          <View style={styles.buttonContainer}>
            <MiddleBtn text={"네"} onClick={onDelete} />
            <MiddleBtnBlack text={"아니오"} onClick={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 315,
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
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    fontFamily: "SUITE_Bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 32,
    marginBottom: 32,
  },
});

export default MsgModal;
