import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Line from "../Line";

const CommentActionSheet = ({
  isVisible,
  onClose,
  onRemove,
  onComment,
  onProfile,
  onModify,
  isChildComment,
}) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={{ padding: 17 }}>
          <View style={styles.actionSheet}>
            {isChildComment && (
              <>
                <TouchableOpacity style={styles.actionItem} onPress={onComment}>
                  <Text style={styles.actionText}>댓글 답글 쓰기</Text>
                </TouchableOpacity>
                <Line h={1} color={"#C1C1C1"} />
              </>
            )}
            {/* <Line h={1} color={"#C1C1C1"} /> */}
            {/* <TouchableOpacity style={styles.actionItem} onPress={onProfile}>
              <Text style={styles.actionText}>작성자 프로필 보기</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.actionItem} onPress={onModify}>
              <Text style={styles.actionText}>수정</Text>
            </TouchableOpacity>
            <Line h={1} color={"#C1C1C1"} />
            <TouchableOpacity style={styles.actionItem} onPress={onRemove}>
              <Text style={styles.actionText}>삭제</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.actionSheet, { marginTop: 5 }]}>
            <TouchableOpacity style={styles.actionItem} onPress={onClose}>
              <Text style={styles.actionText}>취소</Text>
            </TouchableOpacity>
          </View>
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

    alignItems: "center",
    borderRadius: 16,
  },
  actionItem: {
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  actionText: {
    fontSize: 20,
    color: "#1F1F1F",
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "SUITE",
  },
});

export default CommentActionSheet;
