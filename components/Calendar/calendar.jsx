import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import apiClient from "../../api/apiClient";

const CalendarComponent = ({ onDataFetched, markedDates }) => {
  const [selected, setSelected] = useState("");
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(
    currentDate.toISOString().split("T")[0]
  );

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${year}.${month}.${day}`;
  };

  // console.log("1212", selected);
  // console.log("3434", selectedDate);

  // 한국어 설정
  LocaleConfig.locales["kr"] = {
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월.",
      "2월.",
      "3월.",
      "4월.",
      "5월.",
      "6월.",
      "7월.",
      "8월.",
      "9월.",
      "10월.",
      "11월.",
      "12월.",
    ],
    dayNames: [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    today: "오늘",
  };

  // 기본 언어를 한국어로 설정
  LocaleConfig.defaultLocale = "kr";

  const fetchData = async (selectedDate) => {
    const inputURL = "/consumption/date";
    try {
      const params = {
        datefield: selectedDate,
      };
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params,
      });
      console.log("데이터:", response.data.data);
      // onDataFetched 함수를 호출하여 데이터를 부모 컴포넌트로 전달
      onDataFetched(response.data.data);
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류 : calendar", error.response.data);
      } else {
        console.error("에러:", error);
      }
    }
  };

  return (
    <Calendar
      style={styles.calendar}
      renderHeader={(date) => {
        // date는 현재 달력이 보여주는 월의 첫 날을 나타내는 Date 객체
        const headerDate = new Date(date);
        const year = headerDate.getFullYear() + "년";
        const month = headerDate.getMonth() + 1 + "월";

        return (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {year} {month}
            </Text>
          </View>
        );
      }}
      theme={{
        backgroundColor: "#FFFBF6",
        calendarBackground: "#FFFBF6",
        textSectionTitleColor: "#b6c1cd",
        textSectionTitleDisabledColor: "#d9e1e8",
        selectedDayBackgroundColor: "#B9F4D6",
        selectedDayTextColor: "#ffffff",
        todayTextColor: "#B9F4D6",
        dayTextColor: "#1F1F1F",
        textDisabledColor: "#d9e1e8",
        dotColor: "#B9F4D6",
        selectedDotColor: "#ffffff",
        arrowColor: "#1F1F1F",
        disabledArrowColor: "#d9e1e8",
        monthTextColor: "#1F1F1F",
        indicatorColor: "#B9F4D6",
        textDayFontWeight: "300",
        textMonthFontWeight: "bold",
        textDayHeaderFontWeight: "300",
        textDayFontSize: 16,
        textMonthFontSize: 22,
        textDayHeaderFontSize: 16,
      }}
      onDayPress={(day) => {
        const formattedDate = formatDate(day.dateString);
        // setSelected(day.dateString);
        setSelected(formattedDate);
        // fetchData(day.dateString);
        fetchData(formattedDate);
        setSelectedDate(day.dateString);
      }}
      markedDates={{
        ...markedDates,
        [selectedDate]: {
          selected: true,
          selectedColor: "#B9F4D6",
          selectedTextColor: "black",
          selectedDayBackgroundColor: "#B9F4D6",
          selectedDayTextColor: "black",
          selectedDotColor: "black",
          disableTouchEvent: false,
          marked: true,
        },
        // "2024-01-05": {
        //   selected: true,
        //   marked: true,
        //   selectedColor: "deeppink",
        //   customStyles: {
        //     container: {
        //       borderWidth: 2,
        //       borderColor: "orange",
        //       borderRadius: 8,
        //     },
        //   },
        // },
      }}
      current={currentDate.toISOString().split("T")[0]}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // 헤더 컨테이너 스타일
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    // 헤더 텍스트 스타일
    fontSize: 16,
    fontFamily: "SUITE_Bold",
  },
  calendar: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 4,
    borderColor: "#E9E9E9",
    paddingBottom: 30,
  },
});

export default CalendarComponent;
