import React, { useEffect, useState } from "react";
import { auth, db } from "@utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { View, StyleSheet } from "react-native";
import CustomImage from "@atoms/CustomImage";
import CustomText from "@atoms/CustomText";

const CoinsDisplay = ({
  coinsNumber,
  userCoins,
  coinTextStyle,
  imageStyle,
}) => {
  const [userCoinsNumber, setUserCoinsNumber] = useState(0);

  useEffect(() => {
    if (userCoins) {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, (userDocSnap) => {
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserCoinsNumber(userData.coins);
          } else {
            console.log("No document found!");
          }
        });

        return () => {
          unsubscribe();
        };
      } else {
        console.log("User not logged in.");
      }
    }
  }, [userCoins]);

  return (
    <View style={styles.coinsIconContainer}>
      <CustomText
        style={StyleSheet.flatten([styles.coinsNumber, coinTextStyle])}
      >
        {userCoins ? userCoinsNumber : coinsNumber}
      </CustomText>
      <CustomImage
        imageName="coin"
        style={StyleSheet.flatten([styles.image, imageStyle])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  coinsIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  coinsNumber: {
    marginRight: 5,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default CoinsDisplay;
