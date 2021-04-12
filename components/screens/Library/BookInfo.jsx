import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookImage from "./BookImage";
import { BookContext } from "../../shared/contexts/BookContext";
import colors from "../../../config/colors";
import * as Haptics from "expo-haptics";
import {
  deviceHeight,
  deviceWidth,
  calcHeight,
  calcWidth,
} from "../../shared/helpers/deviceDimensions";
import ReadMore from "react-native-read-more-text";
import { LinearGradient } from "expo-linear-gradient";

const BookInfo = ({ route, navigation }) => {
  const { id, title, img, text, author, about, shadowColor } = route.params;

  const [storedBook, setStoredBook, loading, counter] = useContext(BookContext);

  async function saveBook() {
    const bookObj = { id: id, title: title, text: text, img: img };
    setStoredBook(() => bookObj);
    try {
      await AsyncStorage.setItem("book", JSON.stringify(bookObj));
      let allBooks = await AsyncStorage.getItem("books");
      allBooks = JSON.parse(allBooks);
      if (allBooks == null) {
        allBooks = [bookObj];
      } else {
        let unique = true;
        for (let i = 0; i < allBooks.length; i++) {
          if (allBooks[i].title == bookObj.title) {
            unique = false;
          }
        }
        if (unique) {
          allBooks.push(bookObj);
        }
      }
      await AsyncStorage.setItem("books", JSON.stringify(allBooks));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.blankTopContainer}></View>

      <ImageBackground
        source={img}
        style={styles.imgBackground}
        imageStyle={{ resizeMode: "cover" }}
        blurRadius={8}
      />

      <LinearGradient
        colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.3)"]}
        start={[0, 1]}
        end={[1, 0]}
        style={styles.glass}
      />
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.leftBorderContainer}></View>
          <View style={styles.bookContainer}>
            <BookImage
              img={img}
              bookSize={"medium"}
              shadowColor={shadowColor}
            />
          </View>
          <View style={styles.downloadButtonContainer}>
            <TouchableOpacity
              style={[styles.downloadButton, { backgroundColor: shadowColor }]}
              onPress={() => {
                Haptics.notificationAsync("success");
                saveBook();
              }}
            >
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "400",
              color: "#333",
              marginBottom: 5,
            }}
          >
            {title}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "300", color: "#333" }}>
            by {author}
          </Text>
          <View style={styles.line}></View>
        </View>
        {/* <View style={{ flex: 0.5 }}></View> */}
        <View style={styles.about}>
          {/* <ReadMore numberOfLines={3}>
            <Text style={{ lineHeight: 22, color: "#555" }}>{about}</Text>
          </ReadMore> */}
          <Text style={{ lineHeight: 25, color: "#555" }}>{about}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //borderWidth: 10,
    //borderColor: "red",
    justifyContent: "flex-start",
    backgroundColor: "lightgrey",
  },
  blankTopContainer: {
    flex: 2,
  },
  imgBackground: {
    height: "100%",
    width: "100%",
    position: "absolute",
    //opacity: 0.6,
  },
  glass: {
    //backgroundColor: "white",
    height: "100%",
    width: "100%",
    position: "absolute",
    //opacity: 0.6,
  },
  card: {
    flex: 4,
    borderTopLeftRadius: 60,
    //top: calcHeight(24),
    backgroundColor: "white",
    //borderWidth: 3,
    //borderColor: "purple",
    justifyContent: "space-around",
  },
  cardTop: {
    flex: 2.2,
    //backgroundColor: "red",
    flexDirection: "row",
  },
  leftBorderContainer: {
    flex: 1,
    //backgroundColor: "red",
  },

  bookContainer: {
    flex: 4,
    //backgroundColor: "blue",
    top: calcHeight(-5),
    alignItems: "flex-start",
    alignSelf: "flex-end",
    //marginLeft: calcWidth(12),
  },
  downloadButtonContainer: {
    flex: 5,
    top: calcHeight(-2),
    alignItems: "center",
    alignSelf: "flex-start",
    //backgroundColor: "skyblue",
  },
  downloadButton: {
    alignItems: "center",
    justifyContent: "center",
    width: calcWidth(30),
    height: calcHeight(5),
    borderRadius: 20,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  downloadText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  titleContainer: {
    flex: -1,
    flexWrap: "nowrap",
    flexGrow: 0.5,
    //justifyContent: "flex-start",
    //alignItems: "flex-start",
    //backgroundColor: "yellow",
    //marginBottom: 10,
    marginHorizontal: calcWidth(0),
    paddingLeft: calcWidth(10),
  },
  line: {
    marginTop: 10,
    width: "90%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgrey",
  },
  authorContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    //backgroundColor: "green",
    //marginBottom: 40,
    marginHorizontal: calcWidth(5),
    paddingLeft: calcWidth(9),
    //top: calcHeight(-12),
  },
  about: {
    flex: 6,
    //backgroundColor: "cyan",
    marginLeft: calcWidth(10),
    marginRight: calcWidth(2),
    marginTop: calcHeight(2),
    //marginTop: calcWidth(5),
    // borderRadius: 20,
    // borderColor: "black",
    // paddingHorizontal: 10,
  },
});

export default BookInfo;
