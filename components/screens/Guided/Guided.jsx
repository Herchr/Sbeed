import React, { useState, useContext, useEffect, useReducer } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import {
  calcHeight,
  calcWidth,
  deviceWidth,
  deviceHeight,
} from "../../shared/helpers/deviceDimensions";
import GuidedModal from "./Modal/GuidedModal";
import Subvocalization from "./Subvocalization/Subvocalization";
import Regression from "./Regression/Regression";
import Fixation from "./Fixation/Fixation";
import { BookContext } from "../../shared/contexts/BookContext";
import colors from "../../../config/colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import Timer from "../../shared/UIElements/Timer";
import AlertModal from "../../shared/UIElements/AlertModal";
import ProgressBar from "./ProgressBar/ProgressBar";
import buttonConfig from "../../../config/buttonConfig";

const ACTIONS = {
  SHOW_MODAL: "show_modal",
  CLOSE_MODAL: "close_modal",
  START_TEXT: "start_text",
  NEXT_SCREEN: "next_screen",
  SHOW_NEXT_SCREEN_BUTTON: "show_next_screen_button",
  CLOSE_NEXT_SCREEN_BUTTON: "close_next_screen_button",
  PROGRESS: "progress",
};

const initialState = {
  screenIndex: 0,
  currProgress: 1,
  startText: false,
  modalVisible: false,
  nextScreenButtonVisible: false,
};
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SHOW_MODAL:
      return { ...state, modalVisible: true };
    case ACTIONS.CLOSE_MODAL:
      return initialState;
    case ACTIONS.START_TEXT:
      return { ...state, startText: true };
    case ACTIONS.NEXT_SCREEN:
      return {
        ...state,
        screenIndex: state.screenIndex + 1,
        nextScreenButtonVisible: false,
      };
    case ACTIONS.SHOW_NEXT_SCREEN_BUTTON:
      return {
        ...state,
        nextScreenButtonVisible: true,
        currProgress: state.currProgress + 1,
      };
    case ACTIONS.CLOSE_NEXT_SCREEN_BUTTON:
      return {
        ...state,
        nextScreenButtonVisible: false,
      };
    case ACTIONS.PROGRESS:
      return {
        ...state,
        currProgress: state.currProgress + 1,
      };
  }
}
const Guided = () => {
  const [storedBook, setStoredBook, loading, counter] = useContext(BookContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const screenX = useSharedValue(0);
  const screenAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: screenX.value }],
    };
  });
  useEffect(() => {
    screenX.value = 1000;
    screenX.value = withTiming(0, { duration: 1000 });
  }, [state.screenIndex]);

  const screens = [
    <Subvocalization book={storedBook} state={state} dispatch={dispatch} />,
    <Regression book={storedBook} state={state} dispatch={dispatch} />,
    <Fixation book={storedBook} state={state} dispatch={dispatch} />,
  ];

  function handleNextScreenButtonPress() {
    dispatch({ type: ACTIONS.NEXT_SCREEN });
  }
  return (
    <View style={styles.container}>
      <View style={styles.illustration}>
        <Image
          style={{
            height: "100%",
            width: "100%",
          }}
          source={require("../../../assets/Guided/Sbeed.png")}
          resizeMode="contain"
        />
      </View>

      {!loading && (
        <View style={styles.startButtonContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => dispatch({ type: ACTIONS.SHOW_MODAL })}
          >
            <Text style={styles.startButtonText}>START GUIDED LESSON</Text>
          </TouchableOpacity>
        </View>
      )}
      {state.modalVisible && (
        <GuidedModal state={state} dispatch={dispatch}>
          <Timer seconds={3} dispatch={dispatch} />
          {state.startText && (
            <Animated.View
              style={[styles.screenContainer, screenAnimatedStyle]}
            >
              {screens[state.screenIndex]}
            </Animated.View>
          )}
          {state.nextScreenButtonVisible && (
            <AlertModal
              modalText=""
              buttonText="Next"
              modalVisible={state.nextScreenButtonVisible}
              onPress={handleNextScreenButtonPress}
            />
          )}
        </GuidedModal>
      )}
    </View>
  );
};

{
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  screenContainer: { flex: 1 },
  illustration: {
    flex: 6,
  },
  startButtonContainer: {
    flex: 1.5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    borderRadius: buttonConfig.borderRadius,
    backgroundColor: colors.secondary,
    paddingVertical: calcHeight(3),
    paddingHorizontal: calcWidth(5),
  },
  startButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  continueButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButton: {
    borderRadius: 25,
    backgroundColor: "blue",
    paddingVertical: calcHeight(3),
    paddingHorizontal: calcWidth(15),
    marginHorizontal: calcWidth(2),
  },
  continueButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  modalContainer: {
    flex: 6,
  },
  xIcon: {
    marginLeft: 5,
  },
});

export default Guided;
