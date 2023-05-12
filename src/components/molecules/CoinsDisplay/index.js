import React, { useEffect, useState } from "react";
import { auth, db } from "@utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { View, StyleSheet } from "react-native";
import CustomImage from "@atoms/CustomImage";
import CustomText from "@atoms/CustomText";

const CoinsDisplay = () => {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(userDocRef, (userDocSnap) => {
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setCoins(userData.coins);
        } else {
          console.log("Aucun document trouvé !");
        }
      });

      return () => {
        unsubscribe();
      };
    } else {
      console.log("Utilisateur non connecté.");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.coinContainer}>
        <CustomText>{coins}</CustomText>
        <CustomImage imageName="coin" style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 100,
    right: 15,
    borderRadius: 2,
  },
  coinContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default CoinsDisplay;
