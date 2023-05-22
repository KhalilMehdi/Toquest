import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CoinsDisplay from "@molecules/CoinsDisplay";
import CustomText from "@atoms/CustomText";

const RankingCard = ({ username, coins, rank }) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.rank}>{rank}</CustomText>
      <CustomText style={styles.username}>{username}</CustomText>
      <CoinsDisplay coinsNumber={coins} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    elevation: 2,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "lightgray",
  },
  rank: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 16,
  },
  coins: {
    fontSize: 16,
  },
});

export default RankingCard;
