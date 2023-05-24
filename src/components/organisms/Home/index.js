import React from "react";
import { View, StyleSheet } from "react-native";
import CoinsDisplay from "@molecules/CoinsDisplay";
import CustomImage from "@atoms/CustomImage";
import CustomText from "@atoms/CustomText";

const HomeDisplay = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>WWF</CustomText>
      </View>
      <View style={styles.coinsDisplay}>
        <CoinsDisplay
          userCoins
          coinTextStyle={{ fontSize: 50, color: "white" }}
          imageStyle={{ width: 60, height: 60 }}
        />
      </View>
      <View style={styles.imageContainer}>
        <CustomImage imageName="panda" style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 48,
    color: "white",
  },
  image: {
    width: 200,
    height: 260,
  },
  coinsDisplay: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
});

export default HomeDisplay;
