import React from "react";
import { Dimensions, PixelRatio } from "react-native";

export const deviceWidth = Dimensions.get("screen").width;
export const deviceHeight = Dimensions.get("screen").height;
export const calcHeight = (x) =>
  PixelRatio.roundToNearestPixel((deviceHeight * x) / 100);
export const calcWidth = (x) =>
  PixelRatio.roundToNearestPixel((deviceWidth * x) / 100);
