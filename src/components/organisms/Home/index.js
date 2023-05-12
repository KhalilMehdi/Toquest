import React from "react";
import { View, StyleSheet } from "react-native";
import CustomImage from "@atoms/CustomImage";
import CustomText from "@atoms/CustomText";

const HomeDisplay = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>WWF</CustomText>
      <CustomImage imageName="panda" style={styles.image} />
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
  image: {
    width: 200,
    height: 250,
  },
});

export default HomeDisplay;
