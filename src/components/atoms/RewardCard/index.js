import React from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "@atoms/CustomButton";
import CustomText from "@atoms/CustomText";

const RewardBox = ({
  isUnlocked,
  missingPoints,
  gift,
  points,
  progress,
  handleClaimReward,
  isClaimed,
  rewardGiven,
}) => {
  const styles = StyleSheet.create({
    container: {
      width: 300,
      height: 140,
      margin: 4,
      backgroundColor: "lightgray",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "black",
      padding: 5,
    },
    progressBarContainer: {
      height: 20,
      width: "100%",
      backgroundColor: "#eee",
      borderColor: "#000",
      borderWidth: 2,
      borderRadius: 5,
      marginBottom: 8,
    },
    progressBar: {
      height: "100%",
      width: `${progress}%`,
      backgroundColor: isUnlocked ? "green" : "blue",
      borderRadius: 5,
    },
    text: {
      fontSize: 12,
      color: "black",
      margin: 8,
    },
  });

  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>{gift}</CustomText>
      <CustomText style={styles.text}>Pieces requises : {points}</CustomText>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}></View>
      </View>
      {isUnlocked && !isClaimed ? (
        <CustomButton title="RECLAMER" onPress={handleClaimReward} />
      ) : null}
      {isUnlocked && isClaimed && !rewardGiven ? (
        <CustomText style={styles.text}>En attente</CustomText>
      ) : null}
      {!isUnlocked ? (
        <CustomText style={styles.text}>
          il te manque {missingPoints} points !
        </CustomText>
      ) : null}
      {rewardGiven && <CustomText style={styles.text}>OBTENU</CustomText>}
    </View>
  );
};

export default RewardBox;
