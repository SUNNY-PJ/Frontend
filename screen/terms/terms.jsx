import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TermsData } from "../../data/termsData";

const Terms = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyPage", {
              screen: "MyPage",
            })
          }
        >
          <Image
            source={require("../../assets/prevBtn.png")}
            style={{ width: 24, height: 24, marginTop: 16, marginLeft: 20 }}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 16,
          color: "#1F1F1F",
          fontFamily: "SUITE_Bold",
          alignSelf: "center",
          bottom: 20,
        }}
      >
        이용 약관
      </Text>
      <ScrollView style={{ marginBottom: 200 }}>
        {TermsData.map((item, index) => (
          <View key={index} style={styles.section}>
            {item.title && <Text style={styles.termsTitle}>{item.title}</Text>}
            {item.text && <Text style={styles.termsText}>{item.text}</Text>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  section: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    gap: 3,
  },
  termsTitle: {
    fontSize: 15,
    color: "#1F1F1F",
    fontFamily: "SUITE_Bold",
    marginTop: 10,
  },
  termsText: {
    fontSize: 12,
    color: "#1F1F1F",
    fontFamily: "SUITE_Medium",
  },
});

export default Terms;
