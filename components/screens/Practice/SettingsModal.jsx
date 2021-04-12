import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  LogBox,
} from "react-native";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import { calcHeight, calcWidth } from "../../shared/helpers/deviceDimensions";
import colors from "../../../config/colors";
import buttonConfig from "../../../config/buttonConfig";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Settings = ({ route, navigation }) => {
  const { wpm, numWords, setWpm, setNumWords } = route.params;
  const [shownWpm, setShownWpm] = useState(wpm);
  const [shownNumWords, setShownNumWords] = useState(numWords);
  const [disabled, setDisabled] = useState(false);
  let sliderRef;

  // useEffect(() => {
  //   console.log(sliderRef);
  //   sliderRef.minimumValue = 2;
  // }, [sliderRef]);

  function handleChangeWpm(e) {
    Haptics.selectionAsync();
    setShownWpm(Math.floor(e));
  }
  function handleChangeNumWords(e) {
    Haptics.selectionAsync();
    setShownNumWords(e);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SETTINGS</Text>
      </View>
      <View style={styles.wpmSliderContainer}>
        <View>
          <Text style={styles.wpmSliderText}>Words per minute</Text>
          <View style={styles.numberContainer}>
            <Text style={{ fontSize: 40 }}>{shownWpm}</Text>
          </View>
        </View>
        <Slider
          minimumValue={50}
          maximumValue={1500}
          minimumTrackTintColor={buttonConfig.color}
          step={50}
          value={shownWpm}
          onValueChange={handleChangeWpm}
          onSlidingComplete={(e) => setWpm(Math.floor(e))}
          style={{ marginHorizontal: calcWidth(15) }}
        ></Slider>
      </View>
      <View style={styles.numWordsSliderContainer}>
        <Text style={styles.numWordsSliderText}>Words shown</Text>
        <View style={styles.numberContainer}>
          <Text style={{ fontSize: 40 }}>{shownNumWords}</Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={5}
          ref={(ref) => (sliderRef = ref)}
          minimumTrackTintColor={buttonConfig.color}
          step={1}
          value={shownNumWords}
          onValueChange={handleChangeNumWords}
          onSlidingComplete={(e) => setNumWords(Math.floor(e))}
          style={{
            marginHorizontal: calcWidth(15),
          }}
        ></Slider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    //flexGrow: 1,
    paddingBottom: 10,
    marginHorizontal: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
  },
  headerText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    opacity: 0.7,
  },
  wpmSliderContainer: {
    flex: 5,
    //backgroundColor: "blue",
    justifyContent: "center",
  },
  numWordsSliderContainer: {
    flex: 4,
    //backgroundColor: "green",
    justifyContent: "flex-start",
  },
  wpmSliderText: {
    fontSize: 25,
    alignSelf: "center",
    opacity: 0.9,
  },
  numWordsSliderText: {
    fontSize: 25,
    color: "#666",
    alignSelf: "center",
  },
  numberContainer: {
    height: calcHeight(10),
    width: calcWidth(40),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 5,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      height: 4,
      width: 2,
    },
    shadowColor: "#333",
  },
});

export default Settings;
