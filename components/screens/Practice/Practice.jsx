import React, { useEffect } from "react";
import SpeedText from "../../shared/SpeedText/SpeedText";
import SpeedTextButton from "../../shared/SpeedText/SpeedTextButton";
import { useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Feather";
import * as Haptics from "expo-haptics";
import { BookContext } from "../../shared/contexts/BookContext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import BookImage from "../Library/BookImage";
import colors from "../../../config/colors";
import buttonConfig from "../../../config/buttonConfig";

const { height, width } = Dimensions.get("screen");

function Practice({ navigation }) {
  const [wpm, setWpm] = useState(500);
  const [numWords, setNumWords] = useState(3);
  const [paused, setPaused] = useState(true);
  const [storedBook, setStoredBook, loading, counter] = useContext(BookContext);
  //console.log(storedBook.title);

  const parent = navigation.dangerouslyGetParent();
  function handlePressPlayButton() {
    Haptics.notificationAsync("success");
    parent.setOptions({ tabBarVisible: false });
    setPaused(false);
  }
  function handlePressPauseButton() {
    parent.setOptions({ tabBarVisible: true });
    setPaused(true);
  }

  const settingsButtonRotate = useSharedValue(0);
  const playButtonSize = useSharedValue(0);

  const isFocused = useIsFocused();
  useEffect(() => {}, [isFocused]);

  return (
    <TouchableOpacity
      onPress={() => !paused && handlePressPauseButton()}
      style={{ flex: 1 }}
      activeOpacity={1}
    >
      <SafeAreaView style={styles.container}>
        {paused && (
          <View style={styles.header}>
            <View style={styles.bookInfo}>
              {/* <Text style={styles.bookInfoText}>Current book</Text> */}
              <BookImage img={storedBook.img} bookSize={"x-small"} />
            </View>
            <View style={[styles.settingsButton]}>
              <TouchableOpacity
                onPress={() => {
                  setPaused(true);
                  parent.setOptions({ tabBarVisible: true });
                  navigation.navigate("SettingsModal", {
                    wpm: wpm,
                    numWords: numWords,
                    setNumWords: setNumWords,
                    setWpm: setWpm,
                  });
                }}
              >
                <Icon name="settings" size={30} color={buttonConfig.color} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!loading && (
          <>
            <View style={styles.speedTextContainer}>
              <SpeedText
                wpm={wpm}
                book={storedBook.text}
                numWords={numWords}
                paused={paused}
                handlePause={handlePressPauseButton}
              ></SpeedText>
            </View>
            <View style={styles.speedButtonContainer}>
              {paused && (
                <SpeedTextButton
                  handlePress={handlePressPlayButton}
                  paused={paused}
                />
              )}
            </View>
          </>
        )}
      </SafeAreaView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookInfo: {
    marginLeft: wp("2%"),
    alignItems: "center",
    //borderWidth: 2,
  },
  bookInfoText: {
    paddingBottom: hp("1%"),
  },
  settingsButton: {
    //alignSelf: "flex-end",
    right: 0,
    left: 0,
    marginRight: 15,

    // top: 45, // Add responsive padding
    // left: 10, // Add responsive padding
  },
  speedTextContainer: {
    position: "absolute",
    top: height * 0.45,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  speedButtonContainer: {
    position: "absolute",
    top: height * 0.48,
    alignSelf: "center",
    justifyContent: "flex-start",
  },
});

export default Practice;
