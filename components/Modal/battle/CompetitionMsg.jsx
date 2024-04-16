import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";

const CompetitionMsg = ({ isVisible, toggleModal, name, result }) => {
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
                source={require("../../../assets/close.png")}
                style={{ width: 16, height: 16 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            {result === "거절" ? (
              <Image
                source={require("../../../assets/refuse.png")}
                style={{ width: 120, height: 120, alignSelf: "center" }}
              />
            ) : (
              <Image
                source={require("../../../assets/consent.png")}
                style={{ width: 120, height: 120, alignSelf: "center" }}
              />
            )}
            <Text style={styles.title}>
              {name}님이 대결 신청을{" "}
              {result === "거절" ? (
                <Text style={{ color: "#D32F2F" }}>거절</Text>
              ) : (
                <Text style={{ color: "#007560" }}>승낙</Text>
              )}
              했어요
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
    fontFamily: "SUITE_Bold",
    textAlign: "center",
    color: "#000",
  },
  content: {
    gap: 21,
  },
});

export default CompetitionMsg;
