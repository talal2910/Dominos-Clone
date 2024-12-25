import React, { useState, createContext, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { cities, stores } from "../data/stores";

// Create the AppContext
const AppContext = createContext(null);

// Create the AppProvider component
export const AppProvider = ({ children }) => {
  const [orderType, setOrderType] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <AppContext.Provider
      value={{ orderType, setOrderType, selectedStore, setSelectedStore }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

const PickupScreen = () => {
  const navigation = useNavigation();
  const { setOrderType, setSelectedStore } = useAppContext();
  const [selectedCity, setSelectedCity] = useState("");
  const [showCityPicker, setShowCityPicker] = useState(false);

  const filteredStores = stores.filter((store) => store.city === selectedCity);

  const handleStoreSelect = (store) => {
    setOrderType("pickup");
    setSelectedStore(store);
    navigation.navigate("StoreDetails", { store });
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
        <TouchableOpacity style={styles.loginButton}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Pickup</Text>

      <TouchableOpacity
        style={styles.cityPicker}
        onPress={() => setShowCityPicker(!showCityPicker)}
      >
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <Text style={[styles.cityText, !selectedCity && styles.placeholder]}>
          {selectedCity || "Select City"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      {showCityPicker && (
        <ScrollView style={styles.cityList}>
          {cities.map((city) => (
            <TouchableOpacity
              key={city}
              style={styles.cityItem}
              onPress={() => {
                setSelectedCity(city);
                setShowCityPicker(false);
              }}
            >
              <Text style={styles.cityItemText}>{city}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {selectedCity && (
        <ScrollView style={styles.storeList}>
          {filteredStores.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={styles.storeItem}
              onPress={() => handleStoreSelect(store)}
            >
              <View style={styles.storeIcon}>
                <Ionicons name="business" size={24} color="#006491" />
              </View>
              <View style={styles.storeInfo}>
                <Text style={styles.storeTitle}>{store.title}</Text>
                <Text style={styles.storeAddress}>{store.address}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#006491",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    color: "#666",
    fontSize: 16,
    marginLeft: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E31837",
    marginLeft: 16,
    marginBottom: 16,
  },
  cityPicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  cityText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  placeholder: {
    color: "#666",
  },
  cityList: {
    maxHeight: 200,
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cityItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  cityItemText: {
    fontSize: 16,
    color: "#333",
  },
  storeList: {
    flex: 1,
  },
  storeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  storeIcon: {
    marginRight: 12,
  },
  storeInfo: {
    flex: 1,
  },
  storeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#006491",
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});

export default PickupScreen;
