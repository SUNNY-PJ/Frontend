import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const RangeCalendar = ({ onDateRangeSelect }) => {
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const currentDate = new Date();

  const handleDayPress = (day) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // If no start date is selected or both start and end dates are already selected,
      // set the selected start date and clear the end date.
      setSelectedStartDate(day.dateString);
      setSelectedEndDate("");
    } else if (day.dateString < selectedStartDate) {
      // If a start date is already selected and the selected date is earlier than the current start date,
      // update the start date.
      setSelectedStartDate(day.dateString);
    } else if (!selectedEndDate || day.dateString > selectedEndDate) {
      // If an end date is not selected or the selected date is later than the current end date,
      // update the end date.
      setSelectedEndDate(day.dateString);
    }
  };

  const handleApply = () => {
    onDateRangeSelect(selectedStartDate, selectedEndDate);
  };

  return (
    <View>
      {/* <Text>Start Date: {selectedStartDate}</Text>
      <Text>End Date: {selectedEndDate}</Text> */}
      <Calendar
        style={styles.calendar}
        theme={{
          arrowColor: "#000",
          todayTextColor: "purple",
          todayDotColor: "purple",
        }}
        onDayPress={handleDayPress}
        markedDates={{
          [selectedStartDate]: {
            selected: true,
            color: "#B9F4D6",
            textColor: "#000",
            borderWidth: 1,
            borderColor: "#000",
          },
          [selectedEndDate]: {
            selected: true,
            color: "#B9F4D6",
            textColor: "#000",
            borderWidth: 1,
            borderColor: "#000",
            customStyles: {
              container: {
                borderWidth: 2,
                borderColor: "orange",
                borderRadius: 8,
              },
            },
          },
        }}
        markingType={"period"}
        current={currentDate.toISOString().split("T")[0]}
      />
      {/* <Button title="Apply" onPress={handleApply} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  calendar: {
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#E9E9E9",
    paddingBottom: 30,
  },
});

export default RangeCalendar;
