import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../types";

type ProductCardProps = {
  product: Product;
  onPress: (product: Product) => void;
  onFavorite?: (product: Product) => void;
};

const fallbackImageUri = "https://via.placeholder.com/150";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onFavorite,
}) => {
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const handlePress = () => {
    console.log("Product pressed:", product.name); // Debugging log
    onPress(product);
  };

  const handleFavorite = (event: GestureResponderEvent) => {
    event.stopPropagation(); // Prevent the card's onPress from firing
    if (onFavorite) {
      onFavorite(product);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
      testID={`product-card-${product.id}`}
    >
      {product.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{product.discount}% Off</Text>
        </View>
      )}

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageError ? fallbackImageUri : product.image }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />

        <View style={styles.tagContainer}>
          {product.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newText}>NEW</Text>
            </View>
          )}
          {product.isHot && (
            <View style={[styles.newBadge, styles.hotBadge]}>
              <Ionicons name="flame" size={12} color="white" />
            </View>
          )}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {product.name}
          </Text>
          <TouchableOpacity
            onPress={handleFavorite}
            style={styles.favoriteButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="heart-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.fromText}>From </Text>
          <Text style={styles.currentPrice}>
            Rs. {product.price.toFixed(2)}
          </Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              Rs. {product.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 17,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "visible",
  },
  imageContainer: {
    width: "100%",
    height: 160,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  discountBadge: {
    position: "absolute",
    top: -3,
    right: -3,
    backgroundColor: "#006491",
    borderRadius: 50,
    width: 43,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  discountText: {
    color: "white",
    fontSize: 12.1,
    fontWeight: "900",
  },
  tagContainer: {
    position: "absolute",
    bottom: 8,
    left: 8,
    flexDirection: "row",
    gap: 8,
  },
  newBadge: {
    backgroundColor: "#ff0066",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  hotBadge: {
    backgroundColor: "#ff3d00",
  },
  newText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 0,
    lineHeight: 17,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 2,
    flexWrap: "wrap",
  },
  fromText: {
    fontSize: 11.5,
    color: "#666",
  },
  currentPrice: {
    fontSize: 11.5,
    fontWeight: "bold",
    color: "#006491",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 11,
    color: "red",
    textDecorationLine: "line-through",
  },
});

export default ProductCard;
