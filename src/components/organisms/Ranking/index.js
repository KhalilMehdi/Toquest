import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@utils/firebase";
import RankingCard from "@molecules/RankingCard";
import CustomText from "@atoms/CustomText";

const fetchUsers = async (setUsers) => {
  const usersSnapshot = await getDocs(collection(db, "users"));

  const usersData = usersSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  usersData.sort((a, b) => b.coins - a.coins);

  setUsers(usersData);
};

const RankingScreen = () => {
  const [users, setUsers] = useState([]);

  const fetchUsersCallback = useCallback(() => {
    fetchUsers(setUsers);
  }, []);

  useEffect(() => {
    fetchUsersCallback();
  }, [fetchUsersCallback]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>Classement</CustomText>
      </View>
      <FlatList
        data={users}
        renderItem={({ item, index }) => (
          <RankingCard
            username={item.username}
            coins={item.coins}
            rank={index + 1}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default RankingScreen;
