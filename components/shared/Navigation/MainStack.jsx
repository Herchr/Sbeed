import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import Tabs from "../../shared/Navigation/Tabs";
import Fixation from "../../screens/Guided/Fixation/Fixation";
import Regression from "../../screens/Guided/Regression/Regression";
import Subvocalization from "../../screens/Guided/Subvocalization/Subvocalization";
import BookInfo from "../../screens/Library/BookInfo";
import YourBooks from "../../screens/Profile/YourBooks/YourBooks";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../../../config/colors";
import { Ionicons } from "@expo/vector-icons";

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.card,
    text: colors.text,
  },
};

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: false,
            headerBackTitleVisible: false,
          }}
        />

        <Stack.Screen
          name="BookInfo"
          component={BookInfo}
          options={{
            headerBackImage: () => (
              <Ionicons
                name="ios-arrow-back"
                color="black"
                size={35}
                style={{ marginHorizontal: 5 }}
              />
            ),
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerTitle: false,
          }}
        />
        <Stack.Screen
          name="YourBooks"
          component={YourBooks}
          options={{
            headerBackImage: () => (
              <Ionicons
                name="ios-arrow-back"
                color="black"
                size={35}
                style={{ marginHorizontal: 5 }}
              />
            ),
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerTitle: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
