import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  calcHeight,
  calcWidth,
} from "../../../shared/helpers/deviceDimensions";

interface Props {
  title: string;
  desc: string;
}

const Description: React.FC<Props> = (props) => {
  const { title, desc } = props;
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text>{desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: calcHeight(10),
    paddingBottom: calcHeight(4),
    alignItems: "center",
  },
  titleText: {
    fontSize: 25,
  },
  descriptionContainer: {
    marginHorizontal: calcWidth(5),
  },
  descriptionText: {},
});

export default Description;
