import React from "react";
import * as Icons from "assets/icons";
import { SvgXml } from "react-native-svg";
import { StyleSheet } from "react-native";

const CustomIcon = ({ iconName, width, height, color }) => {
  const icon = Icons[iconName] && Icons[iconName](color);

  return (
    <SvgXml
      xml={icon}
      width={width || 24}
      height={height || 24}
      style={styles.icon}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 26,
  },
});

export default CustomIcon;
