import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarComponent = () => {
  return <Calendar style={styles.calendar} />;
};

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});

export default CalendarComponent;
