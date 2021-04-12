import React, { useEffect, useContext } from "react";
import SpeedText from "../../../shared/SpeedText/SpeedText";
import { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import AlertModal from "../../../shared/UIElements/AlertModal";
// interface Props {
//   book: any;
// }
const Subvocalization = (props) => {
  const { book, dispatch } = props;
  let currWpm = 100; // Fetch from firebase
  const [wpm, setWpm] = useState(currWpm);
  const [wpmIndex, setWpmIndex] = useState(0);
  const [paused, setPaused] = useState(true);
  const [continueModalVisible, setContinueModalVisible] = useState(false);
  //const currStartIndex =  fetch from firebase. user.book[book.id].currIndex elns

  //console.log(book);
  const numWords = 1;
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        setPaused(false);
      }, 500);
    }
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        if (wpmIndex > 1) {
          setPaused(true);
          setTimeout(() => {
            dispatch({ type: "show_next_screen_button" });
          }, 500);
        } else {
          setPaused(true);
          setContinueModalVisible(true);
        }
      }, 3000);
    }
    return () => {
      mounted = false;
    };
  }, [wpm]);

  function handleContinueButtonPress() {
    setWpm(wpm + 200);
    setWpmIndex(wpmIndex + 1);
    setContinueModalVisible(false);
    setPaused(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.speedTextContainer}>
        <SpeedText
          wpm={wpm}
          book={book.text}
          numWords={numWords}
          paused={paused}
          handlePause={() => setPaused(true)}
        />
      </View>
      {continueModalVisible && (
        <AlertModal
          modalText="Speed will now increase by 100 wpm"
          buttonText="Continue"
          modalVisible={continueModalVisible}
          setModalVisible={setContinueModalVisible}
          onPress={handleContinueButtonPress}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  speedTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Subvocalization;
