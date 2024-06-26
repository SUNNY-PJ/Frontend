import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet, Text, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

const DatePicker2 = ({
  isDatePickerVisible,
  showDatePicker,
  hideDatePicker,
  handleDateChange,
  handleDateValueChange,
  title,
  inputText,
  showDayOfWeek,
  initialDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || "");
  console.log("selectedDate", selectedDate);
  useEffect(() => {
    setSelectedDate(initialDate || "");
  }, [initialDate]);

  const [isInputFocused, setInputFocused] = useState(false);

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  const handleConfirm = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date.setHours(0, 0, 0, 0));
    currentDate.setHours(0, 0, 0, 0);

    // 사용자가 현재 날짜 이전을 선택했는지 검사합니다.
    if (selectedDate >= currentDate) {
      // 올바른 날짜를 선택한 경우
      const dateFormat = showDayOfWeek ? "YYYY.MM.DD dddd" : "YYYY.MM.DD";
      const formattedNoDayDate = moment(selectedDate).format("YYYY.MM.DD");
      const formattedDate = moment(selectedDate)
        .locale("ko")
        .format(dateFormat);
      setSelectedDate(formattedDate);
      hideDatePicker();
      handleDateChange(formattedDate);
      handleDateValueChange(formattedNoDayDate);
    } else {
      // 현재 날짜 이후의 날짜를 선택한 경우
      Alert.alert("", "과거의 날짜는 선택할 수 없습니다.\n다시 선택해주세요.");
      hideDatePicker();
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
          <Text style={{ fontFamily: "SUITE_Medium", color: "#1F1F1F" }}>
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
    fontFamily: "SUITE_Medium",
  },
});

export default DatePicker2;
