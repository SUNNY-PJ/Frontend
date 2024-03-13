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
import RegularBtnOrange from "../Btn/regularBtnOrange";

const NoticeModal = ({ isOpenNoticeModal, openNoticeModal }) => {
  return (
    <Modal animationType="none" transparent={true} visible={isOpenNoticeModal}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          height: "100%",
        }}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Image
              source={require("../../assets/sweatIcon.png")}
              style={{ width: 120, height: 120, alignSelf: "center" }}
            />
            <Text style={styles.title}>
              아직 준비 중이에요{"\n"}
              빠르게 준비해 찾아뵐게요!
            </Text>
            <TouchableOpacity onPress={openNoticeModal} activeOpacity={0.6}>
              <RegularBtnOrange text={"확인"} />
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
    fontFamily: "SUITE_Bold",
  },
  content: {
    gap: 15,
    paddingTop: 32,
    paddingBottom: 32,
  },
});

export default NoticeModal;
