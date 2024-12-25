import React from "react";
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

type DatePickerModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
};

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  onSelectDate,
}) => {
  const today = new Date();
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  ).getDay();
  const daysInMonth = getDaysInMonth(today.getMonth(), today.getFullYear());

  const dates = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDayOfMonth + 1;
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      return dayNumber;
    }
    return null;
  });

  const handleDateSelect = (day: number) => {
    const selectedDate = `${currentMonth} ${day}, ${currentYear}`;
    onSelectDate(selectedDate);
    onClose();
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
            <Text style={styles.headerTitle}>SELECT DATE</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.selectedDate}>
            <Text style={styles.selectedDateText}>
              {`${today.toLocaleString("default", {
                weekday: "short",
              })}, ${currentMonth.slice(0, 3)} ${today.getDate()}`}
            </Text>
            <TouchableOpacity>
              <Ionicons name="pencil" size={24} color="#006491" />
            </TouchableOpacity>
          </View>

          <View style={styles.monthSelector}>
            <Text
              style={styles.monthYear}
            >{`${currentMonth} ${currentYear}`}</Text>
            <View style={styles.monthControls}>
              <TouchableOpacity>
                <Ionicons name="chevron-back" size={24} color="#006491" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={24} color="#006491" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.calendar}>
            <View style={styles.weekDays}>
              {days.map((day) => (
                <Text key={day} style={styles.weekDay}>
                  {day}
                </Text>
              ))}
            </View>
            <View style={styles.dates}>
              {dates.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateButton,
                    day === today.getDate() && styles.currentDate,
                  ]}
                  onPress={() => day && handleDateSelect(day)}
                  disabled={!day}
                >
                  <Text
                    style={[
                      styles.dateText,
                      day === today.getDate() && styles.currentDateText,
                    ]}
                  >
                    {day || ""}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => handleDateSelect(today.getDate())}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006491",
  },
  selectedDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#006491",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedDateText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthYear: {
    fontSize: 18,
    color: "#333",
  },
  monthControls: {
    flexDirection: "row",
    gap: 8,
  },
  calendar: {
    marginBottom: 16,
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  weekDay: {
    width: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  dates: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateButton: {
    width: (width * 0.9) / 7,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  currentDate: {
    backgroundColor: "#006491",
    borderRadius: 20,
  },
  currentDateText: {
    color: "white",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
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

export default DatePickerModal;
