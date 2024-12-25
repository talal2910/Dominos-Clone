import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { stores, Store } from "../data/stores";

const { width, height } = Dimensions.get("window");

type RootStackParamList = {
  DeliveryDetails: { store: Store };
};

type DeliveryAddressScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DeliveryDetails"
>;

const DeliveryAddressScreen = () => {
  const navigation = useNavigation<DeliveryAddressScreenNavigationProp>();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [address, setAddress] = useState("");
  const [homeNumber, setHomeNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [sectorBlockPhase, setSectorBlockPhase] = useState("");
  const [loading, setLoading] = useState(true);
  const errorAnimation = useRef(new Animated.Value(0)).current;
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const fetchCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      focusOnLocation(currentLocation);

      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (addressResponse[0]) {
        const addr = addressResponse[0];
        setAddress(
          `${addr.district || addr.subregion}, ${addr.city}, ${addr.region}`
        );
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setLoading(false);
    }
  };

  const focusOnLocation = (loc: Location.LocationObject | null) => {
    if (loc && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  };

  const handleAddAddress = () => {
    if (!homeNumber.trim() || !streetName.trim() || !sectorBlockPhase.trim()) {
      showErrorMessage("All fields are required");
      return;
    }

    const userInput =
      `${homeNumber} ${streetName} ${sectorBlockPhase}`.toLowerCase();
    const matchedStore = findMatchingStore(userInput);

    if (matchedStore) {
      navigation.navigate("DeliveryDetails", { store: matchedStore });
    } else {
      showErrorMessage("No store found matching the address");
    }
  };

  const findMatchingStore = (userInput: string): Store | null => {
    return (
      stores.find((store) => {
        const storeInfo = `${store.title} ${store.address}`.toLowerCase();
        return userInput.split(" ").some((word) => storeInfo.includes(word));
      }) || null
    );
  };

  const showErrorMessage = (message: string) => {
    Animated.sequence([
      Animated.timing(errorAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(errorAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    console.error(message);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006491" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#006491" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Address</Text>
      </View>

      {location && (
        <View style={styles.mapContainer}>
          {address && (
            <View style={styles.addressBanner}>
              <Text style={styles.addressText}>{address}</Text>
              <TouchableOpacity onPress={() => setAddress("")}>
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          )}

          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={
              location
                ? {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }
                : undefined
            }
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              />
            )}
          </MapView>

          <TouchableOpacity
            style={styles.centerButton}
            onPress={() => focusOnLocation(location)}
          >
            <Ionicons name="locate" size={24} color="#006491" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Home / Apartment / Office / Plot number"
          value={homeNumber}
          onChangeText={setHomeNumber}
          placeholderTextColor="#666"
        />
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Street/Building/Landmark"
            value={streetName}
            onChangeText={setStreetName}
            placeholderTextColor="#666"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Sector/Block/Phase"
            value={sectorBlockPhase}
            onChangeText={setSectorBlockPhase}
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
          <Text style={styles.addButtonText}>Add Address</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.errorMessage,
          {
            transform: [
              {
                translateY: errorAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
            opacity: errorAnimation,
          },
        ]}
      >
        <Text style={styles.errorText}>Error: All fields are required</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#006491",
    marginLeft: 8,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  addressBanner: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginRight: 8,
  },
  map: {
    flex: 1,
    width: width,
    height: height * 0.6,
  },
  centerButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    padding: 12,
    backgroundColor: "#f8f8f8",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "silver",
    borderRadius: 2,
    padding: 6,
    marginBottom: 7,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderColor: "white",
    fontSize: 13,
    height: 32,
  },
  halfInput: {
    width: "48%",
  },
  addButton: {
    backgroundColor: "#006491",
    borderRadius: 11,
    padding: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
  },
  errorText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DeliveryAddressScreen;
