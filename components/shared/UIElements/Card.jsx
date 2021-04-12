import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Card = (props) => {
  const { img, uri, title } = props;
  let widthFactor = 1;
  let heightFactor = 1;
  if (windowWidth > 600) {
    widthFactor = windowWidth / 375;
    heightFactor = windowHeight / 712;
  }
  let cardHeight = 240 * heightFactor;
  let cardWidth = 165 * widthFactor;

  return (
    <View style={styles.shadow}>
      <View
        style={[styles.cardContainer, { height: cardHeight, width: cardWidth }]}
      >
        {uri ? (
          <ImageBackground source={{ uri: uri }} style={styles.img}>
            <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        ) : (
          <ImageBackground source={img} style={styles.img}>
            <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    overflow: "hidden",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,

    elevation: 5,
  },
  title: {
    position: "absolute",
    bottom: 15,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  img: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Card;
