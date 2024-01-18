import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const ImageActionSheet = ({ isVisible, onClose, onRemove, onSelect }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.actionSheet}>
          <TouchableOpacity style={styles.actionItem} onPress={onSelect}>
            <Text style={styles.actionText}>사진 선택</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={onRemove}>
            <Text style={styles.actionText}>이미지 삭제</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={onClose}>
            <Text style={styles.actionText}>취소</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  actionSheet: {
    backgroundColor: "white",
    padding: 16,
    alignItems: "center",
  },
  actionItem: {
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  actionText: {
    fontSize: 18,
  },
});

export default ImageActionSheet;
