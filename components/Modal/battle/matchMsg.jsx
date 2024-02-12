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

const MatchMsg = ({ isVisible, toggleModal }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          <Text style={styles.title}>
            @@님에게서
            {"\n"}대결 신청이 왔어요!
          </Text>
          <View style={styles.textContainer}>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>도발 메세지</Text>
              <Text style={styles.textValue}>도발 메세지</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>대결 보상</Text>
              <Text style={styles.textValue}>맘스터치 기프티콘</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>대결 기간/보상</Text>
              <Text style={styles.textValue}>7일</Text>
              <Text style={styles.textValue}>150,000원</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <MiddleBtn text={"거절"} />
            <MiddleBtnBlack text={"승낙"} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 335,
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
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#000",
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
    marginBottom: 39,
  },
});

export default MatchMsg;
