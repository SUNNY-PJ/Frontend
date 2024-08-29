import { ScrollView, Text, StyleSheet } from "react-native";
import WebSocket3 from "../constant/socket/socket3";

const TestScreen = () => {
  return (
    <>
      <ScrollView style={{ padding: 20 }}>
        <WebSocket3 />
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
