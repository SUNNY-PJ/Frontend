import React, { useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const DatePicker = ({
  isDatePickerVisible,
  showDatePicker,
  hideDatePicker,
  handleDateChange,
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
    // 날짜 포맷
    // const formattedDate = moment(date).format("YYYY-MM-DD");
    // setSelectedDate(formattedDate);
    // hideDatePicker();
    // // 선택한 날짜를 부모 컴포넌트로 전달
    // handleDateChange(formattedDate);
    setSelectedDate(date);
    hideDatePicker();
    handleDateChange(date);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.input,
          {
            borderColor: selectedDate
              ? "#1F1F1F"
              : isInputFocused
              ? "#FFA851"
              : "#C1C1C1",
          },
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <Text>{`${
          selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : "지출 일자"
        }`}</Text>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          //   locale="ko"
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
  },
});

export default DatePicker;
