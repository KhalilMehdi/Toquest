import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "@utils/firebase";
import Card from "@molecules/QuestCard";
import { onAuthStateChanged } from "firebase/auth";

const QuestDisplay = () => {
  const [quests, setQuests] = useState([]);

  const getUserName = async (docId) => {
    try {
      const userSnapshot = await getDoc(doc(db, "users", docId));
      if (userSnapshot.exists()) {
        return userSnapshot.data().username;
      } else {
        console.warn(`User data not found for document ID: ${docId}`);
        return "";
      }
    } catch (error) {
      console.error(
        `Error fetching user data for document ID: ${docId}`,
        error
      );
      return "";
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const questsUnsubscribe = fetchQuests();
        return () => {
          questsUnsubscribe();
        };
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchQuests = () => {
    const userId = auth.currentUser.uid;
    const questRef = collection(db, "quests");
    const acceptedQuestsRef = collection(db, "acceptedQuests");

    const updateQuestsState = async () => {
      const [questSnapshot, acceptedQuestsSnapshot] = await Promise.all([
        getDocs(questRef),
        getDocs(query(acceptedQuestsRef, where("userId", "==", userId))),
      ]);

      const acceptedQuestsData = acceptedQuestsSnapshot.docs.reduce(
        (acc, doc) => {
          acc[doc.data().questId] = doc.data();
          return acc;
        },
        {}
      );

      const questData = questSnapshot.docs
        .filter((doc) => {
          const quest = acceptedQuestsData[doc.id];
          return !quest || !quest.isCompleted;
        })
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
      setQuests(questData);
    };

    const unsubscribeQuests = onSnapshot(questRef, updateQuestsState);
    const unsubscribeAcceptedQuests = onSnapshot(
      query(acceptedQuestsRef, where("userId", "==", userId)),
      updateQuestsState
    );

    return () => {
      unsubscribeQuests();
      unsubscribeAcceptedQuests();
    };
  };

  const updateUserCoins = async (userId, coinsNumber) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        await updateDoc(userRef, {
          coins: userSnapshot.data().coins + coinsNumber,
        });
      } else {
        console.warn(`User data not found for document ID: ${userId}`);
      }
    } catch (error) {
      console.error(
        `Error updating user coins for document ID: ${userId}`,
        error
      );
    }
  };

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const acceptedQuestsRef = collection(db, "acceptedQuests");

    const unsubscribe = onSnapshot(
      query(acceptedQuestsRef, where("userId", "==", userId)),
      (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "modified" && change.doc.data().isCompleted) {
            const coinsNumber = change.doc.data().coinsNumber;
            await updateUserCoins(userId, coinsNumber);
          }
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggleAccept = async (isAccepted, questId, coinsNumber) => {
    const userId = auth.currentUser.uid;
    const username = await getUserName(userId);

    const acceptedQuestsRef = collection(db, "acceptedQuests");
    const querySnapshot = await getDocs(
      query(
        acceptedQuestsRef,
        where("userId", "==", userId),
        where("questId", "==", questId)
      )
    );

    if (isAccepted) {
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    } else {
      if (querySnapshot.empty) {
        await addDoc(acceptedQuestsRef, {
          userId: userId,
          username: username,
          questId: questId,
          coinsNumber: coinsNumber,
          isCompleted: false,
        });
      } else {
        const docRef = doc(db, "acceptedQuests", querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          isCompleted: true,
        });
      }
    }
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
            onToggleAccept={handleToggleAccept}
            questId={item.id}
            withButton
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
  },
});

export default QuestDisplay;
