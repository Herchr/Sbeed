import React, { useEffect, useContext } from "react";
import RegressionSpeedText from "../../../shared/SpeedText/RegressionSpeedText";
import { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import AlertModal from "../../../shared/UIElements/AlertModal";
// interface Props {
//   book: any;
// }
const Regression = (props) => {
  const { book, dispatch } = props;
  let currWpm = 300; // Fetch from firebase
  const [wpm, setWpm] = useState(currWpm);
  const [iteration, setIteration] = useState(0);
  const [paused, setPaused] = useState(true);
  const [continueModalVisible, setContinueModalVisible] = useState(false);
  const [nextScreenModalVisible, setNextScreenModalVisible] = useState(false);
  //const currStartIndex =  fetch from firebase. user.book[book.id].currIndex elns
  //console.log(book);
  const numWords = 1;
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        setPaused(false);
      }, 1000);
    }
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        if (iteration > 2) {
          setPaused(true);
          setNextScreenModalVisible(true);
        } else {
          setPaused(true);
          setContinueModalVisible(true);
        }
      }, 15000);
    }
    return () => {
      mounted = false;
    };
  }, [wpm]);

  function handleContinue() {
    setWpm(wpm + 100);
    setIteration(iteration + 1);
    setContinueModalVisible(false);
    setPaused(false);
  }
  function handleNext() {
    dispatch({ type: "next_screen" });
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.speedTextContainer}> */}
      <RegressionSpeedText
        wpm={wpm}
        book={book.text}
        paused={paused}
        handlePause={() => setPaused(true)}
      />
      {/* </View> */}
      {continueModalVisible && (
        <AlertModal
          modalText="Speed will now increase by 100wpm"
          buttonText="Continue"
          modalVisible={continueModalVisible}
          setModalVisible={setContinueModalVisible}
          onPress={handleContinue}
        />
      )}
      {nextScreenModalVisible && (
        <AlertModal
          modalText=""
          buttonText="Next"
          modalVisible={nextScreenModalVisible}
          setModalVisible={setNextScreenModalVisible}
          onPress={handleNext}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "red",
  },
  speedTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
});

export default Regression;
