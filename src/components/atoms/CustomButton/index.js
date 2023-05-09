import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import CustomText from "@atoms/CustomText";

const CustomButton = ({ onPress, title, customColor }) => {
  const styles = StyleSheet.create({
    buttonInner: {
      alignItems: "center",
      justifyContent: "center",
      width: 176,
      height: 40,
      margin: 16,
      backgroundColor: customColor || "black",
    },
    buttonAfter: {
      position: "absolute",
      left: "-2.5%",
      top: 0,
      width: "105%",
      height: "100%",
      backgroundColor: customColor || "black",
      zIndex: -1,
    },
    buttonBefore: {
      position: "absolute",
      left: 0,
      top: "-5%",
      width: "100%",
      height: "113%",
      backgroundColor: customColor || "black",
      zIndex: -1,
    },
    buttonText: {
      fontSize: 16,
      color: "white",
    },
  });
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.buttonInner}>
        <View style={styles.buttonAfter} />
        <View style={styles.buttonBefore} />
        <CustomText style={styles.buttonText}>{title}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
