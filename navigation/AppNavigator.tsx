import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../components/HomeScreen";
import MenuScreen from "../components/MenuScreen";
import DealsScreen from "../components/DealsScreen";
import MoreScreen from "../components/MoreScreen";
import TrackOrder from "../components/TrackOrder";
import StoreLocator from "../components/StoreLocator";
import Feedback from "../components/Feedback";
import NutritionalInfo from "../components/NutritionalInfo";
import Alliances from "../components/Alliances";
import AboutUs from "../components/AboutUs";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsAndConditions from "../components/TermsAndConditions";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MoreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MoreMain" component={MoreScreen} />
    <Stack.Screen name="AboutUs" component={AboutUs} />
    <Stack.Screen name="TrackOrder" component={TrackOrder} />
    <Stack.Screen name="StoreLocator" component={StoreLocator} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    <Stack.Screen name="Alliances" component={Alliances} />
    <Stack.Screen name="NutritionalInfo" component={NutritionalInfo} />
    <Stack.Screen name="Feedback" component={Feedback} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Menu") {
          iconName = focused ? "restaurant" : "restaurant-outline";
        } else if (route.name === "Deals") {
          iconName = focused ? "pricetag" : "pricetag-outline";
        } else if (route.name === "More") {
          iconName = focused ? "menu" : "menu-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "#e31837",
      inactiveTintColor: "gray",
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Menu" component={MenuScreen} />
    <Tab.Screen name="Deals" component={DealsScreen} />
    <Tab.Screen name="More" component={MoreStack} />
  </Tab.Navigator>
);

export default AppNavigator;
