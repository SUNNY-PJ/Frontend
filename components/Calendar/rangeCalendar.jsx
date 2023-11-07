import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const RangeCalendar = ({ onDateRangeSelect }) => {
  const [selected, setSelected] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const currentDate = new Date();

  const handleDayPress = (day) => {
    if (!selectedStartDate || day.dateString < selectedStartDate) {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate("");
    } else if (!selectedEndDate || day.dateString > selectedEndDate) {
      setSelectedEndDate(day.dateString);
    }
  };

  const handleApply = () => {
    onDateRangeSelect(selectedStartDate, selectedEndDate);
  };

  return (
    <View>
      <Text>Start Date: {selectedStartDate}</Text>
      <Text>End Date: {selectedEndDate}</Text>
      <Calendar
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: "pink",
          selectedDayTextColor: "white",
          arrowColor: "pink",
          dotColor: "pink",
          todayTextColor: "purple",
        }}
        // onDayPress={(day) => {
        //   setSelected(day.dateString);
        // }}
        onDayPress={handleDayPress}
        markedDates={{
          [selectedStartDate]: { selected: true, selectedColor: "blue" },
          [selectedEndDate]: {
            selected: true,
            selectedColor: "deeppink",
            customStyles: {
              container: {
                borderWidth: 2,
                borderColor: "orange",
                borderRadius: 8,
              },
            },
          },
          container: {
            borderWidth: 2,
            borderColor: "orange",
            borderRadius: 8,
          },
        }}
        markingType={"period"}
        // markedDates={{
        //   [selected]: {
        //     selected: true,
        //     disableTouchEvent: false,
        //     // selectedDotColor: "black",
        //   },
        //   "2023-09-29": {
        //     selected: true,
        //     marked: true,
        //     selectedColor: "deeppink",
        //   },
        //   "2023-10-03": { marked: true },
        //   "2023-10-05": {
        //     selected: true,
        //     marked: true,
        //     selectedColor: "deeppink",
        //     customStyles: {
        //       container: {
        //         borderWidth: 2,
        //         borderColor: "orange",
        //         borderRadius: 8,
        //       },
        //     },
        //   },
        // }}
        current={currentDate.toISOString().split("T")[0]}
      />
      <Button title="Apply" onPress={handleApply} />
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
    borderWidth: 4,
    borderColor: "#E9E9E9",
    paddingBottom: 30,
  },
});

export default RangeCalendar;
