import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Category } from "../types";

const { width } = Dimensions.get("window");

type CategoryBarProps = {
  categories: Category[];
  selectedCategoryIndex: number;
  onSelectCategory: (index: number) => void;
  scrollX: Reanimated.SharedValue<number>;
};

const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategoryIndex,
  onSelectCategory,
  scrollX,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const indicatorPosition = useDerivedValue(() => {
    if (scrollX && typeof scrollX.value !== "undefined") {
      return interpolate(
        scrollX.value,
        categories.map((_, i) => i * width),
        categories.map((_, i) => i * (width / categories.length)),
        Extrapolate.CLAMP
      );
    }
    return selectedCategoryIndex * (width / categories.length);
  });

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
    };
  });

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: selectedCategoryIndex * (width / categories.length),
      animated: true,
    });
  }, [selectedCategoryIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map(({ id, icon, name }, index) => (
          <TouchableOpacity
            key={id}
            style={[
              styles.category,
              selectedCategoryIndex === index && styles.selectedCategory,
            ]}
            onPress={() => onSelectCategory(index)}
          >
            <Ionicons
              name={icon as any}
              size={24}
              style={[
                styles.icon,
                selectedCategoryIndex === index && styles.selectedIcon,
              ]}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategoryIndex === index && styles.selectedCategoryText,
              ]}
            >
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Reanimated.View style={[styles.activeIndicator, indicatorStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  scrollContent: {
    paddingVertical: 12,
  },
  category: {
    alignItems: "center",
    width: width / 5, // Assuming 5 categories visible at a time
    justifyContent: "center",
  },
  selectedCategory: {
    position: "relative",
  },
  icon: {
    marginBottom: 4,
    color: "#666",
  },
  selectedIcon: {
    color: "#006491",
  },
  categoryText: {
    fontSize: 13,
    color: "grey",
    marginBottom: 2,
    fontWeight: "bold",
  },
  selectedCategoryText: {
    color: "#006491",
    fontWeight: "600",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width / 5, // Same as category width
    height: 2,
    backgroundColor: "#006491",
  },
});

export default CategoryBar;
