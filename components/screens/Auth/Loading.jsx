import React, { useEffect } from "react";
import * as firebase from "firebase";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

const Loading = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? "App" : "Login");
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Loading...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    flex: 1,
  },
});
export default Loading;
