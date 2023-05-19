import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "@atoms/CustomText";

const RewardBox = ({ points, gift }) => {
  const styles = StyleSheet.create({
    container: {
      width: 300,
      height: 60,
      margin: 4,
      backgroundColor: "lightgray",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "black",
    },
    text: {
      fontSize: 12,
      color: "black",
    },
  });

  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>{gift}</CustomText>
      <CustomText style={styles.text}>Points required: {points}</CustomText>
    </View>
  );
};

export default RewardBox;
