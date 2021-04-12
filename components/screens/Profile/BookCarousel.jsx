import React, { useCallback } from "react";
import { View, Text, Dimensions, FlatList } from "react-native";
import BookImage from "../Library/BookImage";
import { calcWidth, calcHeight } from "../../shared/helpers/deviceDimensions";

const BookCarousel = (props) => {
  const { books, currBook } = props;

  function calcPosition(index) {
    const itemsAway = (3 - index) * (3 - index) * 0.1;
    return itemsAway;
  }
  const booksCopy = books.slice();
  let book3 = booksCopy[4];
  for (let i = 0; i < booksCopy.length; i++) {
    if (booksCopy[i].title == currBook.title) {
      book3 = booksCopy[i];
      booksCopy.splice(i, 1);
    }
  }
  const bookWidth = calcWidth(18) * 0.5;
  const book1 = booksCopy[0];
  const book2 = booksCopy[1];
  const book4 = booksCopy[2];
  const book5 = booksCopy[3];
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        //backgroundColor: "red",
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
    >
      <View style={{ left: bookWidth * 1.4, opacity: 0.7, zIndex: 0 }}>
        <BookImage img={book1.img} customBookSize={0.5} />
      </View>
      <View
        style={{
          left: bookWidth * 0.8,
          opacity: 0.9,
          zIndex: 5,
        }}
      >
        <BookImage img={book2.img} customBookSize={0.6} />
      </View>
      <View style={{ zIndex: 10 }}>
        <BookImage img={book3.img} customBookSize={0.7} />
      </View>
      <View style={{ left: -bookWidth * 0.8, opacity: 0.9, zIndex: 5 }}>
        <BookImage img={book4.img} customBookSize={0.6} />
      </View>
      <View style={{ left: -bookWidth * 1.4, opacity: 0.7, zIndex: 0 }}>
        <BookImage img={book5.img} customBookSize={0.5} />
      </View>
    </View>
  );
};

export default BookCarousel;
