import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Message from "../components/Modal/message";
import RefuseMessage from "../components/Modal/refuseMessage";
import ConsentMessage from "../components/Modal/consentMessage";

function FriendsList({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isOpenRefuseMessage, setIsOpenRefuseMessage] = useState(false);
  const [isOpenConsentMessage, setIsOpenConsentMessage] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openRefuseMessage = () => {
    setIsOpenRefuseMessage(!isOpenRefuseMessage);
  };

  const openConsentMessage = () => {
    setIsOpenConsentMessage(!isOpenConsentMessage);
  };

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#FFFBF6",
      }}
    >
      <View
        style={{
          // flex: 1,
          flexDirection: "column",
          marginTop: 25,
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#1F1F1F",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          친구 목록
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1F1F1F",
            paddingLeft: 28,
            marginBottom: 8,
          }}
        >
          대결중인 친구
        </Text>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#C1C1C1",
          }}
        />
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 28,
              paddingRight: 28,
              marginBottom: 20,
              paddingTop: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/Avatar.png")}
                style={styles.icon}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#1F1F1F",
                  alignSelf: "center",
                }}
              >
                친구1
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity activeOpacity={0.6} onPress={toggleModal}>
                <Image
                  source={require("../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={openRefuseMessage}>
                <Image
                  source={require("../assets/VersusIcon.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 2,
              backgroundColor: "#C1C1C1",
              marginBottom: 20,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 28,
              paddingRight: 28,
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/Avatar.png")}
                style={styles.icon}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#1F1F1F",
                  alignSelf: "center",
                }}
              >
                친구1
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity>
                <Image
                  source={require("../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../assets/VersusIcon.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 2,
              backgroundColor: "#C1C1C1",
              marginBottom: 20,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 28,
              paddingRight: 28,
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/Avatar.png")}
                style={styles.icon}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#1F1F1F",
                  alignSelf: "center",
                }}
              >
                친구1
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity>
                <Image
                  source={require("../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={openConsentMessage}
              >
                <Image
                  source={require("../assets/VersusIconRed.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#1F1F1F",
          }}
        />
      </View>
      {/* 친구 목록 */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#1F1F1F",
          paddingLeft: 28,
          marginBottom: 8,
        }}
      >
        친구
      </Text>
      <View
        style={{
          width: "100%",
          height: 2,
          backgroundColor: "#C1C1C1",
        }}
      />
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 28,
            paddingRight: 28,
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/Avatar.png")}
              style={styles.icon}
            />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                fontWeight: 500,
                color: "#1F1F1F",
                alignSelf: "center",
              }}
            >
              친구1
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity>
              <Image
                source={require("../assets/messageBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/VersusIconBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#C1C1C1",
            marginBottom: 20,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 28,
            paddingRight: 28,
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/Avatar.png")}
              style={styles.icon}
            />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                fontWeight: 500,
                color: "#1F1F1F",
                alignSelf: "center",
              }}
            >
              친구1
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity>
              <Image
                source={require("../assets/messageBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/VersusIconBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#C1C1C1",
            marginBottom: 20,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 28,
            paddingRight: 28,
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/Avatar.png")}
              style={styles.icon}
            />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                fontWeight: 500,
                color: "#1F1F1F",
                alignSelf: "center",
              }}
            >
              친구1
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity>
              <Image
                source={require("../assets/messageBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/VersusIconBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#C1C1C1",
            marginBottom: 20,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 28,
            paddingRight: 28,
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/Avatar.png")}
              style={styles.icon}
            />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                fontWeight: 500,
                color: "#1F1F1F",
                alignSelf: "center",
              }}
            >
              친구1
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity>
              <Image
                source={require("../assets/messageBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/VersusIconBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#C1C1C1",
            marginBottom: 20,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 28,
            paddingRight: 28,
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/Avatar.png")}
              style={styles.icon}
            />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                fontWeight: 500,
                color: "#1F1F1F",
                alignSelf: "center",
              }}
            >
              친구1
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity>
              <Image
                source={require("../assets/messageBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/VersusIconBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Message isVisible={isModalVisible} toggleModal={toggleModal} />
      <RefuseMessage
        isOpenRefuseMessage={isOpenRefuseMessage}
        openRefuseMessage={openRefuseMessage}
      />
      <ConsentMessage
        isOpenConsentMessage={isOpenConsentMessage}
        openConsentMessage={openConsentMessage}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  menuItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 40,
    width: 40,
  },
});

export default FriendsList;
