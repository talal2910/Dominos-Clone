import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import HomeScreen from "../../components/HomeScreen";
import MoreScreen from "../../components/MoreScreen";
import CartScreen from "../../components/CartScreen";
import DealsScreen from "../../components/DealsScreen";
import SignInScreen from "../../components/SignInScreen";
import IntroScreen from "../../components/IntroScreen";
import AboutUs from "../../components/AboutUs";
import TrackOrder from "../../components/TrackOrder";
import StoreLocator from "../../components/StoreLocator";
import PrivacyPolicy from "../../components/PrivacyPolicy";
import TermsAndConditions from "../../components/TermsAndConditions";
import Alliances from "../../components/Alliances";
import NutritionalInfo from "../../components/NutritionalInfo";
import Feedback from "../../components/Feedback";
import ProductCustomizationScreen from "../../components/ProductCustomizationScreen";
import DealCustomizationScreen from "../../components/DealCustomizationScreen";
import DeliveryAddressScreen from "../../components/DeliveryAddressScreen";
import DeliveryDetailsScreen from "../../components/DeliveryDetailsScreen";
import PickupScreen from "../../components/PickupScreen";
import { AppProvider } from "../../components/PickupScreen";
import StoreDetailsScreen from "../../components/StoreDetailsScreen";
import { categories, products } from "../../data/mockData";
import { NavigationItem } from "../../types";
import SimpleProductCustomizationScreen from "../../components/SimpleProductCustomizationScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const bottomNavItems: NavigationItem[] = [
  { id: "account", name: "My Account", icon: "person-outline" },
  { id: "more", name: "More", icon: "ellipsis-horizontal" },
  { id: "menu", name: "Menu", icon: "list" },
  { id: "deals", name: "Deals", icon: "pricetag-outline" },
  { id: "cart", name: "My Cart", icon: "cart-outline" },
];

const TabNavigator = ({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  orderType,
  setOrderType,
  selectedStore,
  setSelectedStore,
  deliveryAddress,
  setDeliveryAddress,
  areaName,
  setAreaName,
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [addedProductName, setAddedProductName] = useState("");
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();

  const showSuccessMessageAnimation = useCallback(() => {
    setShowSuccessMessage(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowSuccessMessage(false);
        setAddedProductName("");
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        if (
          navigation.getState().routes[navigation.getState().index].params
            ?.addedToCart
        ) {
          const { addedToCart, addedProductName } =
            navigation.getState().routes[navigation.getState().index].params;
          if (addedToCart && addedProductName) {
            setAddedProductName(addedProductName);
            showSuccessMessageAnimation();
            navigation.setParams({
              addedToCart: false,
              addedProductName: null,
            });
          }
        }
      });

      return unsubscribe;
    }, [navigation, showSuccessMessageAnimation])
  );

  useEffect(() => {
    //Removed this useEffect block as the functionality is now handled by useFocusEffect
  }, [showSuccessMessage, fadeAnim]);

  const TabStack = () => (
    <Tab.Navigator
      initialRouteName="Menu"
      screenOptions={({ route }) => {
        const item = bottomNavItems.find((item) => item.name === route.name);

        return {
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <View
                style={route.name === "Menu" ? styles.menuIconContainer : null}
              >
                <Ionicons
                  name={item?.icon || "help-outline"}
                  size={route.name === "Menu" ? 25 : size}
                  color={route.name === "Menu" ? "white" : color}
                />
                {route.name === "My Cart" && cart && cart.length > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cart.length}</Text>
                  </View>
                )}
              </View>
            );
          },
          tabBarActiveTintColor: "#006491",
          tabBarInactiveTintColor: "black",
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? "#006491" : "gray" },
              ]}
            >
              {item?.name}
            </Text>
          ),
        };
      }}
    >
      <Tab.Screen name="My Account" component={SignInScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
      <Tab.Screen name="Menu">
        {(props) => (
          <HomeScreen
            {...props}
            categories={categories}
            products={products}
            orderType={orderType}
            selectedStore={selectedStore}
            deliveryAddress={deliveryAddress}
            areaName={areaName}
            addToCart={addToCart}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Deals"
        component={DealsScreen}
        initialParams={{ categories, products }}
      />
      <Tab.Screen name="My Cart">
        {(props) => (
          <CartScreen
            {...props}
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );

  return (
    <AppProvider>
      <View style={{ flex: 1 }}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Intro"
        >
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="MainTabs" component={TabStack} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen
            name="ProductCustomization"
            component={ProductCustomizationScreen}
          />
          <Stack.Screen
            name="DealCustomization"
            component={DealCustomizationScreen}
          />
          <Stack.Screen
            name="SimpleProductCustomization"
            component={SimpleProductCustomizationScreen}
          />
          <Stack.Screen
            name="DeliveryAddress"
            component={DeliveryAddressScreen}
          />
          <Stack.Screen
            name="DeliveryDetails"
            component={DeliveryDetailsScreen}
          />
          <Stack.Screen name="Pickup" component={PickupScreen} />
          <Stack.Screen name="StoreDetails" component={StoreDetailsScreen} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="TrackOrder" component={TrackOrder} />
          <Stack.Screen name="StoreLocator" component={StoreLocator} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
          />
          <Stack.Screen name="Alliances" component={Alliances} />
          <Stack.Screen name="NutritionalInfo" component={NutritionalInfo} />
          <Stack.Screen name="Feedback" component={Feedback} />
        </Stack.Navigator>
        {showSuccessMessage && (
          <Animated.View style={[styles.successMessage, { opacity: fadeAnim }]}>
            <Text style={styles.successMessageText}>
              {addedProductName} has been successfully added to cart
            </Text>
          </Animated.View>
        )}
      </View>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    height: 53,
    paddingBottom: 5,
    paddingTop: 4,
    borderTopWidth: 0,
    borderTopColor: "white",
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 6,
    color: "black",
  },
  menuIconContainer: {
    backgroundColor: "#006491",
    width: 34,
    height: 34,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cartBadge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  successMessage: {
    position: "absolute",
    bottom: 70,
    left: 20,
    right: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  successMessageText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default TabNavigator;
