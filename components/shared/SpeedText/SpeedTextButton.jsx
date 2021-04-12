import React, { useEffect, useState } from "react";
import { View, TouchableHighlight, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { calcHeight, calcWidth } from "../helpers/deviceDimensions";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import colors from "../../../config/colors";
import buttonConfig from "../../../config/buttonConfig";

function SpeedTextButton(props) {
  const { handlePress } = props;
  let icon = "ios-play";
  const [counter, setCounter] = useState(0);
  const playButtonSize = useSharedValue(1);
  useEffect(() => {
    playButtonSize.value = withSequence(
      withTiming(1.4, { duration: 400 }),
      withTiming(1, { duration: 400 })
    );
  }, []);

  const playButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: playButtonSize.value }],
    };
  });
  return (
    <Animated.View style={[styles.buttonContainer, playButtonAnimatedStyle]}>
      <TouchableHighlight underlayColor="none" onPress={handlePress}>
        <Icon name={icon} size={40} color={buttonConfig.color} />
      </TouchableHighlight>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    marginVertical: calcHeight(4),
  },
});

export default SpeedTextButton;
