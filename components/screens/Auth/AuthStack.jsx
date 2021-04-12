import React from "react";
import * as firebase from "firebase";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Email from "./Email";
import Authorize from "./Authorize";
import Loading from "./Loading";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="Authorize"
          component={Authorize}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Email"
          component={Email}
          options={{
            headerTransparent: true,
            headerTitle: null,
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
