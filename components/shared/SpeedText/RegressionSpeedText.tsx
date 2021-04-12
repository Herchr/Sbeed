import React, { useState, useEffect, useContext, useRef } from "react";
import { AppState, View, Text, StyleSheet } from "react-native";
import ReactInterval from "react-interval";
import { calcWidth } from "../helpers/deviceDimensions";
import { BookContext } from "../../shared/contexts/BookContext";

interface Props {
  wpm: number;
  book: [string];
  paused: boolean;
  handlePause: () => void;
}

const RegressionSpeedText: React.FC<Props> = (props) => {
  const { wpm, book, paused, handlePause } = props;

  const [storedBook, setStoredBook, loadingBook, counter] = useContext(
    BookContext
  );
  const initialStartIndex = storedBook.currStartIndex
    ? storedBook.currStartIndex
    : 0;
  const [numWords, setNumWords] = useState(5);
  const [currStartIndex, setCurrStartIndex] = useState(initialStartIndex); // Fetch from firebase
  const [words, setWords] = useState(book.slice(0, numWords));
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const didMount = useRef(false);
  //console.log(wpm, "speedtext.tsx");

  let wps = wpm / 60;
  let interval = 1000 / wps;

  const [viewHeight, setViewHeight] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  useEffect(() => {
    didMount.current
      ? setWords(book.slice(currStartIndex, currStartIndex + numWords))
      : (didMount.current = true);
  }, [numWords]);

  useEffect(() => {
    setWords(book.slice(0, numWords));
  }, [book]);

  useEffect(() => {
    AppState.addEventListener("change", handleExitApp);

    return () => {
      AppState.removeEventListener("change", handleExitApp);
    };
  }, []);

  useEffect(() => {
    //console.log(viewHeight);
    //console.log(textHeight);
    if (viewHeight > 0 && textHeight > 0) {
      setLoading(false);
    }
  }, [viewHeight, textHeight]);
  useEffect(() => {
    !loading && setNumWords(Math.floor(viewHeight / textHeight) - 2);
  }, [loading]);

  const handleExitApp = (newState) => {
    if (newState == "background") {
      console.log(currStartIndex);
      handlePause();
    }
  };
  //console.log(words.length);

  function updateCurrWords() {
    if (activeWordIndex >= words.length - 1) {
      setWords(
        book.slice(currStartIndex + numWords, currStartIndex + numWords * 2)
      );
      setActiveWordIndex(0);
      setCurrStartIndex(currStartIndex + numWords);
    } else {
      setActiveWordIndex(activeWordIndex + 1);
    }
  }
  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        setViewHeight(event.nativeEvent.layout.height);
      }}
    >
      {!paused && (
        <ReactInterval
          timeout={interval}
          enabled={true}
          callback={updateCurrWords}
        />
      )}
      {words.map((word, index) => (
        <Text
          key={index}
          style={index === activeWordIndex ? styles.activeText : styles.text}
          onLayout={(event) => {
            setTextHeight(event.nativeEvent.layout.height);
          }}
        >
          {word}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "pink",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: calcWidth(3),
  },
  text: {
    fontSize: 30,
    color: "#B0B0B0",
  },
  activeText: {
    fontSize: 30,
  },
});

export default RegressionSpeedText;
