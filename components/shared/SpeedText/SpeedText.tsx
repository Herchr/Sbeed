import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Dispatch,
} from "react";
import { AppState, View, Text, StyleSheet } from "react-native";
import ReactInterval from "react-interval";
import { BookContext } from "../../shared/contexts/BookContext";

interface Props {
  wpm: number;
  book?: [string];
  numWords: number;
  paused: boolean;
  handlePause: any;
}

const SpeedText: React.FC<Props> = (props) => {
  const { wpm, numWords, paused, handlePause } = props;

  const [storedBook, setStoredBook, loading, counter] = useContext(BookContext);
  const book = storedBook.text;
  const initialStartIndex = storedBook.currStartIndex
    ? storedBook.currStartIndex
    : numWords;

  const [currStartIndex, setCurrStartIndex] = useState(initialStartIndex);
  const [words, setWords] = useState(book.slice(0, numWords));
  const didMount = useRef(false);

  let wps = wpm / 60;
  let wordBlocksPerSecond = wps / numWords;
  let interval = 1000 / wordBlocksPerSecond;

  useEffect(() => {
    didMount.current
      ? setWords(book.slice(currStartIndex, currStartIndex + numWords))
      : (didMount.current = true);
  }, [numWords, storedBook.currStartIndex]);

  useEffect(() => {
    setWords(book.slice(0, numWords));
  }, [book]);

  useEffect(() => {
    let book = storedBook;
    book.currStartIndex = currStartIndex;
    setStoredBook(book);
    return () => {
      console.log("dismounted");
      let book = storedBook;
      book.currStartIndex = currStartIndex;
      setStoredBook(book);
      //console.log("index", storedBook.currStartIndex);
    };
  }, [paused]);

  useEffect(() => {
    AppState.addEventListener("change", handleExitApp);

    return () => {
      AppState.removeEventListener("change", handleExitApp);
    };
  }, []);

  const handleExitApp = (newState) => {
    if (newState == "background") {
      handlePause();
    }
  };

  function updateCurrWords() {
    //console.log(words);
    setWords(book.slice(currStartIndex, currStartIndex + numWords));
    currStartIndex >= book.length // restarts the book when finished
      ? setCurrStartIndex(0)
      : setCurrStartIndex(currStartIndex + numWords);
  }
  return (
    <View style={styles.textContainer}>
      {!paused && (
        <ReactInterval
          timeout={interval}
          enabled={true}
          callback={updateCurrWords}
        />
      )}
      <Text style={styles.text}>{words}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {},
  text: {
    fontSize: 25,
  },
});

export default SpeedText;
