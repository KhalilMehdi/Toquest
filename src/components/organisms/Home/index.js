import React from "react";
import { View, StyleSheet } from "react-native";
import CoinsDisplay from "@molecules/CoinsDisplay";
import CustomImage from "@atoms/ImageCustom";
import CustomText from "@atoms/CustomText";

const HomeDisplay = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>WWF</CustomText>
      <CustomImage imageName="wwf" style={{ width: 200, height: 200 }} />
      <CoinsDisplay />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeDisplay;
