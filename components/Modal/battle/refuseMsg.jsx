import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";

const RefuseMsg = ({ isOpenRefuseMessage, openRefuseMessage }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isOpenRefuseMessage}
    >
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
            <TouchableOpacity onPress={openRefuseMessage}>
              <Image
                source={require("../../assets/close.png")}
                style={{ width: 16, height: 16 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Image
              source={require("../../assets/refuse.png")}
              style={{ width: 120, height: 120, alignSelf: "center" }}
            />
            <Text style={styles.title}>
              수연님이 대결 신청을{" "}
              <Text style={{ color: "#D32F2F" }}>거절</Text>했어요
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
    fontWeight: "700",
    marginBottom: 24,
    fontFamily: "SUITE_Bold",
    textAlign: "center",
    color: "#000",
  },
  content: {
    gap: 21,
  },
});

export default RefuseMsg;
