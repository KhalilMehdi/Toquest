import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const backgroundImages = {
  plain: require("assets/images/plain.jpg"),
  forest: require("assets/images/forest.jpg"),
  wood: require("assets/images/wood.png"),
};

const BackgroundImage = ({ children, imageKey }) => {
  const source = backgroundImages[imageKey] || backgroundImages.image1;
  return (
    <ImageBackground source={source} style={styles.backgroundImage}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
  },
});

export default BackgroundImage;
