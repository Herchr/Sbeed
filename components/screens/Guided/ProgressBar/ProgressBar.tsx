import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

interface Props {
  steps: number;
  currStep: number;
}

const progressBarWidth = wp("50%");
const ProgressBar: React.FC<Props> = (props) => {
  const { steps, currStep } = props;

  const stepWidth = progressBarWidth / steps;

  const progressX = useSharedValue(stepWidth);

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: progressX.value,
    };
  });

  useEffect(() => {
    progressX.value = withTiming(currStep * stepWidth, { duration: 1000 });
  }, [currStep]);

  return (
    <View style={styles.bar}>
      <Animated.View style={[styles.progress, progressAnimatedStyle]} />
    </View>
  );
};
const styles = StyleSheet.create({
  bar: {
    position: "relative",
    width: progressBarWidth,
    height: hp("2%"),
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: hp("2%"),
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "hidden",
  },
  progress: {
    position: "absolute",
    left: 0,
    top: 0,
    height: hp("2%"),
    backgroundColor: "#1BBC9B",
    borderRadius: hp("2%"),
  },
});
export default ProgressBar;
