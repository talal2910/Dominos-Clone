import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { ChevronLeft, Eye, EyeOff } from "lucide-react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("MainTabs");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  const handleBackPress = () => {
    navigation.navigate("MainTabs");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ChevronLeft size={24} color="#0066cc" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign In</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={require("../assets/pizza-banner.jpg")} //
          style={styles.banner}
          resizeMode="cover"
        />

        <View style={styles.formContainer}>
          <Image
            source={{ uri: "/placeholder.svg?height=32&width=32" }}
            style={styles.logo}
          />

          <Text style={styles.title}>Sign In</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>+92</Text>
            <TextInput
              style={styles.input}
              placeholder="3"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
            <Text style={styles.required}>*</Text>
          </View>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>SEND OTP</Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            By signing in, you agree with the{" "}
            <Text style={styles.link}>Privacy Policy</Text> and{" "}
            <Text style={styles.link}>Terms and Conditions</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    height: 60,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 15,
    color: "#006491",
    marginLeft: 2,
    fontWeight: "900",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 70,
    color: "#333",
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  logo: {
    position: "absolute",
    top: -40,
    left: 10,
    width: 28,
    height: 28,
  },
  banner: {
    width: "100%",
    height: 180,
    backgroundColor: "#000",
  },
  formContainer: {
    flex: 1,
    padding: 18,
    paddingTop: 8,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 12,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 12,
    paddingBottom: 6,
    backgroundColor: "#e9ecef",
  },
  prefix: {
    fontSize: 12,
    color: "#666",
    marginRight: 2,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: "#000",
    padding: 0,
  },
  required: {
    color: "#e31837",
    marginLeft: 2,
    fontSize: 14,
  },
  forgotPassword: {
    color: "#0066cc",
    fontSize: 12,
    marginBottom: 8,
  },
  terms: {
    fontSize: 10,
    color: "#333",
    marginBottom: 12,
    lineHeight: 14,
  },
  link: {
    color: "#0066cc",
  },
  signInButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 7,
    padding: 5,
    alignItems: "center",
    marginBottom: 12,
    marginTop: 13,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: "white",
  },
  noAccount: {
    fontSize: 12,
    color: "#333",
    marginBottom: 6,
    textAlign: "center",
  },
  createButton: {
    backgroundColor: "#006491",
    borderRadius: -20,
    padding: 6,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
  },
});
