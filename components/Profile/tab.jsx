import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../../screen/Friends/friendProfile.style";

const ProfileTab = ({ onPress, isActive, text }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default ProfileTab;
