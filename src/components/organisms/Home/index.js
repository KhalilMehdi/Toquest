import React from "react";
import { View, StyleSheet } from "react-native";
import CustomImage from "@atoms/CustomImage";
import CustomText from "@atoms/CustomText";
import CoinsDisplay from "@molecules/CoinsDisplay";

const HomeDisplay = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>WWF</CustomText>
        <CustomImage imageName="panda" style={styles.image} />
      </View>
      <View style={styles.coinsDisplay}>
        <CoinsDisplay userCoins />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  content: {
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
  coinsDisplay: {
    position: "absolute",
    top: 100,
    right: -90,
    zIndex: 1,
  },
});

export default HomeDisplay;
