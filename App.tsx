import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./app/(tabs)/index";
import { AppProvider } from "./components/PickupScreen";
import PickupScreen from "./components/PickupScreen";

const Stack = createStackNavigator();

const App = () => {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [areaName, setAreaName] = useState(null);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs">
            {(props) => (
              <TabNavigator
                {...props}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                orderType={orderType}
                setOrderType={setOrderType}
                selectedStore={selectedStore}
                setSelectedStore={setSelectedStore}
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
                areaName={areaName}
                setAreaName={setAreaName}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Pickup" component={PickupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
