import { ScrollView, Text, StyleSheet } from "react-native";
import DonutChart from "../components/Chart/donutChart";
import PieChartComponent from "../components/Chart/pieChartComponent";
import WebSocketComponent from "../constant/socket/testSocket";
import StompClientComponent from "../constant/socket/testSocket2";
import StompWebSocketComponent from "../constant/socket/testSocket3";
import StompWebSocketComponent2 from "../constant/socket/testSocket4";
import WebSocket3 from "../constant/socket/socket3";

const TestScreen = () => {
  return (
    <>
      <ScrollView style={{ padding: 20 }}>
        <WebSocket3 />
        {/* <WebSocketComponent /> */}
        {/* <StompClientComponent /> */}
        {/* <StompWebSocketComponent /> */}
        {/* <StompWebSocketComponent2 /> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "SUITE_Bold",
    fontSize: 16,
  },
  des: {
    fontFamily: "SUITE_Medium",
    fontSize: 12,
  },
});

export default TestScreen;
