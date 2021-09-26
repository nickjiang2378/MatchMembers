import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { styles } from "../constants/Styles";
import { nameToPic } from "../constants/Constants";
import { useEffect } from "react";
import { shuffle } from "../utils/ArrayUtils";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
const names = Object.keys(nameToPic);

export default function GameScreen() {
  // TODO: Declare and initialize state variables here, using "useState".
  const [correctChoices, setCorrectChoices] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [rightName, setRightName] = useState();
  const [currentImage, setCurrentImage] = useState();
  const [currentNames, setCurrentNames] = useState();

  // State for the timer is handled for you.
  const [timeLeft, setTimeLeft] = useState(5000);

  // Called by the timer every 10 miliseconds
  const countDown = () => {
    if (timeLeft > 0) {
      // Time still left
      // TODO: update appropriate state variables
      setTimeLeft(timeLeft - 10)
    } else {
      // Time has expired
      // TODO: update appropriate state variables
      getNextRound()
      setRounds(rounds + 1)
    }
  };

  // This is used in the useEffect(...) hook bound on a specific STATE variable.
  // It updates state to present a new member & name options.
  const getNextRound = () => {
    // Fetches the next member name to guess.
    console.log("Getting next round")
    let correct = names[Math.floor(Math.random() * names.length)];
    let correctName = nameToPic[correct][0];
    let correctImage = nameToPic[correct][1];

    // Generate 3 more wrong answers.
    let nameOptions = [correctName];
    while (nameOptions.length < 4) {
      let wrong = names[Math.floor(Math.random() * names.length)];
      let wrongName = nameToPic[wrong][0];
      if (!nameOptions.includes(wrongName)) {
        nameOptions.push(wrongName);
      }
    }
    nameOptions = shuffle(nameOptions);

    // TODO: Update state here.
    setRightName(correctName);
    setCurrentNames(nameOptions)
    setCurrentImage(correctImage)

    setTimeLeft(5000);
  };

  // Called when user taps a name option.
  // TODO: Update correct # and total # state values.
  const selectedNameChoice = (index) => {
    console.log(index)
    if (currentNames[index] == rightName) {
      setCorrectChoices(correctChoices + 1)
    }
    getNextRound()
    setRounds(rounds + 1)
  };

  useEffect(() => {
    /* TODO: Call the countDown() method every 10 milliseconds */
    const interval = setInterval(() => {
      countDown();
    }, 1000); 
    return () => clearInterval(interval);
  });

  useEffect(() => {
    console.log("Initializing round")
    getNextRound()
  }, [])

  // TODO: Finish this useEffect() hook such that we automatically
  // get the next round when the appropriate state variable changes.


  // Set up four name button components
  const nameButtons = [];
  for (let i = 0; i < 4; i++) {
    const j = i;
    console.log("Creating button " + i)
    nameButtons.push(
      // TODO: Implement a Button/Pressable type that shows a name choice, and implement the functionality when a user press on it
      // Hint: Most functionality is already taken care of by one of the functions already defined      
      <TouchableOpacity
        style={styles.button}
        onPress={() => selectedNameChoice(i)}
      >
        <Text style={styles.buttonText}>{currentNames[i]}</Text>
      </TouchableOpacity>
    );
  }

  const timeRemainingStr = (timeLeft / 1000).toFixed(2);

  // Style & return the view.
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={currentImage}
      ></Image>
      <Text style={styles.scoreText}>Current Score: {correctChoices} / {rounds}</Text>
      <Text style={styles.timerText}>Time Left: {timeRemainingStr}</Text>
      {nameButtons}
      {/* TODO: Build out your UI using Text and Image components. */}
      {/* Hint: What does the nameButtons list above hold? 
          What types of objects is this list storing?
          Try to get a sense of what's going on in the for loop above. */}
    </View>
  );
}
/*
      <Image
        style={styles.image}
        source={nameToPic[correctName][1]}
      ></Image> */
