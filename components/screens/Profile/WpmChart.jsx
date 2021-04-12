import React from "react";
import { View, Text, Dimensions, StyleSheet, SafeAreaView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import colors from "../../../config/colors";
import { calcHeight, calcWidth } from "../../shared/helpers/deviceDimensions";

let { height, width } = Dimensions.get("screen");

const WpmChart = (props) => {
  const wpms = props.wpms; // Sett dynamisk
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          datasets: [{ data: wpms }],
        }}
        width={calcWidth(80)}
        height={calcHeight(30)}
        segments={5}
        //formatYLabel={(y) => (Math.ceil(y / 50) * 50).toString()}
        fromZero={true}
        chartConfig={{
          backgroundGradientFrom: "#FFF",
          backgroundGradientTo: "#FFF",
          fillShadowGradient: "#FFF",
          fillShadowGradientOpacity: 0.2,
          propsForVerticalLabels: {},
          propsForBackgroundLines: {
            opacity: 0.2,
            strokeDasharray: "",
          },
          decimalPlaces: 0,
          color: (opacity = 0) => `rgba(251, 196, 56, 1)`,
          labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "5",
            fill: "#FFF",
            strokeWidth: 2.5,
            stroke: "#FB630C",
          },
        }}
        style={styles.bezierChart}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: -1 },
  bezierChart: {},
});
export default WpmChart;
