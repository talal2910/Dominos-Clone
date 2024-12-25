import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  PanResponder,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Reanimated, {
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
} from "react-native-reanimated";
import CategoryBar from "./CategoryBar";
import ProductCard from "./ProductCard";
import OrderTypeModal from "./OrderTypeModal";
import { Product, Category, Store } from "../types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 32) / 2;
const BANNER_HEIGHT = width * 0.25;
const BANNER_PADDING = 8;

// Import your local banner images here
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";

const banners = [banner1, banner2, banner3, banner4];

type HomeScreenProps = {
  categories: Category[];
  products: Product[];
  selectedStore?: Store;
  pickupTime?: string;
  addedToCart: boolean;
  addedProductName: string;
  orderType: string | null;
  deliveryAddress: string | null;
  areaName: string | null;
  addToCart: (item: Product) => void;
  setAddedToCart: (value: boolean) => void;
  setAddedProductName: (value: string) => void;
};

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

const HomeScreen: React.FC<HomeScreenProps> = ({
  categories,
  products,
  selectedStore,
  pickupTime,
  addedToCart,
  addedProductName,
  orderType,
  deliveryAddress,
  areaName,
  addToCart,
  setAddedToCart,
  setAddedProductName,
}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const navigation = useNavigation();
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<Reanimated.FlatList>(null);
  const bannerRef = useRef<FlatList>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bannerScrollX = useRef(new Animated.Value(0)).current;

  const toggleModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  const handleSelectCategory = useCallback((index: number) => {
    setSelectedCategoryIndex(index);
    flatListRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  }, []);

  const handleProductPress = useCallback(
    (product: Product) => {
      console.log("Product pressed:", product.name, product.id);
      const screenName = ["2", "3", "4", "5"].includes(product.categoryId)
        ? "SimpleProductCustomization"
        : "ProductCustomization";
      navigation.navigate(screenName, { product });
    },
    [navigation]
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      runOnJS(setSelectedCategoryIndex)(
        Math.round(event.contentOffset.x / width)
      );
    },
  });

  const renderBanner = useCallback(
    ({ item }) => (
      <View style={styles.bannerWrapper}>
        <Image source={item} style={styles.banner} resizeMode="cover" />
      </View>
    ),
    []
  );

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.7}
        testID={`product-card-${item.id}`}
      >
        <ProductCard
          product={item}
          onPress={() => handleProductPress(item)}
          onFavorite={() => console.log("Favorite pressed:", item.name)}
        />
      </TouchableOpacity>
    ),
    [handleProductPress]
  );

  const renderCategory = useCallback(
    ({ item: category, index }: { item: Category; index: number }) => {
      const filteredProducts = products.filter(
        (product) => product.categoryId === category.id
      );

      return (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>
            {category.name.toUpperCase()}
          </Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => `${category.id}-${item.id}`}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No products available in this category.
              </Text>
            }
            removeClippedSubviews={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={21}
            updateCellsBatchingPeriod={50}
            getItemLayout={(data, index) => ({
              length: CARD_WIDTH,
              offset: CARD_WIDTH * index,
              index,
            })}
          />
        </View>
      );
    },
    [products, renderProduct]
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoScrolling) {
      timer = setInterval(() => {
        setCurrentBanner((prevBanner) => {
          const nextBanner = (prevBanner + 1) % banners.length;
          bannerRef.current?.scrollToIndex({
            index: nextBanner,
            animated: true,
          });
          return nextBanner;
        });
      }, 3000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoScrolling]);

  const showSuccessMessageAnimation = useCallback(() => {
    setShowSuccessMessage(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowSuccessMessage(false);
        setAddedToCart(false);
        setAddedProductName("");
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, setAddedToCart, setAddedProductName]);

  useFocusEffect(
    useCallback(() => {
      if (addedToCart && addedProductName) {
        showSuccessMessageAnimation();
      }
    }, [addedToCart, addedProductName, showSuccessMessageAnimation])
  );

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsAutoScrolling(false);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (Math.abs(gestureState.dx) > 50) {
        const direction = gestureState.dx > 0 ? -1 : 1;
        const newIndex =
          (currentBanner + direction + banners.length) % banners.length;
        setCurrentBanner(newIndex);
        bannerRef.current?.scrollToIndex({
          index: newIndex,
          animated: true,
        });
      }
      setIsAutoScrolling(true);
    },
  });

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentBanner && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    );
  };

  if (
    !categories ||
    !products ||
    categories.length === 0 ||
    products.length === 0
  ) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>
          No data available. Please check your data source.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addressBar}>
        <TouchableOpacity style={styles.addressButton} onPress={toggleModal}>
          <Text style={styles.addressText}>
            {selectedStore
              ? `${selectedStore.title}${pickupTime ? ` - ${pickupTime}` : ""}`
              : "No Address Selected"}
          </Text>
        </TouchableOpacity>
      </View>
      <CategoryBar
        categories={categories}
        selectedCategoryIndex={selectedCategoryIndex}
        onSelectCategory={handleSelectCategory}
        scrollX={scrollX}
      />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        removeClippedSubviews={false}
      >
        <View style={styles.bannerSection} {...panResponder.panHandlers}>
          <Animated.FlatList
            ref={bannerRef}
            data={banners}
            renderItem={renderBanner}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: bannerScrollX } } }],
              { useNativeDriver: false }
            )}
          />
          {renderPaginationDots()}
        </View>
        <AnimatedFlatList
          ref={flatListRef}
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          snapToInterval={width}
          decelerationRate="fast"
          removeClippedSubviews={false}
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          windowSize={5}
          updateCellsBatchingPeriod={50}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </ScrollView>
      <OrderTypeModal visible={showModal} onClose={toggleModal} />
      {showSuccessMessage && (
        <Animated.View style={[styles.successMessage, { opacity: fadeAnim }]}>
          <Text style={styles.successMessageText}>
            {addedProductName} added to cart successfully
          </Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  addressBar: {
    padding: 6,
    backgroundColor: "white",
    borderBottomWidth: 0,
    borderBottomColor: "#e0e0e0",
    alignSelf: "center",
    width: "58%",
    borderRadius: 12,
  },
  addressButton: {
    width: "100%",
  },
  addressText: {
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    padding: 3,
    fontWeight: "bold",
    borderRadius: 14,
    fontSize: 12,
    color: "black",
  },
  bannerSection: {
    marginVertical: BANNER_PADDING,
    backgroundColor: "white",
    padding: 1,
  },
  bannerWrapper: {
    width: width - BANNER_PADDING * 2,
    height: BANNER_HEIGHT,
    marginHorizontal: BANNER_PADDING,
  },
  banner: {
    width: "101%",
    height: "108%",
    borderRadius: 5,
  },
  categoryContainer: {
    width: width,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 11,
    marginTop: 3,
    borderBottomWidth: 2, // Thickness of the line
    borderBottomColor: "black", // Color of the line
  },
  cardContainer: {
    width: CARD_WIDTH,
    padding: 5,
  },
  productList: {
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "black",
  },
  successMessage: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  successMessageText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#006491",
  },
});

export default HomeScreen;
