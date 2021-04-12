import React, { useEffect, useContext } from "react";
import SpeedText from "../../../shared/SpeedText/SpeedText";
import { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import AlertModal from "../../../shared/UIElements/AlertModal";
interface Props {
  book: any;
}
const Fixation: React.FC<Props> = (props) => {
  let currWpm = 300; // Fetch from firebase
  const [wpm, setWpm] = useState(currWpm);
  const [iteration, setIteration] = useState(0);
  const [numWords, setNumWords] = useState(1);
  const [paused, setPaused] = useState(true);
  const [continueModalVisible, setContinueModalVisible] = useState(false);
  const [nextScreenModalVisible, setNextScreenModalVisible] = useState(false);

  const { book } = props;

  //const currStartIndex =  fetch from firebase. user.book[book.id].currIndex elns

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        setPaused(false);
      }, 5000);
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
          modalText="Number of words shown +1"
          buttonText="Continue"
          modalVisible={continueModalVisible}
          setModalVisible={setContinueModalVisible}
          onPress={() => {
            setWpm(wpm);
            setNumWords(numWords + 1);
            setIteration(iteration + 1);
            setContinueModalVisible(false);
            setPaused(false);
          }}
        />
      )}
      {nextScreenModalVisible && (
        <AlertModal
          modalText="Number of words shown +1"
          buttonText="Continue"
          modalVisible={nextScreenModalVisible}
          setModalVisible={setNextScreenModalVisible}
          onPress={() => {
            setWpm(wpm);
            setNumWords(numWords + 1);
            setIteration(iteration + 1);
            setNextScreenModalVisible(false);
            setPaused(false);
          }}
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

export default Fixation;
