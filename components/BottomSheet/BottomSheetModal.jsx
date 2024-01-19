import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

const BottomSheetModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnimation] = useState(new Animated.Value(0));

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const slideUp = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "0%"],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal}>
        <Text>Show Modal</Text>
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} />
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideUp }] },
          ]}
        >
          <TouchableOpacity
            onPress={() => alert("Choose from Gallery")}
            style={styles.button}
          >
            <Text>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("Custom Profile Settings")}
            style={styles.button}
          >
            <Text>Custom Profile Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("Remove Profile Photo")}
            style={styles.button}
          >
            <Text>Remove Profile Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 16,
  },
  button: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
  },
  cancelButton: {
    paddingVertical: 12,
    marginTop: 16,
  },
});

export default BottomSheetModal;
