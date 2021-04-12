import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Practice from "../../screens/Practice/Practice";
import SettingsModal from "../../screens/Practice/SettingsModal";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { deviceWidth } from "../helpers/deviceDimensions";
import * as Haptics from "expo-haptics";
import colors from "../../../config/colors";
import buttonConfig from "../../../config/buttonConfig";

const Stack = createStackNavigator();

const PracticeStack = ({ navigation }) => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Practice"
        component={Practice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingsModal"
        component={SettingsModal}
        options={{
          headerBackImage: () => (
            <Feather
              name="x"
              style={{ paddingBottom: 50 }}
              color={buttonConfig.color}
              size={40}
            />
          ),
          headerLeftContainerStyle: {
            left: null,
            right: 5,
          },
          headerTransparent: false,
          headerBackTitleVisible: false,
          headerStatusBarHeight: 40,
          headerTitle: "",
          headerBackground: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default PracticeStack;
