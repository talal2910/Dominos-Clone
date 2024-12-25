import { Ionicons } from "@expo/vector-icons";
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isNew?: boolean;
  isHot?: boolean;
  discount?: number;
  isVegetarian?: boolean;
  isBestSeller?: boolean;
  categoryId: string;
  options?: ProductOption[];
};
export type ProductOption = {
  label: string;
  price: number;
  originalPrice?: number;
};

export type Category = {
  id: string;
  name: string;
  icon: string; // This will be replaced with a more specific type when actual icon handling is implemented
};

export type NavigationItem = {
  id: string;
  name: string;
  icon: string;
};
export type DealProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  isNew?: boolean;
  isHot?: boolean;
};
export type Store = {
  id: string;
  title: string;
  address: string;
  city: string;
  status: string;
};
