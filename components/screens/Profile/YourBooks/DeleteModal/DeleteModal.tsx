import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import buttonConfig from "../../../../../config/buttonConfig";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

interface Props {
  onDelete: () => void;
  setShowDeleteModal: (boolean) => void;
  showDeleteModal: boolean;
}

const DeleteModal: React.FC<Props> = (props) => {
  const { onDelete, showDeleteModal, setShowDeleteModal } = props;
  const isVisible = showDeleteModal;
  return (
    <View>
      <Modal
        style={styles.modal}
        isVisible={isVisible}
        backdropColor="black"
        backdropOpacity={0.2}
        onBackdropPress={() => {
          setShowDeleteModal(false);
        }}
      >
        <View style={styles.optionsContainer}>
          {/* <BlurView> */}
          <TouchableOpacity
            style={[
              styles.optionsButton,
              {
                borderTopWidth: 0,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
            ]}
          >
            <Text style={[styles.buttonText]}>Set As Current Book</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionsButton]}>
            <Text style={[styles.buttonText]}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionsButton,
              { borderBottomRightRadius: 10, borderBottomLeftRadius: 10 },
            ]}
            onPress={() => {
              onDelete();
              setShowDeleteModal(false);
            }}
          >
            <Text style={[styles.buttonText, styles.deleteButtonText]}>
              Delete
            </Text>
          </TouchableOpacity>

          {/* </BlurView> */}
        </View>

        <View style={styles.cancelButtonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowDeleteModal(false)}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
  },
  buttonText: {
    color: "#006ee6",
    fontSize: 18,
  },
  optionsContainer: {},
  optionsButton: {
    backgroundColor: "white",
    paddingVertical: hp("2%"),
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#999",
  },
  deleteButtonText: {
    color: "red",
  },

  cancelButtonContainer: {
    paddingVertical: hp("2%"),
  },
  cancelButton: {
    backgroundColor: "#FFF",
    paddingVertical: hp("2%"),
    alignItems: "center",
    borderRadius: 10,
  },
  cancelButtonText: {
    fontWeight: "700",
  },
});

export default DeleteModal;
