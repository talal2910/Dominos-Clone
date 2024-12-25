import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DealsScreen from "./DealsScreen";
import DealCustomizationScreen from "./DealCustomizationScreen";

const Stack = createStackNavigator();

const DealsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DealsMain" component={DealsScreen} />
      <Stack.Screen
        name="DealCustomization"
        component={DealCustomizationScreen}
      />
    </Stack.Navigator>
  );
};

export default DealsStack;
