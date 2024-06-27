import { ScrollView, Text, StyleSheet } from "react-native";
import WebSocket from "../constant/socket/socket";
import StompWebSocketComponent from "../constant/socket/testSocket3";
import WebSocket2 from "../constant/socket/socket2";

const TestScreen = () => {
  return (
    <>
      <ScrollView style={{ padding: 20 }}>
        <WebSocket />
        {/* <WebSocket2 /> */}
        {/* <StompWebSocketComponent /> */}
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
