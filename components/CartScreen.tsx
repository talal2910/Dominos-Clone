import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  BackHandler,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";

const CartScreen = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  const updateCartItems = () => {
    setCartItems(global.cart ? [...global.cart] : []);
  };

  useFocusEffect(
    React.useCallback(() => {
      updateCartItems();

      const onBackPress = () => {
        navigation.navigate("MainTabs");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      updateCartItems();
    });

    return unsubscribe;
  }, [navigation]);

  const handleBackPress = () => {
    navigation.navigate("Menu", { screen: "MenuHome" });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleDeleteItem = (id) => {
    if (global.cart) {
      global.cart = global.cart.filter((item) => item.id !== id);
      updateCartItems();
    }
  };

  const handleAddQuantity = (id) => {
    if (global.cart) {
      global.cart = global.cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: (item.totalPrice / item.quantity) * (item.quantity + 1),
          };
        }
        return item;
      });
      updateCartItems();
    }
  };

  const handleReduceQuantity = (id) => {
    if (global.cart) {
      global.cart = global.cart
        .map((item) => {
          if (item.id === id && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
              totalPrice:
                (item.totalPrice / item.quantity) * (item.quantity - 1),
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      updateCartItems();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#006491" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cartTitle}>My Cart</Text>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Add a Voucher</Text>
            <Ionicons name="chevron-down" size={24} color="#000" />
          </View>
          <View style={styles.voucherContainer}>
            <TextInput
              style={styles.voucherInput}
              placeholder="Enter a voucher Code"
              value={voucherCode}
              onChangeText={setVoucherCode}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Order Details</Text>
            <Ionicons name="chevron-down" size={24} color="#000" />
          </View>

          {cartItems.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <Text style={styles.emptyCartText}>
                Your cart is currently empty, but your stomach doesn't have to
                be. Add some items and come back here to checkout.
              </Text>
              <TouchableOpacity
                style={styles.startOrderButton}
                onPress={() =>
                  navigation.navigate("Menu", { screen: "MenuHome" })
                }
              >
                <Text style={styles.startOrderButtonText}>
                  START YOUR ORDER
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.pickupInfo}>
                <Text style={styles.pickupText}>
                  {global.orderType === "delivery" ? "Delivery" : "Pickup"} from
                </Text>
                <Text style={styles.storeText}>
                  {global.selectedStore
                    ? global.selectedStore.title
                    : "No store selected"}
                </Text>
              </View>

              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>
                      {item.product.name} | {item.size} × {item.quantity}
                    </Text>
                    <View style={styles.quantityControl}>
                      {item.quantity === 1 ? (
                        <TouchableOpacity
                          onPress={() => handleDeleteItem(item.id)}
                          style={styles.quantityButton}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={24}
                            color="#e31837"
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => handleReduceQuantity(item.id)}
                          style={styles.quantityButton}
                        >
                          <Ionicons name="remove" size={24} color="#006491" />
                        </TouchableOpacity>
                      )}
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => handleAddQuantity(item.id)}
                        style={styles.quantityButton}
                      >
                        <Ionicons name="add" size={24} color="#006491" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.itemPrice}>
                    Rs. {item.totalPrice.toFixed(2)}
                  </Text>
                  <Text style={styles.itemDetails}>
                    {item.crust}{" "}
                    {item.toppings && item.toppings.length > 0
                      ? `| ${item.toppings.join(", ")}`
                      : ""}
                  </Text>
                </View>
              ))}

              <View style={styles.instructionsSection}>
                <Text style={styles.instructionsTitle}>
                  Delivery Instructions (Optional)
                </Text>
                <TextInput
                  style={styles.instructionsInput}
                  placeholder="Instructions for Delivery Expert"
                  value={deliveryInstructions}
                  onChangeText={setDeliveryInstructions}
                  multiline
                />
              </View>

              <View style={styles.totalSection}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Subtotal</Text>
                  <Text style={styles.totalValue}>
                    Rs. {calculateTotal().toFixed(2)}
                  </Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Delivery Fee</Text>
                  <Text style={styles.totalValue}>Rs. 0.00</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Your Discount</Text>
                  <Text style={styles.discountValue}>Rs. 0.00</Text>
                </View>
                <View style={styles.grandTotalRow}>
                  <Text style={styles.grandTotalText}>Grand Total</Text>
                  <Text style={styles.grandTotalAmount}>
                    Rs. {calculateTotal().toFixed(2)}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmOrderButton,
            cartItems.length === 0 && styles.confirmOrderButtonDisabled,
          ]}
          disabled={cartItems.length === 0}
        >
          <Text style={styles.confirmOrderButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    color: "#006491",
    fontWeight: "bold",
    marginLeft: 8,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginLeft: 24,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  voucherContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  voucherInput: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    fontSize: 16,
    color: "black",
  },
  applyButton: {
    backgroundColor: "#e8f4f8",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  applyButtonText: {
    color: "#006491",
    fontWeight: "600",
  },
  pickupInfo: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  pickupText: {
    fontSize: 14,
    color: "#666",
  },
  storeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  cartItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    color: "red",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 14,
    color: "#666",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "500",
    color: "red",
    marginHorizontal: 8,
  },
  instructionsSection: {
    marginTop: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  instructionsInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
  },
  totalSection: {
    marginTop: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  discountValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e31837",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  grandTotalText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#006491",
  },
  grandTotalAmount: {
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    padding: 16,
  },
  confirmOrderButton: {
    backgroundColor: "#006491",
    padding: 2,
    borderRadius: 16,
    alignItems: "center",
  },
  confirmOrderButtonDisabled: {
    backgroundColor: "#ccc",
  },
  confirmOrderButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  emptyCartContainer: {
    alignItems: "center",
    padding: 16,
  },
  emptyCartText: {
    textAlign: "center",
    color: "black",
    marginBottom: 16,
    lineHeight: 24,
  },
  startOrderButton: {
    backgroundColor: "#006491",
    paddingHorizontal: 24,
    paddingVertical: 5,
    borderRadius: 10,
  },
  startOrderButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
export default CartScreen;
