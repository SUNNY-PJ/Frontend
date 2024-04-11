import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";

const LoserModal = ({ isOpenLoserModal, openLoserModal }) => {
  return (
    <Modal animationType="none" transparent={true} visible={isOpenLoserModal}>
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
            <TouchableOpacity onPress={openLoserModal}>
              <Image
                source={require("../../assets/close.png")}
                style={{ width: 16, height: 16 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Image
              source={require("../../assets/loser.png")}
              style={{ width: 110, height: 102, alignSelf: "center" }}
            />
            <Text style={styles.title}>
              유림님과의 대결에서
              <Text style={{ color: "#D32F2F" }}>졌어요</Text>
            </Text>
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
    fontSize: 20,
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "SUITE_Bold",
    color: "#000",
  },
  content: {
    gap: 21,
  },
});

export default LoserModal;
