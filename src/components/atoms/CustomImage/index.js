import React from "react";
import { Image } from "react-native";
import images from "assets/images";

const CustomImage = ({ imageName, ...props }) => {
  const imageSource = images[imageName];

  if (!imageSource) {
    console.warn(`Image '${imageName}' not found in the assets.`);
    return null;
  }

  return <Image source={imageSource} {...props} />;
};

export default CustomImage;
