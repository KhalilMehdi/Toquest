import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

const CustomText = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const { font = "pixel", navigateTo } = props;
  const navigation = useNavigation();
  const fonts = {
    pixel: require("assets/fonts/pixel-font.ttf"),
  };

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        [font]: fonts[font],
      });

      setFontLoaded(true);
    }

    if (fonts.hasOwnProperty(font)) {
      loadFont();
    } else {
      console.warn(`Font "${font}" not found. Please check the font name.`);
      setFontLoaded(true);
    }
  }, [font]);

  const handlePress = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  if (navigateTo) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <Text
          style={{
            ...props.style,
            fontFamily: font,
          }}
        >
          {props.children}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <Text style={{ ...props.style, fontFamily: font }}>{props.children}</Text>
  );
};

export default CustomText;
