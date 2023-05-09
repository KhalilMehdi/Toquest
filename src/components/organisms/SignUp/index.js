import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { auth, db } from "@utils/firebase";
import TextField from "@atoms/CustomTextInput";
import CustomButton from "@atoms/CustomButton";
import CustomText from "@atoms/CustomText";

export default function SignUp({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = async () => {
    const userEmail = !email.includes("@") ? `${username}@example.com` : email;

    try {
      console.log("Starting sign up process...");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, {
        email: user.email,
        uid: user.uid,
        username: username,
        coins: 0,
      });

      console.log("User document created successfully.");

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        console.log("User data retrieved from Firestore:", userDoc.data());
        setIsLoggedIn(true);
      } else {
        console.log("User document not found in Firestore.");
      }
    } catch (error) {
      console.log("Sign up failed:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Inscription</CustomText>
      <TextField
        label="Nom d'utilisateur"
        value={username}
        placeholder="Entrez votre nom d'utilisateur"
        onChange={(e) => setUsername(e)}
      />
      <TextField
        label="Email"
        value={email}
        placeholder="Entrez votre adresse e-mail"
        onChange={(e) => setEmail(e)}
      />
      <TextField
        label="Mot de passe"
        value={password}
        placeholder="Entrez votre mot de passe"
        secureTextEntry={true}
        onChange={(e) => setPassword(e)}
      />
      <TextField
        label="Confirmer le mot de passe"
        value={confirmPassword}
        placeholder="Confirmez votre mot de passe"
        secureTextEntry={true}
        onChange={(e) => setConfirmPassword(e)}
      />
      <CustomButton onPress={handleSignUp} title="S'inscrire" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
  },
});
