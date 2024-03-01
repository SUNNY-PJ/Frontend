import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import Line from "../../Line";

const OptionModal = ({
  isOpenOptionModal,
  openOptionModal,
  onDeletePress,
  onPutPress,
}) => {
  const handleDeletePress = () => {
    onDeletePress();
    openOptionModal();
  };

  const handlePutPress = () => {
    onPutPress();
    openOptionModal();
  };

  return (
    <Modal animationType="none" transparent={true} visible={isOpenOptionModal}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={openOptionModal} activeOpacity={1}>
          <Image
            source={require("../../../assets/close.png")}
            style={styles.closeImage}
          />
        </TouchableOpacity>
        <Line color={"#C1C1C1"} h={1} />
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handlePutPress}>
            <Text style={styles.text}>게시글 수정</Text>
          </TouchableOpacity>
          <Line color={"#C1C1C1"} h={1} />
          <TouchableOpacity onPress={handleDeletePress}>
            <Text style={styles.text}>게시글 삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 110,
    right: 15,
    width: 139,
    height: 109,
    borderRadius: 12,
    borderWidth: 1.5,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#1F1F1F",
    backgroundColor: "#fff",
  },
  closeImage: {
    width: 8,
    height: 8,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 15,
    alignSelf: "flex-end",
  },
  modalContent: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  text: {
    fontSize: 15,
    color: "#1F1F1F",
    marginTop: 9,
    marginBottom: 6,
    fontWeight: 700,
  },
});

export default OptionModal;
