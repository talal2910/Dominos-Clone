import React, { useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

type OrderTypeModalProps = {
  visible: boolean;
  onClose: () => void;
};

const OrderTypeModal: React.FC<OrderTypeModalProps> = ({
  visible,
  onClose,
}) => {
  const navigation = useNavigation();
  const modalAnimation = useRef(new Animated.Value(-height)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const animateModal = useCallback(
    (toValue: number, duration: number) => {
      return Animated.spring(modalAnimation, {
        toValue,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      });
    },
    [modalAnimation]
  );

  const animateBackdrop = useCallback(
    (toValue: number, duration: number) => {
      return Animated.timing(backdropOpacity, {
        toValue,
        duration,
        useNativeDriver: true,
      });
    },
    [backdropOpacity]
  );

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        animateModal(0, 300),
        animateBackdrop(0.5, 300),
      ]).start();
    } else {
      Animated.parallel([
        animateModal(-height, 300),
        animateBackdrop(0, 300),
      ]).start();
    }
  }, [visible, animateModal, animateBackdrop]);

  const handleDeliveryPress = useCallback(() => {
    onClose();
    navigation.navigate("DeliveryAddress");
  }, [onClose, navigation]);

  const handlePickupPress = useCallback(() => {
    onClose();
    navigation.navigate("Pickup");
  }, [onClose, navigation]);

  if (!visible) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropOpacity,
          },
        ]}
      >
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[
          styles.modalContent,
          {
            transform: [{ translateY: modalAnimation }],
          },
        ]}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Select Order Type</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.orderOption}
          onPress={handleDeliveryPress}
        >
          <View style={styles.orderIconContainer}>
            <Text style={styles.orderIcon}>🚚</Text>
          </View>
          <Text style={styles.orderText}>Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderOptionPickup}
          onPress={handlePickupPress}
        >
          <View style={styles.orderIconContainerPickup}>
            <Text style={styles.orderIcon}>🏪</Text>
          </View>
          <Text style={styles.orderText}>Pickup</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  modalContent: {
    position: "absolute",
    top: height / 2 - 150,
    left: width * 0.05,
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 9,
    padding: 6.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#333",
  },
  closeButton: {
    padding: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 13.5,
    color: "white",
    fontWeight: "900",
    textAlign: "center",
  },
  orderOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "#006491",
  },
  orderOptionPickup: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 10,
    marginVertical: 0,
    backgroundColor: "red",
  },
  orderIconContainerPickup: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "red",
    borderRadius: 20,
  },
  orderIconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#006491",
    borderRadius: 20,
  },
  orderIcon: {
    fontSize: 11,
  },
  orderText: {
    fontSize: 18,
    fontWeight: "900",
    color: "white",
  },
});

export default OrderTypeModal;
