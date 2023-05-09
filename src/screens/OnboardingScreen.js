import React, { useEffect, useState } from "react";
import { View } from "react-native";
import BackgroundImage from "components/atoms/BackgroundImage";
import Slider from "components/molecules/Slider";

const OnboardingScreen = (props) => {
  const [isOnboardingFinished, setIsOnboardingFinished] = useState(false);

  useEffect(() => {
    if (isOnboardingFinished) {
      props.setOnboardingCompleted();
    }
  }, [isOnboardingFinished]);

  const goToLogin = () => {
    setIsOnboardingFinished(true);
  };

  const slidesContent = [
    {
      title: "Bienvenue !",
      description:
        "Ici, vous pouvez gagner des jetons en accomplissant des taches et des succes definis par vos associations.",
    },
    {
      description:
        "Les jetons sont crees et attribues par vos associations pour vous recompenser et vous motiver a accomplir plus de choses ensemble",
    },
    {
      description:
        "Nous esperons que vous apprecierez l'experience et que vous serez inspire a contribuer d’avantage a vos association grace a notre application. Amusez-vous bien !",
    },
  ];

  return (
    <BackgroundImage imageKey="forest">
      <View style={{ flex: 1 }}>
        <Slider slidesContent={slidesContent} onFinish={goToLogin} />
      </View>
    </BackgroundImage>
  );
};

export default OnboardingScreen;
