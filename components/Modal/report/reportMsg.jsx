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
import { useNavigation } from "@react-navigation/native";

const ReportMsg = ({ isVisible, onSubmit, onCancel }) => {
  const navigation = useNavigation();

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
            <TouchableOpacity onPress={onCancel}>
              <Image
                source={require("../../../assets/close.png")}
                style={{ width: 16, height: 16 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>
            신고를 진행할까요?{"\n"}신고 검토까지는 최대 24시간이 {"\n"}
            소요됩니다.
          </Text>
          <View style={styles.buttonContainer}>
            <MiddleBtn text={"아니오"} onClick={onCancel} />
            <MiddleBtnBlack text={"네"} onClick={onSubmit} />
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

export default ReportMsg;
