import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { nutritionalInfo } from "../data/More";

const NutritionalInfo = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("Pizza");
  const [selectedPizza, setSelectedPizza] = useState(
    nutritionalInfo.pizzas[0].name
  );
  const [selectedVariant, setSelectedVariant] = useState(
    nutritionalInfo.pizzas[0].variants[0].name
  );

  const renderNutritionalTable = () => {
    const pizza = nutritionalInfo.pizzas.find((p) => p.name === selectedPizza);
    const variant = pizza?.variants.find((v) => v.name === selectedVariant);

    if (!variant) return null;

    return (
      <View style={styles.nutritionalTable}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Nutrient</Text>
          <Text style={styles.tableHeader}>Value</Text>
        </View>
        {Object.entries(variant.nutritionalValues).map(([key, value]) => (
          <View key={key} style={styles.tableRow}>
            <Text style={styles.tableCell}>
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </Text>
            <Text style={styles.tableCell}>{value}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#006491" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Nutritional Information & Allergens</Text>

      <ScrollView style={styles.content}>
        <View style={styles.categoryButtons}>
          {nutritionalInfo.categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category &&
                    styles.selectedCategoryButtonText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedCategory === "Pizza" && (
          <>
            <View style={styles.pizzaSelector}>
              {nutritionalInfo.pizzas.map((pizza) => (
                <TouchableOpacity
                  key={pizza.name}
                  style={[
                    styles.pizzaButton,
                    selectedPizza === pizza.name && styles.selectedPizzaButton,
                  ]}
                  onPress={() => setSelectedPizza(pizza.name)}
                >
                  <Text
                    style={[
                      styles.pizzaButtonText,
                      selectedPizza === pizza.name &&
                        styles.selectedPizzaButtonText,
                    ]}
                  >
                    {pizza.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.variantSelector}>
              {nutritionalInfo.pizzas
                .find((p) => p.name === selectedPizza)
                ?.variants.map((variant) => (
                  <TouchableOpacity
                    key={variant.name}
                    style={[
                      styles.variantButton,
                      selectedVariant === variant.name &&
                        styles.selectedVariantButton,
                    ]}
                    onPress={() => setSelectedVariant(variant.name)}
                  >
                    <Text
                      style={[
                        styles.variantButtonText,
                        selectedVariant === variant.name &&
                          styles.selectedVariantButtonText,
                      ]}
                    >
                      {variant.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>

            {renderNutritionalTable()}
          </>
        )}

        {selectedCategory === "Side Lines" && (
          <View style={styles.sideLines}>
            <Text style={styles.comingSoon}>
              Nutritional information for Side Lines coming soon!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#006491",
    fontSize: 18,
    marginLeft: 3,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e31837",
    marginLeft: 16,
    marginBottom: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  categoryButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedCategoryButton: {
    backgroundColor: "#006491",
  },
  categoryButtonText: {
    fontSize: 16,
    color: "#333",
  },
  selectedCategoryButtonText: {
    color: "white",
  },
  pizzaSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pizzaButton: {
    width: "48%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  selectedPizzaButton: {
    backgroundColor: "#006491",
  },
  pizzaButtonText: {
    fontSize: 14,
    color: "#333",
  },
  selectedPizzaButtonText: {
    color: "white",
  },
  variantSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  variantButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  selectedVariantButton: {
    backgroundColor: "#006491",
  },
  variantButtonText: {
    fontSize: 12,
    color: "#333",
  },
  selectedVariantButtonText: {
    color: "white",
  },
  nutritionalTable: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 16,
  },
  tableCell: {
    fontSize: 14,
  },
  sideLines: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  comingSoon: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});

export default NutritionalInfo;
