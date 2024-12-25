import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DealProduct } from "../types";
import { useNavigation } from "@react-navigation/native";

type DealProductCardProps = {
  product: DealProduct;
  onFavorite?: () => void;
};

const fallbackImageUri = ""; // Leave this empty as requested

const DealProductCard: React.FC<DealProductCardProps> = ({
  product,
  onFavorite,
}) => {
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation();

  if (!product) return null;

  const handlePress = () => {
    navigation.navigate("DealCustomization", { product });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.9}
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
          <TouchableOpacity onPress={onFavorite} style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.fromText}>From </Text>
          <Text style={styles.currentPrice}>Rs. {product.price}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              Rs. {product.originalPrice}
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
    borderRadius: 16,
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
    height: 150,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
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
    padding: 0,
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
    right: 3,
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
    flex: 2,
    lineHeight: 17,
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
    justifyContent: "space-between",
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

export default DealProductCard;
