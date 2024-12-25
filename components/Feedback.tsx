import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { storeLocations } from "../data/More";

const feedbackTypes = [
  "Product Quality",
  "Service Quality",
  "Delivery Time",
  "App Experience",
  "Other",
];

const Feedback = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    store: "",
    date: new Date().toISOString().split("T")[0],
    receiptNumber: "",
    feedbackType: "",
    feedback: "",
  });

  const handleSubmit = () => {
    // Implement feedback submission logic here
    console.log("Submitting feedback:", formData);
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
      <Text style={styles.title}>FeedBack</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>WE'RE ALWAYS HUNGRY TO BE BETTER</Text>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              value={formData.fullName}
              onChangeText={(text) =>
                setFormData({ ...formData, fullName: text })
              }
            />

            <View style={styles.phoneInput}>
              <Text style={styles.prefix}>+92</Text>
              <TextInput
                style={[styles.input, styles.phoneNumber]}
                placeholder="Mobile Number *"
                value={formData.mobileNumber}
                onChangeText={(text) =>
                  setFormData({ ...formData, mobileNumber: text })
                }
                keyboardType="phone-pad"
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Email Address *"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />

            {/* Add Select components for Store and Feedback Type */}

            <TextInput
              style={styles.input}
              placeholder="Receipt Number *"
              value={formData.receiptNumber}
              onChangeText={(text) =>
                setFormData({ ...formData, receiptNumber: text })
              }
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Feedback *"
              value={formData.feedback}
              onChangeText={(text) =>
                setFormData({ ...formData, feedback: text })
              }
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              style={[
                styles.submitButton,
                !formData.fullName && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!formData.fullName}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#e31837",
    marginLeft: 16,
    marginBottom: 3,
  },
  scrollView: {
    flex: 1,
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
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 10,
    color: "#333",
  },
  formContainer: {
    gap: 16,
  },
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderColor: "white",
    borderBottomColor: "black",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333",
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  prefix: {
    fontSize: 16,
    color: "#666",
    marginRight: 8,
  },
  phoneNumber: {
    flex: 1,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: "#006491",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Feedback;
