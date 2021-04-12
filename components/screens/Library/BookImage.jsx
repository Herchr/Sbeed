import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import {
  deviceHeight,
  deviceWidth,
  calcHeight,
  calcWidth,
} from "../../shared/helpers/deviceDimensions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BookCard = (props) => {
  const { img, uri, title, bookSize, shadowColor, customBookSize } = props;
  let factor = 1;

  if (bookSize == "small") {
    factor = 0.9;
  } else if (bookSize == "medium") {
    factor = 1.1;
  } else if (bookSize == "large") {
    factor = 1.5;
  } else if (customBookSize) {
    factor = customBookSize;
  }
  let bookWidth = 130 * factor;
  let bookHeight = bookWidth * 1.4 * factor;
  let borderRadius = 5 * factor * 1.2;
  if (bookSize == "x-small") {
    bookWidth = 130 * 0.5;
    bookHeight = bookWidth * 1.3;
  }
  return (
    <View
      style={{
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      }}
    >
      <View
        style={[
          styles.cardContainer,
          {
            height: bookHeight,
            width: bookWidth,
            borderRadius: borderRadius,
          },
        ]}
      >
        {uri ? (
          <ImageBackground source={{ uri: uri }} style={styles.img}>
            <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        ) : (
          <ImageBackground
            defaultSource={img}
            source={img}
            style={styles.img}
            imageStyle={{
              resizeMode: "stretch",
            }}
          >
            <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 5,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  shadow: {},
  title: {
    position: "absolute",
    bottom: 15,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  img: {
    height: "100%",
    width: "100%",
  },
});

export default BookCard;
