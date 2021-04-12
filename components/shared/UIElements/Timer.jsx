import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from "react-native-reanimated";

const Timer = (props) => {
  const { seconds, dispatch } = props;
  const [shownSeconds, setShownSeconds] = useState(seconds);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (shownSeconds > 0) {
        setTimeout(() => {
          setShownSeconds(shownSeconds - 1);
        }, 1000);
      } else {
        timerScale.value = withSequence(withTiming(1.2), withTiming(0));
        setTimeout(() => {
          dispatch({ type: "start_text" });
        }, 600);
      }
    }
    return () => {
      mounted = false;
    };
  }, [shownSeconds]);

  const timerScale = useSharedValue(0);
  const timerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: timerScale.value }],
    };
  });
  useEffect(() => {
    shownSeconds > 0
      ? (timerScale.value = withSequence(withTiming(1.2), withTiming(1)))
      : null;
  }, [shownSeconds]);
  return shownSeconds >= 0 ? (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, timerStyle]}>
        <Text style={styles.text}>{shownSeconds}</Text>
      </Animated.View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: hp("42.5%"),
    left: wp("35%"),
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: hp("15%"),
    width: hp("15%"),
    borderRadius: hp("8%"),
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  text: {
    fontSize: hp("6%"),
    fontWeight: "600",
  },
});
export default Timer;
