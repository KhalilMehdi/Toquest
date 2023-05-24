import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "@utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Card from "@molecules/QuestCard";

const CompletedQuestDisplay = () => {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const questsUnsubscribe = fetchQuests();
        return () => {
          questsUnsubscribe();
        };
      } else {
        console.log("Aucun utilisateur connecté.");
      }
    });

    return () => {
      authUnsubscribe();
    };
  }, []);

  const fetchQuests = () => {
    const userId = auth.currentUser.uid;
    const acceptedQuestsRef = collection(db, "acceptedQuests");
    const q = query(
      acceptedQuestsRef,
      where("userId", "==", userId),
      where("isCompleted", "==", true)
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const completedQuestData = [];
      for (const acceptedQuestDoc of querySnapshot.docs) {
        const questSnapshot = await getDoc(
          doc(db, "quests", acceptedQuestDoc.data().questId)
        );
        if (questSnapshot.exists()) {
          completedQuestData.push({
            ...questSnapshot.data(),
            id: questSnapshot.id,
          });
        }
      }
      setQuests(completedQuestData);
    });

    return unsubscribe;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={quests}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            description={item.description}
            coinsNumber={item.coins_number}
            completed
            questId={item.id}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CompletedQuestDisplay;
