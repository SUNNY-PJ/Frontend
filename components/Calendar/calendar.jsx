import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CalendarComponent = ({ onDataFetched }) => {
  const [selected, setSelected] = useState("");
  const currentDate = new Date();
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${year}.${month}.${day}`;
  };

  const fetchData = async (selectedDate) => {
    const inputURL = "/consumption/date";
    const url = proxyUrl + inputURL;
    const access_token = await AsyncStorage.getItem("access_token");

    try {
      const params = {
        datefield: selectedDate,
      };

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        params,
      });
      console.log(params);

      console.log("데이터:", response.data.data);
      // onDataFetched 함수를 호출하여 데이터를 부모 컴포넌트로 전달
      onDataFetched(response.data.data);
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
      } else {
        console.error("에러:", error);
      }
    }
  };

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
        const formattedDate = formatDate(day.dateString);
        // setSelected(day.dateString);
        setSelected(formattedDate);
        // fetchData(day.dateString);
        fetchData(formattedDate);
      }}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: false,
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
    borderWidth: 4,
    borderColor: "#E9E9E9",
    paddingBottom: 30,
  },
});

export default CalendarComponent;
