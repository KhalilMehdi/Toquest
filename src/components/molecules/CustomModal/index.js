import React, { useState } from "react";
import { Modal, View, StyleSheet, Alert } from "react-native";
import CustomButton from "@atoms/CustomButton";
import CustomText from "@atoms/CustomText";

const CustomModal = ({ text }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 2,
      alignItems: "center",
      elevation: 2,
    },
    openButton: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    text: {
      padding: 16,
    },
  });
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Le modal a été fermé.");
        }}
      >
        <View style={styles.modalView}>
          <CustomText style={styles.text}>{text}</CustomText>
          <CustomButton
            title="Fermer"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      </Modal>

      <CustomButton
        title="Ouvrir le modal"
        onPress={() => {
          setModalVisible(true);
        }}
      />
    </View>
  );
};

export default CustomModal;
