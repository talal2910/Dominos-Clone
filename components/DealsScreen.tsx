import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import DealProductCard from "./DealProductCard";
import { dealsData, DealCategory } from "../data/dealsData";
import { DealProduct } from "../types";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 48 = padding (16) * 2 + gap (16)

const DealsScreen = () => {
  const navigation = useNavigation();

  const renderProduct = ({ item }: { item: DealProduct }) => (
    <View style={{ width: cardWidth, marginBottom: 16 }}>
      <DealProductCard product={item} />
    </View>
  );

  const renderCategory = ({ item }: { item: DealCategory }) => (
    <View key={item.id} style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <View style={styles.productsContainer}>
        {item.products.map((product) => (
          <View key={product.id} style={{ width: cardWidth, marginBottom: 16 }}>
            <DealProductCard product={product} />
          </View>
        ))}
      </View>
    </View>
  );
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Menu", { screen: "MenuHome" });
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  const handleBackPress = () => {
    navigation.navigate("Menu", { screen: "MenuHome" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#006491"
            style={styles.backIcon}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>Deals</Text>
      </View>

      <FlatList
        data={dealsData}
        renderItem={renderCategory}
        keyExtractor={(category) => category.id}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
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
    justifyContent: "space-between",
    padding: 13,
    paddingTop: 8,
    backgroundColor: "white",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    marginTop: 6,
    fontWeight: "900",
  },
  backText: {
    marginTop: 6,
    marginLeft: 15,
    fontSize: 17,
    color: "#006491",
    fontWeight: "900",
  },
  titleContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingBottom: -3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "red",
  },
  content: {
    padding: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    borderBottomWidth: 2, // Thickness of the line
    borderBottomColor: "black", // Color of the line
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default DealsScreen;
