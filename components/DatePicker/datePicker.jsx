import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "../../constant/DateType/dateUtils";

const DatePicker = ({
  isDatePickerVisible,
  showDatePicker,
  hideDatePicker,
}) => {
  const placeholder = "날짜를 입력해주세요";

  const [text, onChangeText] = useState("");

  const handleConfirm = (date) => {
    // console.warn("dateFormat: ", formatDate(date, "yyyy/MM/dd"));
    // hideDatePicker();
    // onChangeText(formatDate(date, "yyyy/MM/dd"));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    console.warn("년: ", year);
    console.warn("월: ", month);
    console.warn("일: ", day);

    hideDatePicker();
    onChangeText(`${year}-${month}-${day}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        pointerEvents="none"
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#000000"
        underlineColorAndroid="transparent"
        editable={false}
        value={text}
      />
      <DateTimePickerModal
        locale="ko-KR"
        headerTextIOS={placeholder}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        style={styles.modal}
        contentContainerStyle={styles.modalContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 24,
  },
  textInput: {
    fontSize: 16,
    color: "#000000",
    height: 50,
    width: 300,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  modal: {
    zIndex: 0,
  },
  modalContentContainer: {
    flex: 0.8,
    marginTop: "auto",
    color: "#000",
  },
});

export default DatePicker;
