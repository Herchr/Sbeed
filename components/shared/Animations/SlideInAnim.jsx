import React, { useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");
const SlideInAnim = (props) => {
  const { isFocused, index, elemPair, children } = props;
  const translateY = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value * 25 }],
    };
  });
  useEffect(() => {
    if (isFocused) {
      translateY.value = withTiming(0, {
        duration: 1000,
      });
    }
  });
  translateY.value = 15 + elemPair * 25 - index * 2.5;
  return <Animated.View style={[animatedStyle]}>{children}</Animated.View>;
};

export default SlideInAnim;
