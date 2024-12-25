import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const { width, height } = Dimensions.get("window");

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const mockStores: Store[] = [
  {
    id: "1",
    name: "Domino's Pizza Gulberg",
    address: "123 Main St, Gulberg",
    city: "Lahore",
    coordinates: { lat: 31.5204, lng: 74.3587 },
  },
  {
    id: "2",
    name: "Domino's Pizza DHA",
    address: "456 Park Rd, DHA",
    city: "Lahore",
    coordinates: { lat: 31.4804, lng: 74.4023 },
  },
  {
    id: "3",
    name: "Domino's Pizza Clifton",
    address: "789 Beach Ave, Clifton",
    city: "Karachi",
    coordinates: { lat: 24.8608, lng: 67.0011 },
  },
  {
    id: "4",
    name: "Domino's Pizza Saddar",
    address: "101 Market St, Saddar",
    city: "Karachi",
    coordinates: { lat: 24.86, lng: 67.01 },
  },
  {
    id: "5",
    name: "Domino's Pizza F-10",
    address: "202 Hill Rd, F-10",
    city: "Islamabad",
    coordinates: { lat: 33.6844, lng: 73.0479 },
  },
];

const pakistanCities = ["Lahore", "Karachi", "Islamabad"];

const initialRegion = {
  latitude: 30.3753,
  longitude: 69.3451,
  latitudeDelta: 12,
  longitudeDelta: 8,
};

const StoreLocator: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [filteredStores, setFilteredStores] = useState<Store[]>(mockStores);
  const [region, setRegion] = useState(initialRegion);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (selectedCity) {
      const cityStores = mockStores.filter(
        (store) => store.city === selectedCity
      );
      setFilteredStores(cityStores);
      if (cityStores.length > 0) {
        const { lat, lng } = cityStores[0].coordinates;
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      }
    } else {
      setFilteredStores(mockStores);
      setRegion(initialRegion);
    }
    setSelectedStore("");
  }, [selectedCity]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const handleStoreSelect = (storeId: string) => {
    setSelectedStore(storeId);
    const store = mockStores.find((s) => s.id === storeId);
    if (store) {
      const { lat, lng } = store.coordinates;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      mapRef.current?.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
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
      <Text style={styles.title}>Store Locator</Text>

      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        provider={PROVIDER_GOOGLE}
      >
        {filteredStores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{
              latitude: store.coordinates.lat,
              longitude: store.coordinates.lng,
            }}
            title={store.name}
            description={store.address}
            image={require("../assets/dominos-logo.png")}
          />
        ))}
      </MapView>

      <View style={styles.card}>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => handleCityChange(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="" />
          {pakistanCities.map((city) => (
            <Picker.Item key={city} label={city} value={city} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedStore}
          onValueChange={(itemValue) => handleStoreSelect(itemValue)}
          style={styles.picker}
          enabled={filteredStores.length > 0}
        >
          <Picker.Item label="Select Store" value="" />
          {filteredStores.map((store) => (
            <Picker.Item key={store.id} label={store.name} value={store.id} />
          ))}
        </Picker>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 7,
    backgroundColor: "white",
    zIndex: 2,
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
    fontSize: 28,
    fontWeight: "800",
    color: "#e31837",
    marginLeft: 16,
    marginBottom: 16,
    backgroundColor: "white",
    zIndex: 2,
  },
  card: {
    position: "absolute",
    top: 120,
    left: 16,
    right: 16,
    backgroundColor: "white",
    padding: 9,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    zIndex: 1,
  },
  picker: {
    height: 55,
    marginBottom: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 40,
    borderWidth: 1.8,
    borderColor: "black",
    paddingHorizontal: 20,
    fontSize: 10,
    fontWeight: "600",
    color: "black",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    top: 80,
  },
});

export default StoreLocator;
