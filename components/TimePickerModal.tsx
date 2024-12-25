import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

type TimePickerModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectTime: (time: string) => void;
};

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  onClose,
  onSelectTime,
}) => {
  const [selectedHour, setSelectedHour] = useState(11);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isPM, setIsPM] = useState(true);

  const handleTimeSelect = () => {
    const formattedHour = selectedHour.toString().padStart(2, "0");
    const formattedMinute = selectedMinute.toString().padStart(2, "0");
    const period = isPM ? "PM" : "AM";
    onSelectTime(`${formattedHour}:${formattedMinute} ${period}`);
    onClose();
  };

  const renderClockFace = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const radius = width * 0.3;
    const center = { x: radius, y: radius };

    return (
      <View
        style={[styles.clockFace, { width: radius * 2, height: radius * 2 }]}
      >
        {hours.map((hour) => {
          const angle = ((hour - 3) * 30 * Math.PI) / 180;
          const x = center.x + radius * 0.8 * Math.cos(angle);
          const y = center.y + radius * 0.8 * Math.sin(angle);

          return (
            <TouchableOpacity
              key={hour}
              style={[
                styles.hourMarker,
                {
                  left: x - 20,
                  top: y - 20,
                  backgroundColor:
                    selectedHour === hour ? "#006491" : "transparent",
                },
              ]}
              onPress={() => setSelectedHour(hour)}
            >
              <Text
                style={[
                  styles.hourText,
                  selectedHour === hour && styles.selectedHourText,
                ]}
              >
                {hour}
              </Text>
            </TouchableOpacity>
          );
        })}
        <View style={styles.clockHand} />
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>SELECT TIME</Text>
          </View>

          <View style={styles.timeDisplay}>
            <Text style={styles.timeText}>
              {`${selectedHour.toString().padStart(2, "0")}:${selectedMinute
                .toString()
                .padStart(2, "0")}`}
            </Text>
            <TouchableOpacity
              style={styles.periodSelector}
              onPress={() => setIsPM(!isPM)}
            >
              <Text style={[styles.periodText, !isPM && styles.activePeriod]}>
                AM
              </Text>
              <Text style={[styles.periodText, isPM && styles.activePeriod]}>
                PM
              </Text>
            </TouchableOpacity>
          </View>

          {renderClockFace()}

          <View style={styles.footer}>
            <TouchableOpacity style={styles.keyboardButton}>
              <Ionicons name="keypad-outline" size={24} color="#006491" />
            </TouchableOpacity>
            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okButton}
                onPress={handleTimeSelect}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006491",
  },
  timeDisplay: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    marginRight: 16,
  },
  periodSelector: {
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 4,
  },
  periodText: {
    fontSize: 16,
    color: "#666",
    padding: 4,
  },
  activePeriod: {
    color: "#006491",
    fontWeight: "bold",
  },
  clockFace: {
    position: "relative",
    alignSelf: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: width * 0.3,
    marginBottom: 24,
  },
  hourMarker: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  hourText: {
    fontSize: 16,
    color: "#333",
  },
  selectedHourText: {
    color: "white",
  },
  clockHand: {
    position: "absolute",
    width: 2,
    height: "40%",
    backgroundColor: "#006491",
    bottom: "50%",
    left: "50%",
    transformOrigin: "bottom",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  keyboardButton: {
    padding: 8,
  },
  footerButtons: {
    flexDirection: "row",
    gap: 16,
  },
  cancelButton: {
    padding: 8,
  },
  cancelButtonText: {
    color: "#006491",
    fontSize: 16,
  },
  okButton: {
    padding: 8,
  },
  okButtonText: {
    color: "#006491",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TimePickerModal;
