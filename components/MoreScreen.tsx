import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const menuItems = [
  { name: "About Us", screen: "AboutUs" },
  { name: "Track Order", screen: "TrackOrder" },
  { name: "Store Locator", screen: "StoreLocator" },
  { name: "Privacy Policy", screen: "PrivacyPolicy" },
  { name: "Terms & Conditions", screen: "TermsAndConditions" },
  { name: "Alliances", screen: "Alliances" },
  { name: "Nutritional Info", screen: "NutritionalInfo" },
  { name: "Feedback", screen: "Feedback" },
  { name: "Download Menu", action: "downloadMenu" },
];

const socialIcons = [
  {
    platform: "facebook",
    url: "https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png",
    link: "https://www.facebook.com/DominosPizzaIndia",
  },
  {
    platform: "youtube",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
    link: "https://www.youtube.com/user/dominos",
  },
  {
    platform: "twitter",
    url: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    link: "https://twitter.com/dominos_india",
  },
  {
    platform: "instagram",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    link: "https://www.instagram.com/dominos_india/",
  },
  {
    platform: "whatsapp",
    url: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
    link: "https://api.whatsapp.com/send?phone=919711011011",
  },
];

const MoreScreen = () => {
  const navigation = useNavigation();

  const handleMenuItemPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  const handleBackPress = () => {
    navigation.navigate("Menu", { screen: "MenuHome" });
  };

  const handleSocialIconPress = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#0066cc" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>More</Text>
      <ScrollView style={styles.scrollView}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item)}
          >
            <Text style={styles.menuItemText}>{item.name}</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        ))}
        <View style={styles.socialIcons}>
          {socialIcons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSocialIconPress(icon.link)}
            >
              <Image source={{ uri: icon.url }} style={styles.iconImage} />
            </TouchableOpacity>
          ))}
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
    fontSize: 26,
    fontWeight: "800",
    color: "#e31837",
    marginLeft: 12,
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 9,
    marginHorizontal: 11,
    marginBottom: 5.5,
    borderRadius: 8,
    borderWidth: 1.6,
    borderColor: "black",
  },
  menuItemText: {
    fontSize: 14,
    color: "#333",
    marginHorizontal: 16,
    fontWeight: "800",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 40,
  },
  iconImage: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
    borderRadius: 25,
    overflow: "hidden",
  },
});

export default MoreScreen;
