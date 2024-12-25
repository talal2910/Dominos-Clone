import React from "react";
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
import { allianceDiscounts } from "../data/More";

const Alliances = () => {
  const navigation = useNavigation();

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
      <Text style={styles.title}>Alliances & Discounts</Text>

      <ScrollView style={styles.content}>
        {allianceDiscounts.map((alliance, index) => (
          <View key={index} style={styles.allianceCard}>
            <Image source={{ uri: alliance.logo }} style={styles.bankLogo} />
            <Text style={styles.bankName}>{alliance.bankName}</Text>
            <Text style={styles.discount}>{alliance.discount}</Text>
            {alliance.terms.map((term, termIndex) => (
              <Text key={termIndex} style={styles.term}>
                {term}
              </Text>
            ))}
          </View>
        ))}
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
  allianceCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bankLogo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 16,
  },
  bankName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#006491",
    marginBottom: 8,
  },
  discount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e31837",
    marginBottom: 16,
  },
  term: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
});

export default Alliances;
