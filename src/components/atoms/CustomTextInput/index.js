import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@atoms/CustomText";

const CustomTextInput = ({
  onChange,
  value,
  placeholder,
  secureTextEntry,
  label,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleEyePress = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View>
      {label && <CustomText>{label}</CustomText>}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onChangeText={onChange}
        />
        {secureTextEntry && (
          <TouchableOpacity style={styles.eyeButton} onPress={handleEyePress}>
            <Ionicons
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    marginVertical: 8,
    borderColor: "black",
    borderWidth: 4,
    paddingHorizontal: 16,
    width: "80%",
    marginBottom: 24,
  },
  input: {
    flex: 1,
    paddingVertical: 4,
  },
});
