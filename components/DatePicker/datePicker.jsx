import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet, Text, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const DatePicker = ({
  isDatePickerVisible,
  showDatePicker,
  hideDatePicker,
  handleDateChange,
  title,
  inputText,
  showDayOfWeek,
  //   resetDate,
}) => {
  const [selectedDate, setSelectedDate] = useState();
  console.log(selectedDate);

  const [isInputFocused, setInputFocused] = useState(false);

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  const handleConfirm = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (selectedDate > currentDate) {
      // 현재 날짜 이후의 날짜를 선택한 경우
      Alert.alert(
        "잘못된 날짜 선택",
        "지출 일자가 올바르지 않습니다.\n 다시 선택해주세요."
      );
      hideDatePicker();
    } else {
      // 올바른 날짜를 선택한 경우
      const dateFormat = showDayOfWeek ? "YYYY.MM.DD ddd" : "YYYY.MM.DD";
      const formattedDate = moment(selectedDate)
        .locale("ko")
        .format(dateFormat);
      setSelectedDate(formattedDate);
      hideDatePicker();
      handleDateChange(formattedDate);
    }
  };

  //   console.log(resetDate);
  //   useEffect(() => {
  //     if (resetDate === false) {
  //       setSelectedDate();
  //     }
  //   }, []);

  return (
    <View style={styles.container}>
      <View
        onPress={showDatePicker}
        style={[
          styles.input,
          {
            borderColor: selectedDate
              ? "#1F1F1F"
              : isInputFocused
              ? "#FFA851"
              : "#C1C1C1",
            borderBottomWidth: selectedDate ? "3px" : "1.5px",
            borderRightWidth: selectedDate ? "3px" : "1.5px",
          },
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {selectedDate ? (
          // <Text>{`${moment(selectedDate).format("YYYY.MM.DD")}`}</Text>
          <Text>
            {inputText} {selectedDate}
          </Text>
        ) : (
          <Text style={{ color: "#C1C1C1" }}>{title}</Text>
        )}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          locale="ko-KR"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // paddingLeft: 28,
  },
  input: {
    width: "100%",
    height: 48,
    paddingVertical: 14,
    paddingHorizontal: 11,
    borderWidth: 1.5,
    borderRadius: 8,
    alignSelf: "center",
    color: "black",
    backgroundColor: "#fff",
  },
});

export default DatePicker;
