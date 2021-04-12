import React, { useContext } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Slider from "@react-native-community/slider";
import { Feather } from "@expo/vector-icons";
import { deviceWidth } from "../../../shared/helpers/deviceDimensions";
import colors from "../../../../config/colors";
import buttonConfig from "../../../../config/buttonConfig";
import ProgressBar from "../ProgressBar/ProgressBar";
import WpmChart from "../../Profile/WpmChart";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const GuidedModal = (props) => {
  const { state, dispatch, children } = props;

  return (
    <Modal
      animationType="slide"
      visible={state.modalVisible}
      presentationStyle="overFullScreen"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              dispatch({ type: "close_modal" });
            }}
          >
            <Feather name="x" color={buttonConfig.color} size={40} />
          </TouchableOpacity>

          <View style={styles.progressBar}>
            <ProgressBar steps={3} currStep={state.currProgress} />
          </View>
        </View>
        {children}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    position: "relative",
    flexDirection: "row",
  },
  closeButton: {
    left: deviceWidth - 45,
    color: colors.tertiary,
  },
  progressBar: {
    position: "absolute",
    right: wp("25%"),
    alignSelf: "center",
  },
});

export default GuidedModal;
