import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const { width, height } = Dimensions.get("window");

const IntroScreen = () => {
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playFromPositionAsync(35000);
    }

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.positionMillis >= 38000) {
      videoRef.current?.setPositionAsync(35000);
    }
  };

  const handleSkip = () => {
    navigation.navigate("MainTabs");
  };

  const handleLogin = () => {
    navigation.navigate("SignIn");
  };

  const handleDeliveryOrPickup = (type: "delivery" | "pickup") => {
    if (type === "delivery") {
      navigation.navigate("DeliveryAddress");
    } else {
      navigation.navigate("Pickup");
    }
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  return (
    <View style={styles.container}>
      <MaskedView
        style={styles.maskedView}
        maskElement={
          <LinearGradient
            colors={["transparent", "white", "white", "transparent"]}
            locations={[0, 0.1, 0.9, 1]}
            style={styles.maskGradient}
          />
        }
      >
        <LinearGradient
          colors={["black", "transparent"]}
          style={styles.topGradient}
        >
          <View style={styles.logoSection}>
            <Image
              source={require("../assets/dominos.png")}
              style={styles.logo}
              resizeMode="cover"
            />
          </View>
        </LinearGradient>

        <View style={styles.videoSection}>
          <Video
            ref={videoRef}
            source={require("../assets/video.mp4")}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
            rate={0.5}
            isMuted={true}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
        </View>

        <LinearGradient
          colors={["transparent", "black"]}
          style={styles.bottomGradient}
        />
      </MaskedView>

      <Animated.View
        style={[
          styles.actionsOverlay,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.deliveryOptions}>
          <TouchableOpacity
            style={styles.deliveryButton}
            onPress={() => handleDeliveryOrPickup("delivery")}
          >
            <Ionicons name="bicycle-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Delivery</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity
            style={styles.pickupButton}
            onPress={() => handleDeliveryOrPickup("pickup")}
          >
            <Ionicons name="home-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Pickup</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip For Now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  maskedView: {
    flex: 1,
  },
  maskGradient: {
    flex: 1,
  },
  topGradient: {
    height: height / 6.5,
    justifyContent: "center",
    alignItems: "center",
  },
  logoSection: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logo: {
    width: "105%",
    height: "105%",
  },
  videoSection: {
    height: (height * 4) / 7,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  bottomGradient: {
    height: height / 6,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  actionsOverlay: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  deliveryOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  deliveryButton: {
    backgroundColor: "#006491",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  pickupButton: {
    backgroundColor: "#E31837",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  orText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 8,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: "center",
    marginBottom: 5,
  },
  loginButtonText: {
    color: "white",
    fontSize: 13.4,
    fontWeight: "800",
  },
  skipText: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
  },
});

export default IntroScreen;
