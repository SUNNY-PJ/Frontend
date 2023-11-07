import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import moment from "moment";
import DatePickerCalendar from "../Calendar/rangeCalendar";

const CalendarDatePicker = ({
  onDateRangeSelect,
  isDatePickerVisible,
  showDatePicker,
  hideDatePicker,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  console.log(selectedDate);

  const handleStartDateSelect = (date) => {
    setStartDate(date);
  };

  const handleEndDateSelect = (date) => {
    setEndDate(date);
  };

  const handleApply = () => {
    onDateRangeSelect(startDate, endDate);
  };

  const [isInputFocused, setInputFocused] = useState(false);

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    handleDateChange(date);
  };

  return (
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
        <Text>{`${moment(selectedDate).format("YYYY-MM-DD")}`}</Text>
      ) : (
        <Text style={{ color: "#C1C1C1" }}>지출 일자</Text>
      )}
      <View>
        <Text>Start Date: {startDate}</Text>
        <DatePickerCalendar
          onDateSelect={handleStartDateSelect}
          isVisible={isDatePickerVisible}
          mode="date"
          locale="ko-KR"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View>
        <Text>End Date: {endDate}</Text>
        <DatePickerCalendar
          onDateSelect={handleEndDateSelect}
          isVisible={isDatePickerVisible}
          mode="date"
          locale="ko-KR"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <Button title="Apply" onPress={handleApply} />
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

export default CalendarDatePicker;
