import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Store } from "../data/stores";
import DatePickerModal from "./DatePickerModal";
import TimePickerModal from "./TimePickerModal";

type RootStackParamList = {
  Home: { selectedStore: Store; pickupTime: string };
  StoreDetails: { store: Store };
};

type StoreDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "StoreDetails"
>;

const StoreDetailsScreen = ({ route }) => {
  const navigation = useNavigation<StoreDetailsScreenNavigationProp>();
  const { store } = route.params as { store: Store };
  const [showPickupLater, setShowPickupLater] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleStartOrder = (isLater: boolean = false) => {
    navigation.navigate("Menu", {
      screen: "MenuHome", // Targets HomeScreen inside the MenuStack
      params: {
        selectedStore: store,
        pickupTime: isLater ? `${selectedDate} ${selectedTime}` : "Now",
      },
    });
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

      <Text style={styles.title}>Pickup</Text>

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

      <View style={styles.pickupCard}>
        <TouchableOpacity style={styles.pickupNow}>
          <Text style={styles.pickupNowText}>Pickup Now</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.startOrderButton}
          onPress={() => handleStartOrder(false)}
        >
          <Text style={styles.startOrderText}>Start Order</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pickupLaterCard}>
        <TouchableOpacity
          style={styles.pickupLaterHeader}
          onPress={() => setShowPickupLater(!showPickupLater)}
        >
          <Text style={styles.pickupLaterTitle}>Pickup Later</Text>
          <Ionicons
            name={showPickupLater ? "chevron-up" : "chevron-down"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>

        {showPickupLater && (
          <View style={styles.pickupLaterContent}>
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
  pickupCard: {
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
  pickupNow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  pickupNowText: {
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
  pickupLaterCard: {
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
  pickupLaterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickupLaterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  pickupLaterContent: {
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

export default StoreDetailsScreen;
