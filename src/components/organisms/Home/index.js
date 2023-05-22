import React from "react";
import { View, StyleSheet } from "react-native";
import CoinsDisplay from "@molecules/CoinsDisplay";
import CustomImage from "@atoms/CustomImage";
import CustomText from "@atoms/CustomText";

const HomeDisplay = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>WWF</CustomText>
      <View style={styles.content}>
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
    fontSize: 48,
    marginTop: 20,
    color: "white",
  },
  image: {
    width: 200,
    height: 260,
    position: "absolute",
    bottom: 0,
  },
  coinsDisplay: {
    position: "absolute",
    top: 100,
    right: -140,
    zIndex: 1,
  },
});

export default HomeDisplay;
