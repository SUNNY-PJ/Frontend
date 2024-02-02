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

const ModifyMsg = ({ isVisible, toggleModal, onDelete, onCancel }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <View style={styles.container}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={onCancel}>
              <Image
                source={require("../../../assets/close.png")}
                style={{ width: 16, height: 16 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>게시글을 수정할까요?</Text>
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
    width: 335,
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
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
  },
  textContainer: {
    flexDirection: "cloumns",
    gap: 24,
    paddingLeft: 24,
  },
  textRow: {
    flexDirection: "cloumns",
    gap: 8,
  },
  textLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  textValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 40,
    marginBottom: 34,
  },
});

export default ModifyMsg;
