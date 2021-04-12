//@ts-nocheck

import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Library from "../../screens/Library/Library";
import Guided from "../../screens/Guided/Guided";
import Profile from "../../screens/Profile/Profile";
import PracticeStack from "../Navigation/PracticeStack";
import Test from "../../../Test";
import { LogBox, StyleSheet, View } from "react-native";
import AnimatedTabBar from "@gorhom/animated-tabbar";
import colors from "../../../config/colors";
import GuidedIcon from "../../../assets/Icons/GuidedIcon";
import LibraryIcon from "../../../assets/Icons/LibraryIcon";
import PracticeIcon from "../../../assets/Icons/PracticeIcon";
import UserIcon from "../../../assets/Icons/UserIcon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const tabs = {
  Guided: {
    labelStyle: {
      color: colors.tertiary,
    },
    icon: {
      component: GuidedIcon,
      activeColor: colors.tertiary,
      inactiveColor: "rgba(170, 170, 170,1)",
    },
    background: {
      activeColor: colors.navBG,
      inactiveColor: "#fff",
    },
  },
  Practice: {
    labelStyle: {
      color: colors.tertiary,
    },
    icon: {
      component: PracticeIcon,
      activeColor: colors.tertiary,
      inactiveColor: "rgba(170, 170, 170,1)",
    },
    background: {
      activeColor: colors.navBG,
      inactiveColor: "#fff",
    },
  },
  Library: {
    labelStyle: {
      color: colors.tertiary,
    },
    icon: {
      component: LibraryIcon,
      activeColor: colors.tertiary,
      inactiveColor: "rgba(170, 170, 170,1)",
    },
    background: {
      activeColor: colors.navBG,
      inactiveColor: "#fff",
    },
  },
  Profile: {
    labelStyle: {
      color: colors.tertiary,
    },
    icon: {
      component: UserIcon,
      activeColor: colors.tertiary,
      inactiveColor: "rgba(170, 170, 170,1)",
    },
    background: {
      activeColor: colors.navBG,
      inactiveColor: "#fff",
    },
  },
  // Test: {
  //   labelStyle: {
  //     color: "#fff",
  //     fontSize: 15,
  //   },
  //   icon: {
  //     component: () => <FontAwesome name={"user-o"} size={22} />,
  //     activeColor: "white", // Get this to work
  //   },
  //   background: {
  //     activeColor: colors.tab3,
  //     inactiveColor: "rgba(207,235,239,0)",
  //   },
  // },
};

const Tab = createBottomTabNavigator();

function Tabs({ navigation }) {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <AnimatedTabBar iconSize={20} tabs={tabs} {...props} />
      )}
      tabBarOptions={{
        style: {
          borderTopEndRadius: wp("10%"),
          borderTopStartRadius: wp("10%"),
          shadowColor: "#999",
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
        },
      }}
    >
      <Tab.Screen name="Guided" component={Guided} />
      <Tab.Screen name="Practice" component={PracticeStack} />
      <Tab.Screen name="Library" component={Library} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="Test" component={Test} /> */}
    </Tab.Navigator>
  );
}

export default Tabs;
