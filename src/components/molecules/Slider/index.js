import React, { useState, useRef } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import CustomButton from "@atoms/CustomButton";
import CustomText from "@atoms/CustomText";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Slide = ({ backgroundColor, children }) => (
  <View style={[styles.slide, { backgroundColor }]}>{children}</View>
);

const Slider = ({ slidesContent, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      scrollViewRef.current.scrollTo({
        x: newIndex * SCREEN_WIDTH,
        y: 0,
        animated: true,
      });
      return newIndex;
    });
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      scrollViewRef.current.scrollTo({
        x: newIndex * SCREEN_WIDTH,
        y: 0,
        animated: true,
      });
      return newIndex;
    });
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {slidesContent.map((slide, index) => (
          <Slide key={index} backgroundColor={slide.backgroundColor}>
            <View>
              <CustomText style={styles.title} font="pixel">
                {slide.title}
              </CustomText>
              <CustomText style={styles.description} font="pixel">
                {slide.description}
              </CustomText>
            </View>
          </Slide>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        {currentIndex > 0 && (
          <CustomButton
            onPress={goToPrevSlide}
            title="Precedent"
            style={styles.button}
          />
        )}
        {currentIndex < slidesContent.length - 1 && (
          <CustomButton
            onPress={goToNextSlide}
            title="Suivant"
            style={[styles.button, styles.nextButton]}
          />
        )}
        {currentIndex === slidesContent.length - 1 && (
          <CustomButton
            onPress={onFinish}
            title="Connexion"
            style={styles.button}
          />
        )}
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  button: {
    fontSize: 16,
    width: 144,
    height: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 40,
    color: "white",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "white",
  },
  nextButton: {
    marginLeft: "auto",
  },
});
