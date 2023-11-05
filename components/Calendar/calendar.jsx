import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarComponent = () => {
  const [selected, setSelected] = useState("");
  const currentDate = new Date();

  return (
    <Calendar
      style={styles.calendar}
      theme={{
        selectedDayBackgroundColor: "pink",
        selectedDayTextColor: "white",
        arrowColor: "pink",
        dotColor: "pink",
        todayTextColor: "purple",
      }}
      onDayPress={(day) => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: false,
          // selectedDotColor: "black",
        },
        "2023-09-29": {
          selected: true,
          marked: true,
          selectedColor: "deeppink",
        },
        "2023-10-03": { marked: true },
        "2023-10-05": {
          selected: true,
          marked: true,
          selectedColor: "deeppink",
          customStyles: {
            container: {
              borderWidth: 2,
              borderColor: "orange",
              borderRadius: 8,
            },
          },
        },
      }}
      current={currentDate.toISOString().split("T")[0]}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#E9E9E9",
    paddingBottom: 30,
  },
});

export default CalendarComponent;
