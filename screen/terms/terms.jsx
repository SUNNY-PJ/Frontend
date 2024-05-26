import React from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./terms.styles";
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
            style={styles.prevImg}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>이용 약관</Text>
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

export default Terms;
