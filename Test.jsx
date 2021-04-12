import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Test = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box1}>
        <View style={{ backgroundColor: "purple", height: 200 }}></View>
      </View>
      <View style={styles.box2}>
        <View style={{ backgroundColor: "skyblue", height: 800 }}></View>
      </View>
      <View style={styles.box3}></View>
      <View style={styles.box4}></View>
      <View style={styles.box5}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  box1: {
    flex: 1,
    backgroundColor: "red",
  },
  box2: {
    flex: 1,
    backgroundColor: "yellow",
  },
  box3: {
    flex: 1,
    backgroundColor: "green",
  },
  box4: {
    flex: 1,
    backgroundColor: "blue",
  },
  box5: {
    flex: 1,
    backgroundColor: "pink",
  },
});
export default Test;
