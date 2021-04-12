import React, { useRef, useState } from "react";
import * as firebase from "firebase";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  LogBox,
  Dimensions,
} from "react-native";
import Svg, { Image, ClipPath, Circle, CircleProps } from "react-native-svg";
import googleSignIn from "./GoogleSignIn";
import Email from "./Email";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SocialIcon } from "react-native-elements";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  useAnimatedRef,
  withTiming,
  interpolateNode,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
LogBox.ignoreLogs([
  "Warning: Failed prop type: Invalid prop `title` of type `object` supplied to `SocialIcon`, expected `string`.",
]);
LogBox.ignoreLogs([
  "Warning: Failed prop type: Invalid prop `style` supplied to `SocialIcon`",
]);

const bgYFactor = 2;
const bgYHeightBefore = 0;
const bgYHeightAfter = -hp("100%");
const emailHeight = hp("55%");
const buttonSize = 50;
const buttonPosition = hp("10%");
//console.log(bgYHeightAfter, deviceHeight);

const Authorize = ({ navigation }) => {
  let socialButtons = ["apple", "google", "facebook"];
  const [showEmail, setShowEmail] = useState(false);
  const loginOpacity = useSharedValue(1);
  const bgY = useSharedValue(0);
  const loginY = useDerivedValue(() => {
    return interpolate(
      loginOpacity.value,
      [0, 1],
      [-1.5 * bgYHeightAfter, 0],
      Extrapolate.CLAMP
    );
  });
  const loginZ = useDerivedValue(() => {
    return interpolate(loginOpacity.value, [0, 1], [-1, 0], Extrapolate.CLAMP);
  });
  const emailZIndex = useDerivedValue(() => {
    return interpolate(loginOpacity.value, [0, 1], [1, -5], Extrapolate.CLAMP);
  });
  const emailOpacity = useDerivedValue(() => {
    return interpolate(loginOpacity.value, [0, 1], [1, 0], Extrapolate.CLAMP);
  });

  const emailY = useDerivedValue(() => {
    return interpolate(
      bgY.value,
      [0, bgYHeightAfter],
      [0, emailHeight + buttonPosition],
      Extrapolate.CLAMP
    );
  });
  const buttonY = useDerivedValue(() => {
    return interpolate(loginOpacity.value, [0, 1], [0, 400], Extrapolate.CLAMP);
  });
  const buttonRotate = useDerivedValue(() => {
    return interpolate(loginOpacity.value, [0, 1], [180, 360]);
  });
  const buttonOpacity = useDerivedValue(() => {
    return interpolate(loginOpacity.value, [0, 1], [1, 0], Extrapolate.CLAMP);
  });

  const loginAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: loginOpacity.value,
      transform: [{ translateY: loginY.value }],
      zIndex: loginZ.value,
    };
  });

  const bgAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bgY.value }],
    };
  });

  const emailAnimatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: emailZIndex.value,
      //opacity: emailOpacity.value,
      opacity: 1,
      transform: [{ translateY: emailY.value }],
    };
  });
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: buttonY.value },
        { rotate: `${buttonRotate.value}deg` },
      ],
      opacity: buttonOpacity.value,
    };
  });

  return (
    <Animated.View style={[bgAnimatedStyle, styles.bgContainer]}>
      <Svg height={hp("110%")} width={deviceWidth} position="absolute">
        <ClipPath id="clip">
          <Circle r={hp("110%")} cx={wp("50%")} />
        </ClipPath>
        <Image
          href={require("../../../assets/1x/LoginGradient.png")}
          width={deviceWidth}
          height={hp("110%")}
          preserveAspectRatio="XMidYMid slice"
          clipPath={"url(#clip)"}
        />
      </Svg>
      <LottieView
        source={require("../../../assets/LoginGradient.json")}
        style={{
          position: "absolute",
          height: hp("95%"),

          top: hp("2%"),
          alignSelf: "center",
        }}
        autoPlay
        loop
      />

      <Animated.View style={[loginAnimatedStyle, styles.loginContainer]}>
        <TouchableOpacity
          style={styles.socialButtonContainer}
          onPress={() => {
            loginOpacity.value = withTiming(0, { duration: 700 });
            bgY.value = withTiming(bgYHeightAfter, {
              duration: 700,
            });
            setShowEmail(true);
          }}
        >
          <SocialIcon
            button
            type="at"
            iconType="font-awesome-5"
            style={[
              {
                backgroundColor: "#B00051",
                height: 80,
              },
              styles.socialButton,
            ]}
            title={
              <Text style={styles.socialButtonText}>
                {"Continue with Email"}
              </Text>
            }
          />
        </TouchableOpacity>

        {socialButtons.map((company, index) => (
          <TouchableOpacity
            style={styles.socialButtonContainer}
            key={index}
            onPress={() => googleSignIn()}
          >
            <SocialIcon
              type={company}
              button
              style={[
                styles.socialButton,

                company == "apple" && { backgroundColor: "#222" },
              ]}
              title={
                <Text style={styles.socialButtonText}>
                  Continue with
                  {" " + company.slice(0, 1).toUpperCase() + company.slice(1)}
                </Text>
              }
            />
          </TouchableOpacity>
        ))}
      </Animated.View>
      <Animated.View style={[styles.emailContainer, emailAnimatedStyle]}>
        <TouchableOpacity
          onPress={() => {
            loginOpacity.value = withTiming(1, { duration: 700 });
            bgY.value = withTiming(0, { duration: 700 });
            setShowEmail(false);
          }}
          style={[
            styles.closeButtonContainer,
            {
              zIndex: emailZIndex.value + 4,
            },
          ]}
        >
          <Animated.View style={[styles.closeButton, buttonAnimatedStyle]}>
            <Text style={[styles.closeButtonText]}>X</Text>
          </Animated.View>
        </TouchableOpacity>
        {showEmail && <Email bgY={bgY} bgYFactor={bgYFactor} />}
      </Animated.View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    position: "relative",
  },
  bgContainer: {
    //position: "absolute",
  },
  loginContainer: {
    paddingBottom: hp("5%"),
    top: hp("45%"),
    alignSelf: "center",
    borderRadius: 20,
    zIndex: 5,
  },
  closeButtonContainer: {
    //top: 4,
    left: deviceWidth / 2 - hp("3%"),
  },
  closeButton: {
    height: hp("6%"),
    width: hp("6%"),
    backgroundColor: "white",
    borderRadius: 30,
    //borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: -3,
      width: 0,
    },
  },
  socialButtonContainer: {
    paddingTop: hp("2%"),
  },
  socialButton: {
    height: hp("8%"),
    paddingHorizontal: "10%",
    borderRadius: 25,
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  emailContainer: {
    position: "absolute",
    //top: -bgYHeightAfter / 2,
    bottom: -hp("42%"),
    width: "100%",
    height: "100%",
    //backgroundColor: "blue",
  },
});
export default Authorize;
