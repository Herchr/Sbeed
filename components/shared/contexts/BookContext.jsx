import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BookContext = createContext();

export const BookProvider = (props) => {
  const [storedBook, setStoredBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  async function getStoredBook() {
    try {
      const res = await AsyncStorage.getItem("book");
      if (res) {
        setStoredBook(JSON.parse(res));
        setLoading(false);
      } else {
        setStoredBook({
          key: 900,
          img: 1,
          text: "Set book in library",
          title: "None",
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getStoredBook();
    setCounter(counter + 1);
  }, []);

  return (
    <BookContext.Provider value={[storedBook, setStoredBook, loading, counter]}>
      {props.children}
    </BookContext.Provider>
  );
};
