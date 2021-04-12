import React, { useContext, useEffect, useState } from "react";
import * as firebase from "firebase";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import WpmChart from "./WpmChart";
import BookImage from "../Library/BookImage";
import { BookContext } from "../../shared/contexts/BookContext";
import BookCarousel from "./BookCarousel";
import { books } from "../../../bookObjects/books";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../../config/colors";
import {
  calcHeight,
  calcWidth,
  deviceWidth,
  deviceHeight,
} from "../../shared/helpers/deviceDimensions";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import buttonConfig from "../../../config/buttonConfig";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  const [storedBook, setStoredBook, loading, counter] = useContext(BookContext);
  const wpms = [250, 400, 500, 550]; // Set dynamic from localstorage

  function handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.username}>
        {firebase.auth().currentUser.displayName
          ? firebase.auth().currentUser.displayName
          : "Unknown name"}
      </Text> */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          marginBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wpmChart}>
          <Text style={styles.wpmChartText}>Your WPM Progress</Text>
          <WpmChart wpms={wpms} />
        </View>
        <View style={styles.allButtonsContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate("YourBooks");
            }}
          >
            <MaterialIcons name="library-books" size={24} color="black" />

            <Text style={styles.buttonText}>Your books</Text>
          </TouchableOpacity>

          <View style={styles.border}></View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Ionicons
              name="ios-color-palette-outline"
              size={24}
              color="black"
            />

            <Text style={styles.buttonText}>Color theme</Text>
          </TouchableOpacity>
          <View style={styles.border}></View>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.buttonContainer}
          >
            <FontAwesome name="sign-out" size={24} />

            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "blue",
  },
  username: {
    textAlign: "left",
    fontSize: 20,
    marginBottom: 15,
    marginLeft: 10,
    //backgroundColor: "red",
  },
  border: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: buttonConfig.color,
  },
  buttonContainer: {
    //backgroundColor: colors.tertiary,
    marginHorizontal: wp("1%"),
    paddingVertical: 20,
    flexDirection: "row",
  },
  buttonText: {
    color: buttonConfig.color,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
    paddingHorizontal: wp("2%"),
  },
  allButtonsContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: buttonConfig.color,
    marginVertical: hp("4%"),
  },
  myBooksContainer: {
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: calcHeight(5),
    shadowRadius: 10,
    shadowColor: "#333",
    shadowOpacity: 0.2,
    marginHorizontal: calcWidth(5),
  },
  wpmChart: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: hp("5%"),
    shadowRadius: 10,
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
    },
    marginHorizontal: calcWidth(5),
  },
  wpmChartText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "300",
    opacity: 0.8,
    marginVertical: 30,
  },
});

export default Profile;
