import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../../screen/Friends/friendProfile.style";

const ProfileButton = ({
  onPress,
  backgroundColor,
  text,
  textColor = "#1F1F1F",
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={[styles.button, { backgroundColor }]}
    onPress={onPress}
  >
    <Text style={[styles.btnText, { color: textColor }]}>{text}</Text>
  </TouchableOpacity>
);

export default ProfileButton;
