import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Animated,
} from "react-native";
import { X, ChevronDown, Minus, Plus } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DealProduct } from "../types";

const RadioOption = ({ label, price, originalPrice, selected, onSelect }) => (
  <TouchableOpacity
    style={[styles.optionContainer, selected && styles.optionContainerSelected]}
    onPress={onSelect}
  >
    <View style={styles.radioContainer}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.optionLabel}>{label}</Text>
    </View>
    <View style={styles.priceContainer}>
      <Text style={styles.price}>Rs.{price}</Text>
      {originalPrice && (
        <Text style={styles.originalPrice}>(Rs.{originalPrice})</Text>
      )}
    </View>
  </TouchableOpacity>
);

const ToppingOption = ({
  image,
  label,
  price,
  originalPrice,
  selected,
  onToggle,
}) => (
  <TouchableOpacity
    style={[
      styles.toppingContainer,
      selected && styles.toppingContainerSelected,
    ]}
    onPress={onToggle}
  >
    <View style={styles.toppingInfo}>
      <Image source={{ uri: image }} style={styles.toppingImage} />
      <Text style={styles.toppingLabel}>{label}</Text>
    </View>
    <View style={styles.toppingPriceContainer}>
      <Text style={styles.price}>Rs.{price}</Text>
      {originalPrice && (
        <Text style={styles.originalPrice}>(Rs.{originalPrice})</Text>
      )}
    </View>
  </TouchableOpacity>
);

const DealCustomizationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  const [size, setSize] = useState("Small");
  const [crust, setCrust] = useState("");
  const [selectedToppings, setSelectedToppings] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");
  const [showMoreToppings, setShowMoreToppings] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleClose = () => {
    navigation.goBack();
  };

  const handleAddToCart = () => {
    if (!crust) {
      // Show error for required crust selection
      return;
    }

    const cartItem = {
      id: Date.now().toString(), // Generate a new unique id each time
      product,
      size,
      crust,
      toppings: Object.keys(selectedToppings).filter(
        (t) => selectedToppings[t]
      ),
      quantity,
      instructions,
      totalPrice: calculateTotalPrice(),
    };

    // Initialize cart if it doesn't exist
    if (!global.cart) {
      global.cart = [];
    }

    // Always add as a new item
    global.cart.push(cartItem);

    // Navigate back to home with success message
    navigation.navigate("MainTabs", {
      addedToCart: true,
      addedProductName: product.name,
    });
  };

  const calculateTotalPrice = () => {
    let total = product.price;
    if (size === "Medium") total = 1400;
    if (size === "Large") total = 1680;

    Object.keys(selectedToppings).forEach((topping) => {
      if (selectedToppings[topping]) {
        if (["Cheese", "Tex-Mex Chicken"].includes(topping)) {
          total += 175;
        } else if (["Mushroom", "Jalapeno"].includes(topping)) {
          total += 105;
        }
      }
    });

    return total * quantity;
  };

  const toppings = [
    {
      name: "Cheese",
      price: "175",
      originalPrice: "249",
      image: "https://example.com/cheese.png",
    },
    {
      name: "Tex-Mex Chicken",
      price: "175",
      originalPrice: "249",
      image: "https://example.com/tex-mex-chicken.png",
    },
    {
      name: "Mushroom",
      price: "105",
      originalPrice: "149",
      image: "https://example.com/mushroom.png",
    },
    {
      name: "Jalapeno",
      price: "105",
      originalPrice: "149",
      image: "https://example.com/jalapeno.png",
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <X size={24} color="#000" />
        </TouchableOpacity>

        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <Animated.View
            style={[
              styles.imageContainer,
              {
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [0, 200],
                      outputRange: [0, -100],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
            ]}
          >
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
          </Animated.View>

          <View style={styles.content}>
            <View style={styles.productInfoBar}>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.currentPrice}>Rs. {product.price}</Text>
                {product.originalPrice && (
                  <Text style={styles.originalPrice}>
                    Rs. {product.originalPrice}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Size</Text>
              <RadioOption
                label="Small"
                price="420"
                originalPrice="599"
                selected={size === "Small"}
                onSelect={() => setSize("Small")}
              />
              <RadioOption
                label="Medium"
                price="1400"
                originalPrice="1999"
                selected={size === "Medium"}
                onSelect={() => setSize("Medium")}
              />
              <RadioOption
                label="Large"
                price="1680"
                originalPrice="2399"
                selected={size === "Large"}
                onSelect={() => setSize("Large")}
              />
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Crust</Text>
                <Text style={styles.required}>Required</Text>
              </View>
              <RadioOption
                label="Pan"
                price="0"
                selected={crust === "Pan"}
                onSelect={() => setCrust("Pan")}
              />
              <RadioOption
                label="Hand Tossed"
                price="0"
                selected={crust === "Hand Tossed"}
                onSelect={() => setCrust("Hand Tossed")}
              />
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Extra Toppings</Text>
                <Text style={styles.optional}>Optional</Text>
              </View>
              {toppings.map((topping) => (
                <ToppingOption
                  key={topping.name}
                  image={topping.image}
                  label={topping.name}
                  price={topping.price}
                  originalPrice={topping.originalPrice}
                  selected={selectedToppings[topping.name]}
                  onToggle={() =>
                    setSelectedToppings((prev) => ({
                      ...prev,
                      [topping.name]: !prev[topping.name],
                    }))
                  }
                />
              ))}
            </View>

            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View 6 more</Text>
              <ChevronDown size={24} color="#0066cc" />
            </TouchableOpacity>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Nutritional & Allergens</Text>
              <TouchableOpacity style={styles.nutritionalButton}>
                <Text style={styles.nutritionalButtonText}>
                  View Nutritional Info & Allergens
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Kitchen Instructions (Optional)
              </Text>
              <TextInput
                style={styles.instructionsInput}
                placeholder="Instructions for Pizza Maker"
                value={instructions}
                onChangeText={setInstructions}
                multiline
              />
            </View>
          </View>
        </Animated.ScrollView>

        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => {
                const newQuantity = Math.max(1, quantity - 1);
                setQuantity(newQuantity);
              }}
              style={[
                styles.quantityButton,
                quantity > 1
                  ? styles.quantityButtonMinusActive
                  : styles.quantityButtonMinusInactive,
              ]}
            >
              <Text
                style={[
                  styles.quantityText,
                  quantity > 1
                    ? styles.quantityTextMinusActive
                    : styles.quantityTextMinusInactive,
                ]}
              >
                -
              </Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={[styles.quantityButton, styles.quantityButtonPlus]}
            >
              <Text style={styles.quantityTextPlus}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.addButton, !crust && styles.addButtonDisabled]}
            onPress={handleAddToCart}
            disabled={!crust}
          >
            <Text style={styles.addButtonText}>
              Add to Cart (Rs. {calculateTotalPrice()})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 16,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
  },
  imageContainer: {
    height: 250,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 16,
  },
  productInfoBar: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 6,
    marginBottom: 24,
    elevation: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 1,
  },
  description: {
    fontSize: 13,
    color: "#666",
    marginBottom: 1,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#006491",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 15.8,
    color: "#e31837",
    textDecorationLine: "line-through",
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey-black",
  },
  required: {
    fontSize: 13,
    fontWeight: "bold",
    color: "black",
  },
  optional: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 2,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 4,
    elevation: 0,
    // Additional styles to minimize visual distinction:
    borderWidth: -5,
    borderColor: "white", // Match the background color of the surrounding screen
    opacity: 1, // Slightly reduce opacity to blend with the background
  },
  optionContainerSelected: {
    backgroundColor: "white",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 17,
  },

  radioSelected: {
    borderColor: "#006491",
    borderWidth: 2,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#006491", // Change to the desired color when selected
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "black",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 13,
    color: "#006491",
    fontWeight: "bold",
  },
  toppingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 3,
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    marginVertical: 4,
    elevation: 1,
  },
  toppingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  toppingImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  toppingLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  toppingPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#006491",
    marginRight: 8,
  },
  nutritionalButton: {
    backgroundColor: "#006491",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  nutritionalButtonText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
  },
  instructionsInput: {
    height: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    borderTopWidth: 1,
    borderColor: "white",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  quantityButton: {
    width: 33,
    height: 33,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  quantityButtonMinusInactive: {
    backgroundColor: "#d3d3d3", // Light grey
  },
  quantityTextMinusInactive: {
    color: "#696969", // Dark grey
    fontWeight: "900",
    fontSize: 30,
    textAlign: "center", // Center text horizontally
    lineHeight: 33, // Match this to the button's height for vertical centering
  },
  quantityButtonMinusActive: {
    backgroundColor: "#ff0000", // Red
  },
  quantityTextMinusActive: {
    color: "#ffffff", // White
    fontWeight: "900",
    fontSize: 30,
    textAlign: "center", // Center text horizontally
    lineHeight: 33, // Match this to the button's height for vertical centering
  },
  quantityButtonPlus: {
    backgroundColor: "#006491", // Blue
  },
  quantityTextPlus: {
    color: "#ffffff", // White
    fontWeight: "900",
    fontSize: 30,
    textAlign: "center", // Center text horizontally
    lineHeight: 33, // Match this to the button's height for vertical centering
    textShadowColor: "#ffffff", // Black shadow
    textShadowOffset: { width: 0.8, height: 0.8 },
    textShadowRadius: 0.8,
  },

  quantity: {
    fontSize: 16,
    marginHorizontal: 16,
  },
  quantity: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 4,
  },
  addButton: {
    flex: 1,
    backgroundColor: "#006491",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 58,
  },
  addButtonDisabled: {
    backgroundColor: "#ccc",
  },
  addButtonText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
});

export default DealCustomizationScreen;
