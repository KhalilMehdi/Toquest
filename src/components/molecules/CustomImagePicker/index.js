import React from "react";
import { View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "@atoms/CustomButton";

const CustomImagePicker = ({ onImagePicked }) => {
  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(
          "Désolé, nous avons besoin des permissions pour accéder à votre galerie !"
        );
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const selectedAsset = result.assets && result.assets[0];
      if (selectedAsset) {
        onImagePicked(selectedAsset.uri);
        console.log("Image sélectionnée dans ImagePicker:", selectedAsset.uri);
      }
    }
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <CustomButton title="Changer" onPress={pickImage} />
    </View>
  );
};

export default CustomImagePicker;
