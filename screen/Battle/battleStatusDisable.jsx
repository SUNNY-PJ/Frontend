import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { styles } from "./battleStatus.styles";
import { useNavigation } from "@react-navigation/native";
import Line from "../../components/Line";
import Progress from "../../components/progress/progress";
import { useRoute } from "@react-navigation/native";

const BattleStatusDisable = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { friendId } = route.params;
  const { nickname } = route.params;
  const { end_date } = route.params;
  const { price } = route.params;
  const { user_percent } = route.params;
  const { friends_percent } = route.params;

  const handleGoBack = () => {
    navigation.navigate("MainScreen", { screen: "FriendsList" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.boldText, { textAlign: "center", marginTop: 30 }]}>
          {/* {data.compensation}을 걸고 {"\n"} */}
          {end_date}까지 {price}원 쓰기
        </Text>
      </View>
      <Line h={2} color={"#1F1F1F"} />
      {/* <ScrollView> */}
      <View style={{ alignItems: "center" }}>
        <Text
          style={[styles.boldSmallText, { marginBottom: 16, marginTop: 52 }]}
        >
          친구의 포기로 대결이 자동 종료되었어요
        </Text>
        <Text style={[styles.boldText, { marginTop: 13, marginBottom: 10 }]}>
          나는
        </Text>
        <Progress progress={user_percent} color={"#C1C1C1"} />
        <Text style={[styles.boldText]}>
          {user_percent}%
          <Text style={[styles.text, { color: "#C1C1C1" }]}>남았어요</Text>
        </Text>
        <Image
          source={require("../../assets/VSIconDisable.png")}
          style={styles.vsIcon}
        />
        <Text style={[styles.boldText, { marginBottom: 10 }]}>
          {nickname}님은
        </Text>
        <Progress progress={friends_percent} color={"#C1C1C1"} />
        <Text style={[styles.boldText]}>
          {friends_percent}% <Text style={[styles.text]}>남았어요</Text>
        </Text>
        <TouchableOpacity onPress={handleGoBack}>
          <Text
            style={[
              styles.subText,
              { textDecorationLine: "underline", marginTop: 40 },
            ]}
          >
            돌아가기
          </Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default BattleStatusDisable;
