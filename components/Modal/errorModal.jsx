import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";

const ErrorModal = ({ isOpenErrorModal, openErrorModal }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isOpenErrorModal}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "rgba(0, 0, 0, 0.5)",
          height: "100%",
        }}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Image
              source={require("../../assets/errorMsg.png")}
              style={{ width: 120, height: 120, alignSelf: "center" }}
            />
            <Text style={styles.title}>
              오류가 발생했어요{"\n"}
              잠시후 다시 시도해주세요
            </Text>
            <TouchableOpacity onPress={openErrorModal}>
              <View style={styles.buttonContainer}>
                <Text style={styles.button}>확인</Text>
              </View>
            </TouchableOpacity>
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
    marginBottom: 9,
  },
  buttonContainer: {
    width: 160,
    // height: 40,
    backgroundColor: "#FFC891",
    alignSelf: "center",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    borderBottomWidth: 3,
    borderRightWidth: 3,
    paddingBottom: 10,
    paddingTop: 10,
  },
  button: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "#1F1F1F",
  },
  content: {
    gap: 15,
    paddingTop: 32,
    paddingBottom: 32,
  },
});

export default ErrorModal;
