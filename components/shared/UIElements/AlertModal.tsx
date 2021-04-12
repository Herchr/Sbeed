import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../config/colors";

interface Props {
  modalText: string;
  buttonText: string;
  onPress: () => void;
  modalVisible: boolean;
}

const AlertModal: React.FC<Props> = (props) => {
  const { modalText, buttonText, onPress, modalVisible } = props;
  return (
    <Modal
      isVisible={modalVisible}
      hasBackdrop={false}
      coverScreen={false}
      style={{
        margin: 0,
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: -1,

        justifyContent: "flex-end",
      }}
      deviceWidth={Dimensions.get("screen").width}
    >
      <View style={styles.modalView}>
        {modalText.length > 0 && (
          <Text style={styles.modalText}>{modalText}</Text>
        )}

        <TouchableHighlight style={styles.openButton} onPress={onPress}>
          <Text style={styles.textStyle}>{buttonText}</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  openButton: {
    backgroundColor: colors.navBG,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: wp("25%"),
    elevation: 2,
    shadowColor: colors.navBG,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  textStyle: {
    color: colors.tertiary,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    width: "100%",
  },
});

export default AlertModal;
