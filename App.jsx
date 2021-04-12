import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import { StyleSheet, Text, View, LogBox } from "react-native";
import MainStack from "./components/shared/Navigation/MainStack";
import AuthStack from "./components/screens/Auth/AuthStack";
import { BookProvider } from "./components/shared/contexts/BookContext";
import { StatusBar } from "react-native";

import colors from "./config/colors";
import { registerRootComponent, AppLoading } from "expo";
import * as Font from "expo-font";

const firebaseConfig = {
  apiKey: "AIzaSyDO8PibosrPw8O7cdqJ_QcH4x3prZPqqH4",
  authDomain: "kvikk-ddb58.firebaseapp.com",
  databaseURL: "https://kvikk-ddb58.firebaseio.com",
  projectId: "kvikk-ddb58",
  storageBucket: "kvikk-ddb58.appspot.com",
  messagingSenderId: "889226460946",
  appId: "1:889226460946:web:52e2902cad144c013cfdcb",
  measurementId: "G-GQ60BBDM26",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function handleUserStateChange(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = firebase
      .auth()
      .onAuthStateChanged(handleUserStateChange);
    return subscriber;
  }, []);
  if (initializing) return null;
  if (!user) {
    return <AuthStack />;
  }

  return (
    <BookProvider>
      <StatusBar colors="black" />
      <MainStack />
    </BookProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
});
export default App;
