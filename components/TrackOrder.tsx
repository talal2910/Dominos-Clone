import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TrackOrder = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleTrack = () => {
    // Implement order tracking logic here
    console.log("Tracking order:", { mobileNumber, orderId });
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
      <Text style={styles.title}>Track Order</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          TRACK YOUR ORDER'S REAL TIME STATE.
        </Text>

        {/* Mobile Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+92</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
          />
        </View>

        {/* Order ID Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Order ID"
            value={orderId}
            onChangeText={setOrderId}
          />
        </View>

        {/* Track Button */}
        <TouchableOpacity
          style={[
            styles.trackButton,
            (!mobileNumber || !orderId) && styles.trackButtonDisabled,
          ]}
          onPress={handleTrack}
          disabled={!mobileNumber || !orderId}
        >
          <Text style={styles.trackButtonText}>Track</Text>
        </TouchableOpacity>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#e31837",
    marginLeft: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 4.5,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#e9ecef",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 4,
  },
  prefix: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  input: {
    height: 48,
    fontSize: 16,
    color: "#333",
  },
  orderIdText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  trackButton: {
    backgroundColor: "#006491",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  trackButtonDisabled: {
    backgroundColor: "#ccc",
  },
  trackButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TrackOrder;
