import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Store } from "../data/stores";
import DatePickerModal from "./DatePickerModal";
import TimePickerModal from "./TimePickerModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Menu: { selectedStore: Store; deliveryTime: string };
  DeliveryDetails: { store: Store };
};

type DeliveryDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DeliveryDetails"
>;

type DeliveryDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "DeliveryDetails"
>;

const DeliveryDetailsScreen = () => {
  const navigation = useNavigation<DeliveryDetailsScreenNavigationProp>();
  const route = useRoute<DeliveryDetailsScreenRouteProp>();
  const [store, setStore] = useState<Store>(route.params.store);
  const [showDeliveryLater, setShowDeliveryLater] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    loadOrderDetails();
  }, []);

  const loadOrderDetails = async () => {
    try {
      const storedStore = await AsyncStorage.getItem("selectedStore");
      if (storedStore) {
        const parsedStore = JSON.parse(storedStore);
        setStore(parsedStore);
      }
    } catch (error) {
      console.error("Error loading order details:", error);
    }
  };
  const handleStartOrder = async (isLater: boolean = false) => {
    try {
      const deliveryTime = isLater ? `${selectedDate} ${selectedTime}` : "Now";
      await AsyncStorage.setItem("deliveryTime", deliveryTime);
      navigation.navigate("Menu", {
        screen: "MenuHome",
        params: {
          selectedStore: store,
          deliveryTime: deliveryTime,
        },
      });
    } catch (error) {
      console.error("Error saving delivery time:", error);
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowTimePicker(false);
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

      <Text style={styles.title}>Delivery</Text>

      <View style={styles.storeCard}>
        <View style={styles.storeHeader}>
          <View style={styles.storeIcon}>
            <Ionicons name="business" size={24} color="#E31837" />
          </View>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>Domino's {store.title}</Text>
            <Text style={styles.storeStatus}>{store.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.deliveryCard}>
        <TouchableOpacity style={styles.deliveryNow}>
          <Text style={styles.deliveryNowText}>Deliver Now</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.startOrderButton}
          onPress={() => handleStartOrder(false)}
        >
          <Text style={styles.startOrderText}>Start Order</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.deliveryLaterCard}>
        <TouchableOpacity
          style={styles.deliveryLaterHeader}
          onPress={() => setShowDeliveryLater(!showDeliveryLater)}
        >
          <Text style={styles.deliveryLaterTitle}>Deliver Later</Text>
          <Ionicons
            name={showDeliveryLater ? "chevron-up" : "chevron-down"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>

        {showDeliveryLater && (
          <View style={styles.deliveryLaterContent}>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.pickerButtonText}>
                {selectedDate || "Choose Date"}
              </Text>
              <Ionicons name="chevron-down" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.timePickerButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.pickerButtonText}>
                {selectedTime || "Choose Time"}
              </Text>
              <Ionicons name="chevron-down" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.startOrderButton,
                (!selectedDate || !selectedTime) &&
                  styles.startOrderButtonDisabled,
              ]}
              disabled={!selectedDate || !selectedTime}
              onPress={() => handleStartOrder(true)}
            >
              <Text
                style={[
                  styles.startOrderText,
                  (!selectedDate || !selectedTime) &&
                    styles.startOrderTextDisabled,
                ]}
              >
                Start Order
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <DatePickerModal
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelectDate={handleDateSelect}
      />

      <TimePickerModal
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        onSelectTime={handleTimeSelect}
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
  storeCard: {
    backgroundColor: "#f5f5f5",
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  storeHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  storeIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  storeStatus: {
    fontSize: 16,
    color: "#006491",
  },
  deliveryCard: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deliveryNow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  deliveryNowText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  startOrderButton: {
    backgroundColor: "#006491",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  startOrderButtonDisabled: {
    backgroundColor: "#ccc",
  },
  startOrderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  startOrderTextDisabled: {
    color: "#666",
  },
  deliveryLaterCard: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deliveryLaterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deliveryLaterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  deliveryLaterContent: {
    marginTop: 16,
  },
  datePickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  timePickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#666",
  },
});

export default DeliveryDetailsScreen;
