import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
import { auth, db, storage } from "@utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateEmail, sendPasswordResetEmail } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import ImagePicker from "@molecules/CustomImagePicker";
import TextField from "@atoms/CustomTextInput";
import CustomButton from "@atoms/CustomButton";
import CustomText from "@atoms/CustomText";
import AuthContext from "@context/authContext";

const Profile = () => {
  const { handleLogout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    const userId = auth.currentUser.uid;
    const userSnapshot = await getDoc(doc(db, "users", userId));

    if (userSnapshot.exists()) {
      setUsername(userSnapshot.data().username);
      setEmail(userSnapshot.data().email);
      setProfileImage(userSnapshot.data().profileImage);
    }
    setIsLoading(false);
  };

  const uploadProfileImage = async (imageUri) => {
    setIsLoading(true);
    const user = auth.currentUser;
    const userId = user.uid;

    const fileExtension = imageUri.split(".").pop();
    const fileType = `image/${fileExtension}`;

    const storageRef = ref(storage, `profileImages/${userId}.${fileExtension}`);

    const metadata = {
      contentType: fileType,
    };

    const response = await fetch(imageUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob, metadata);
    const profileImageUrl = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "users", userId), {
      profileImage: profileImageUrl,
    });

    setProfileImage(profileImageUrl);
    setIsLoading(false);
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    const user = auth.currentUser;
    const userId = user.uid;

    await updateEmail(user, email);

    await updateDoc(doc(db, "users", userId), {
      email: email,
      username: username,
    });

    Alert.alert("Succès", "Profil mis à jour avec succès !");
    setIsLoading(false);
  };

  const handleResetPassword = async () => {
    await sendPasswordResetEmail(auth, email);
    Alert.alert(
      "Réinitialisation du mot de passe",
      "Un e-mail de réinitialisation du mot de passe a été envoyé à votre adresse e-mail."
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          profileImage ? { uri: profileImage } : require("@images/forest.jpg")
        }
        style={styles.profileImage}
      />
      <ImagePicker onImagePicked={uploadProfileImage} />
      <TextField
        label="Pseudo"
        value={username}
        placeholder="Entrer votre pseudo"
        onChange={(text) => setUsername(text)}
      />
      <TextField
        label="Email"
        value={email}
        placeholder="Email"
        onChange={(text) => setEmail(text)}
      />
      <CustomButton
        onPress={handleUpdateProfile}
        title="Appliquer"
        isLoading={isLoading}
      />
      <TouchableOpacity onPress={handleResetPassword}>
        <CustomText style={styles.passwordReset}>
          Reinitialisation du mot de passe{" "}
        </CustomText>
      </TouchableOpacity>
      <View style={styles.logoutContainer}>
        <CustomButton
          style={styles.logoutButton}
          onPress={handleLogout}
          title="Deconnexion"
          customColor="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    alignSelf: "center",
    margin: 16,
  },
  logoutContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 8,
  },
  passwordReset: {
    fontSize: 14,
    color: "#5DC8D0",
    marginTop: 16,
    marginBottom: 16,
    alignSelf: "center",
  },
});

export default Profile;
