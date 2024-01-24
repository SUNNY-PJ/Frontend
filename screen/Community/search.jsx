import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";

const Search = () => {
  const [text, setText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleInputChange = (data) => {
    setText(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.keyboard}>
          <TextInput
            placeholderTextColor="#C1C1C1"
            placeholder={"원하는 글, 검색어를 찾아보세요"}
            value={text}
            onChangeText={handleInputChange}
            style={styles.input}
          />
          <TouchableOpacity
            style={[styles.button]}
            // onPress={handlePostComment}
            disabled={!text}
          >
            <Image
              source={require("../../assets/searchIcon.png")}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 25,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.text}>최근 검색어</Text>
          <View style={{ flexDirection: "row", gap: 7 }}>
            <Text style={styles.text}>전체삭제</Text>
            <View
              style={{ backgroundColor: "#C1C1C1", width: 1, height: 14 }}
            />
            <Text style={styles.text}>자동저장끄기</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
    // flex: 1,
  },
  contentContainer: {
    // marginBottom: 40,
    paddingTop: 69,
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    height: 30,
    borderRadius: 48,
    borderColor: "transparent",
    borderWidth: 1.5,
    width: "84%",
    backgroundColor: "#F1F1F1",
  },
  keyboard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 42,
    borderRadius: 48,
    borderColor: "transparent",
    borderWidth: 1.5,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#F1F1F1",
  },
  text: {
    fontWeight: 500,
    fontSize: 16,
    color: "#C1C1C1",
  },
});

export default Search;
