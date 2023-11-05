import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Bar from "../../components/Bar";
import Calendar from "../../components/Calendar/calendar";
import CalendarComponent from "../../components/Calendar/calendar";
import RangeCalendar from "../../components/Calendar/rangeCalendar";

const History = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* <CalendarComponent /> */}
        <RangeCalendar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {
    marginTop: 24,
    // marginBottom: 40,
    // paddingLeft: 28,
    // paddingRight: 27,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
});

export default History;
