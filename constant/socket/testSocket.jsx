// import React, { useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { proxy_url } from "../../api/common";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const WebSocketComponent = () => {
//   const proxy = proxy_url;

//   useEffect(() => {
//     const connectWebSocket = async () => {
//       const accessToken = await AsyncStorage.getItem("access_token");

//       const ws = new WebSocket(`ws://${proxy}/stomp`);

//       ws.onopen = () => {
//         console.log("WebSocket 연결이 열렸습니다.");

//         // 서버로 CONNECT 프레임 전송
//         const connectFrame = JSON.stringify({
//           type: "CONNECT",
//           headers: {
//             Authorization: `${accessToken}`,
//           },
//         });
//         ws.send(connectFrame);

//         // 서버로 SUBSCRIBE 프레임 전송
//         const subscribeFrame = JSON.stringify({
//           type: "SUBSCRIBE",
//           destination: "/sub/user/15",
//           id: "unique-id-1",
//           ack: "auto",
//         });
//         ws.send(subscribeFrame);
//       };

//       ws.onmessage = (e) => {
//         const receivedMsg = JSON.parse(e.data);
//         console.log("서버로부터 메시지 수신:", receivedMsg);
//         setMessages((prevMessages) => [...prevMessages, receivedMsg.body]);
//       };

//       ws.onerror = (e) => {
//         console.error("WebSocket 에러 발생:", e.message);
//       };

//       return () => {
//         ws.close();
//         console.log("WebSocket 연결이 닫혔습니다.");
//       };
//     };

//     connectWebSocket();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>WebSocket Example</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default WebSocketComponent;
