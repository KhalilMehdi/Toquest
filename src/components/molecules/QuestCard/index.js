import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "@atoms/CustomButton";
import CustomText from "@atoms/CustomText";

const QuestCard = ({
  title,
  description,
  coinsNumber,
  onToggleAccept,
  questId,
  withButton,
}) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleToggleAccept = () => {
    onToggleAccept(isAccepted, questId, coinsNumber);
    setIsAccepted(!isAccepted);
  };

  const buttonText = isAccepted ? "Annuler" : "Valider";
  const buttonColor = isAccepted ? "#000" : "#5DC8D0";

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <CustomText style={styles.title}>{title}</CustomText>
        <CustomText style={styles.description}>{description}</CustomText>
      </View>
      <View style={styles.coinsButtonContainer}>
        <CustomText style={styles.coinsNumber}>Coins: {coinsNumber}</CustomText>
        {withButton && (
          <CustomButton
            onPress={handleToggleAccept}
            title={buttonText}
            customColor={buttonColor}
            style={styles.button}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    margin: 16,
    backgroundColor: "white",
    padding: 16,
    alignItems: "flex-end",
  },
  content: {
    flex: 1,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    color: "#000",
  },
  description: {
    fontSize: 12,
    color: "#000",
  },
  coinsNumber: {
    fontSize: 16,
  },
  coinsButtonContainer: {
    marginTop: 16,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default QuestCard;
