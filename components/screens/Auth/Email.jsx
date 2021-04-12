import React, { useState } from "react";
import * as firebase from "firebase";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Animated, {
  withTiming,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import colors from "../../../config/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Email = (props) => {
  const { bgY, bgYFactor } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signingUp, setSigningup] = useState(true);

  const formX = useSharedValue(0);

  const formAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: formX.value }],
    };
  });

  let logUpButtonText = "SIGN UP";
  let changeButtonText = "LOG IN";
  if (!signingUp) {
    logUpButtonText = "LOG IN";
    changeButtonText = "SIGN UP";
  }

  function onChangeButtonText() {
    formX.value = wp("100%");
    formX.value = withTiming(0, { duration: 500 });
    setSigningup(!signingUp);
  }

  function handleLogUp() {
    signingUp
      ? firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => navigation.navigate("App"))
          .catch((error) => console.log(error))
      : firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => navigation.navigate("App"))
          .catch((error) => console.log(error));
  }

  return (
    <Animated.View style={[styles.container, formAnimation]}>
      <View style={[styles.inputContainer]}>
        <TextInput
          style={[styles.input, { marginTop: hp("5%") }]}
          value={email}
          placeholder={"Email"}
          autoCapitalize="none"
          autoCompleteType="off"
          textContentType="emailAddress"
          onChangeText={(email) => {
            setEmail(email);
          }}
          // onFocus={() => {
          //   bgY.value = withTiming(-hp("70%"), {
          //     duration: 1000,
          //   });
          // }}
          on
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          autoCapitalize="none"
          autoCompleteType="password"
          textContentType="password"
          inputAccessoryViewID="password"
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          // onFocus={() => {
          //   bgY.value = withTiming(-hp("85%"), {
          //     duration: 1000,
          //   });
          // }}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogUp}>
        <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 18 }}>
          {logUpButtonText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "center",
          flexDirection: "row",
          alignSelf: "center",
        }}
        onPress={() => onChangeButtonText()}
      >
        <Text>Already a user? </Text>
        <Text style={{ color: "red" }}>{changeButtonText}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    //backgroundColor: "red",
  },
  formContainer: {
    //flex: 4,
  },
  loginText: {
    //marginTop: 60,
    fontSize: 30,
    textAlign: "center",
    flex: 1,
    opacity: 0.8,
  },
  inputContainer: {
    marginTop: hp("5%"),
    marginHorizontal: wp("10%"),
  },
  input: {
    fontSize: 20,
    borderBottomColor: "#333",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    marginHorizontal: wp("8%"),
    backgroundColor: colors.secondary,
    borderRadius: 25,
    height: hp("6%"),
  },
});
export default Email;
