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
import BookImage from "../../Library/BookImage";
//import { books } from "../../../bookObjects/books";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteModal from "./DeleteModal/DeleteModal";

const { height, width } = Dimensions.get("window");

const YourBooks = ({ navigation }) => {
  const [books, setBooks] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  useEffect(() => {
    async function getBooks() {
      let storedBooks = await AsyncStorage.getItem("books");
      storedBooks = JSON.parse(storedBooks);
      setBooks(storedBooks);
    }
    getBooks();
  }, []);

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
  const headerX = useDerivedValue(() => {
    return interpolate(listOpacity.value, [0.5, 1], [20, 0], Extrapolate.CLAMP);
  });

  const listAnimation = useAnimatedStyle(() => {
    return {
      opacity: listOpacity.value,
      transform: [{ scale: listScale.value }],
    };
  });
  const headerAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: headerX.value }],
    };
  });

  async function onDelete() {
    const newBooks = books.filter((book) => book.id != deleteId);
    setBooks(newBooks);
    await AsyncStorage.setItem("books", JSON.stringify(newBooks));
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.item}
      onPress={() => {
        setDeleteId(item.id);
        setShowDeleteModal(true);
      }}
    >
      <BookImage img={item.img} shadowColor={item.shadowColor} />
    </TouchableOpacity>
  );

  useEffect(() => {
    listOpacity.value = withTiming(1, { duration: 700 });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, headerAnimation]}>
        <Text style={styles.headerText}>Your Books</Text>
      </Animated.View>
      <Animated.View style={[styles.listContainer, listAnimation]}>
        <FlatList
          data={books}
          keyExtractor={(item, index) => index}
          numColumns={numCols}
          contentContainerStyle={styles.listStyle}
          renderItem={renderItem}
        />
      </Animated.View>
      <DeleteModal
        onDelete={onDelete}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
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
    alignSelf: "flex-start",
    marginHorizontal: wp("5%"),
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
export default YourBooks;
