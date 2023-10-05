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
              borderWidth: 2, // 테두리 두께
              borderColor: "orange", // 테두리 색상
              borderRadius: 8, // 테두리 모서리 둥글기
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
    borderBottomWidth: 4,
    borderBottomColor: "#C1C1C1",
  },
});

export default CalendarComponent;
