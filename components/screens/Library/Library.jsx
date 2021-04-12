import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  LogBox,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import BookImage from "./BookImage";
import { books } from "../../../bookObjects/books";
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { height, width } = Dimensions.get("window");
const Library = ({ navigation }) => {
  const isFocused = useIsFocused();
  // useEffect(() => {
  //   fetch("http://gutendex.com/books/")
  //     .then((res) => res.json())
  //     .then((data) => setBooks(data.results))
  //     .catch((error) => console.log(error));
  // }, []);
  let numCols = 2;
  let bookSize = "small";
  if (width > 600) {
    numCols = Math.ceil(width / 500);
    bookSize = "large";
  }
  const listOpacity = useSharedValue(0.5);
  const listScale = useDerivedValue(() => {
    return interpolate(
      listOpacity.value,
      [0.5, 1],
      [0.95, 1],
      Extrapolate.CLAMP
    );
  });

  const listAnimation = useAnimatedStyle(() => {
    return {
      opacity: listOpacity.value,
      transform: [{ scale: listScale.value }],
    };
  });

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.7}
      style={styles.item}
      onPress={() => {
        navigation.navigate("BookInfo", {
          id: item.id,
          title: item.title,
          img: item.img,
          text: item.text,
          author: item.author,
          about: item.about,
          shadowColor: item.shadowColor,
        });
      }}
    >
      <BookImage img={item.img} shadowColor={item.shadowColor} />
    </TouchableOpacity>
  );

  useEffect(() => {
    listOpacity.value = withTiming(1, { duration: 800 });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>LIBRARY</Text>
      </View>
      <Animated.View style={[styles.listContainer, listAnimation]}>
        <FlatList
          data={books}
          numColumns={numCols}
          contentContainerStyle={styles.listStyle}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <Text
              style={{
                color: "#444",
                textAlign: "center",
                paddingVertical: 50,
              }}
            >
              More books coming soon!
            </Text>
          )}
        />
      </Animated.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
  },
  listContainer: {
    //backgroundColor: "red",
  },
  listStyle: {
    flexGrow: 1,
    alignSelf: "center",
    paddingBottom: 70,
    //backgroundColor: "red",
  },
  itemContainer: {
    height: 200,
    width: 160,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  item: {
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.03,
  },

  header: {
    paddingBottom: 25,
    marginHorizontal: 70,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    opacity: 0.7,
  },
});
export default Library;
