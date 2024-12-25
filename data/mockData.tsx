import { Product, Category } from "../types";

export const categories: Category[] = [
  { id: "1", name: "Pizza", icon: "pizza" },
  { id: "2", name: "Sides", icon: "fast-food-outline" },
  { id: "3", name: "Meltz", icon: "beer-outline" },
  { id: "4", name: "Desserts", icon: "ice-cream-outline" },
  { id: "5", name: "Drinks", icon: "pricetag-outline" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Chicken Seekh Kebab",
    description: "Grilled Chicken Seekh Kebab, Green Chilies & Special Sauce",
    price: 420,
    originalPrice: 599,
    discount: 30,
    image:
      "https://www.dominos.com.pk/images/b2006a70-9cda-11ef-9ba0-8f6ccd20db1e-SeekhKabab-HandTossedTop2_variant_0-2024-11-07073417.jpg",
    isNew: true,
    isHot: true,
    categoryId: "1", // Pizza category
  },
  {
    id: "2",
    name: "Hawaiian Chicken",
    description: "Chicken Chunks and Pineapples",
    price: 420,
    originalPrice: 599,
    discount: 30,
    image:
      "https://www.dominos.com.pk/images/74893f50-9cda-11ef-ad5d-6d48338cfab8-HawaiianChicken-HandTossedTopcopy_variant_0-2024-11-07073234.jpg",
    categoryId: "1", // Pizza category
  },
  {
    id: "3",
    name: "Super Cheese",
    description: "Chicken Chunks and Pineapples",
    price: 420,
    originalPrice: 599,
    discount: 30,
    image:
      "https://www.dominos.com.pk/images/b3bd35a0-9cda-11ef-a9ad-13554758a2ab-SuperCheese-HandTossedTop_variant_0-2024-11-07073420.jpg",
    categoryId: "1", // Pizza category
  },
  {
    id: "4",
    name: "Veggie",
    description: "Chicken Chunks and Pineapples",
    price: 420,
    originalPrice: 599,
    discount: 30,
    image:
      "https://www.dominos.com.pk/images/b2009180-9cda-11ef-bf94-4552bcb9a3dd-Veggie-HandTossedTopcopy_variant_0-2024-11-07073417.jpg",
    categoryId: "1", // Pizza category
  },
  {
    id: "5",
    name: "Pakistani Hot",
    description:
      "Cheddar sauce base, mozzarella cheese, beef chunks, and pickled cucumbers, drizzled with our secret burger sauce and ketchup",
    price: 450,
    originalPrice: 599,
    discount: 30,
    image:
      "https://www.dominos.com.pk/images/b3bc4b40-9cda-11ef-ba83-a7a549835d14-PakistaniHot-HandTossedTopcopy_variant_0-2024-11-07073420.jpg",
    isNew: true,
    isHot: true,
    categoryId: "1", // Pizza category
  },
  {
    id: "6",
    name: "Beef Cheese Burger",
    description:
      "Cheddar sauce base, mozzarella cheese, beef chunks, and pickled cucumbers, drizzled with our secret burger sauce and ketchup",
    price: 450,
    originalPrice: 599,
    discount: 30,
    image:
      "https://www.dominos.com.pk/images/ab040b60-a90e-11ef-a721-f509e5dbf16c-BeefCheeseBurger_variant_0-2024-11-22201633.jpg",
    isNew: true,
    isHot: true,
    categoryId: "1", // Pizza category
  },
  {
    id: "7",
    name: "Peri Peri",
    description:
      "Cheddar sauce base, mozzarella cheese, beef chunks, and pickled cucumbers, drizzled with our secret burger sauce and ketchup",
    price: 450,
    originalPrice: 599,
    discount: 30,
    image:
      "https://www.dominos.com.pk/images/b3bc4b40-9cda-11ef-ba83-a7a549835d14-PeriPeri-HandTossedTopcopy_variant_0-2024-11-07073420.jpg",
    isNew: true,
    isHot: true,
    categoryId: "1", // Pizza category
  },
  {
    id: "8",
    name: "Tex Mex",
    description:
      "Cheddar sauce base, mozzarella cheese, beef chunks, and pickled cucumbers, drizzled with our secret burger sauce and ketchup",
    price: 450,
    originalPrice: 599,
    discount: 30,
    image:
      "https://www.dominos.com.pk/images/b200b890-9cda-11ef-9e10-97371a1b8bae-TexMex-HandTossedTopcopy_variant_0-2024-11-07073417.jpg",
    isNew: true,
    isHot: true,
    categoryId: "1", // Pizza category
  },
  {
    id: "9",
    name: "Legend Dynamite",
    description:
      "Cheddar sauce base, mozzarella cheese, beef chunks, and pickled cucumbers, drizzled with our secret burger sauce and ketchup",
    price: 450,
    originalPrice: 599,
    discount: 30,
    image:
      "https://www.dominos.com.pk/images/b3bd35a0-9cda-11ef-a9ad-13554758a2ab-LegendDynamite-HandTossedTopcopy_variant_0-2024-11-07073420.jpg",
    isNew: true,
    isHot: true,
    categoryId: "1", // Pizza category
  },

  {
    id: "1",
    name: "Chicken and Chips",
    description: "Enjoy 5 strips of our oven-baked crispy chicken",
    price: 799,
    image:
      "https://www.dominos.com.pk/images/561fcd00-9c0c-11ef-9b0d-ed4b7d34116d-Chicken-and-Chips_variant_0-2024-11-06065707.jpg",
    isNew: true,
    categoryId: "2", // Sides category
    options: [
      { label: "Regular", price: 799 },
      { label: "Large", price: 999, originalPrice: 1199 },
    ],
  },
  {
    id: "2",
    name: "Chicken Strips",
    description: "Enjoy 4 strips of our oven-baked crispy chicken",
    price: 499,
    image:
      "https://www.dominos.com.pk/images/58ef67c0-9c0c-11ef-a781-9112538a4c9a-Chicken-Strips_variant_0-2024-11-06065711.jpg",
    isNew: true,
    categoryId: "2", // Sides category
    options: [
      { label: "4 Strips", price: 499 },
      { label: "6 Strips", price: 699 },
    ],
  },
  {
    id: "3",
    name: "Chicken Wings",
    description: "Enjoy 4 strips of our oven-baked crispy chicken",
    price: 499,
    image:
      "https://www.dominos.com.pk/images/561f7ee0-9c0c-11ef-8cba-a501f9a9d33c-Chicken-Wings_variant_0-2024-11-06065707.jpg",
    isNew: true,
    categoryId: "2", // Sides category
    options: [
      { label: "4 Strips", price: 499 },
      { label: "6 Strips", price: 699 },
    ],
  },
  {
    id: "4",
    name: "Twisted Dough Balls",
    description: "Enjoy 4 strips of our oven-baked crispy chicken",
    price: 499,
    image:
      "https://www.dominos.com.pk/images/4c9a0e80-9c0c-11ef-bff6-bf27d5d23f5e-Twisted-Dough-Balls_variant_0-2024-11-06065651.jpg",
    isNew: true,
    categoryId: "2", // Sides category
    options: [
      { label: "4 Strips", price: 499 },
      { label: "6 Strips", price: 699 },
    ],
  },
  {
    id: "5",
    name: "Chicken Kickers",
    description: "Enjoy 4 strips of our oven-baked crispy chicken",
    price: 499,
    image:
      "https://www.dominos.com.pk/images/4c9a0e80-9c0c-11ef-bff6-bf27d5d23f5e-Chicken-Kickers_variant_0-2024-11-06065651.jpg",
    isNew: true,
    categoryId: "2", // Sides category
    options: [
      { label: "4 Strips", price: 499 },
      { label: "6 Strips", price: 699 },
    ],
  },
  {
    id: "1",
    name: "Meltz Veggie",
    description: "Enjoy 4 strips of our oven-baked crispy chicken",
    price: 499,
    image:
      "https://www.dominos.com.pk/images/6fe385d0-a18c-11ef-8ba0-773b2a7f356a-Veggie_variant_0-2024-11-13065641.jpg",
    isNew: true,
    categoryId: "3", // Sides category
    options: [
      { label: "4 Strips", price: 499 },
      { label: "6 Strips", price: 699 },
    ],
  },
  {
    id: "2",
    name: "Meltz Peperoni",
    description: "Enjoy 4 strips of our oven-baked crispy chicken",
    price: 500,
    image:
      "https://www.dominos.com.pk/images/58ef67c0-9c0c-11ef-a0ab-8bb78e0710e7-Pepperoni_variant_0-2024-11-06065711.jpg",
    isNew: true,
    categoryId: "3", // Sides category
    options: [
      { label: "4 Strips", price: 499 },
      { label: "6 Strips", price: 699 },
    ],
  },
  {
    id: "3",
    name: "Meltz Creamy Peri",
    description: "Enjoy 4 strips of our oven-baked crispy chicken",
    price: 500,
    image:
      "https://www.dominos.com.pk/images/561f7ee0-9c0c-11ef-8cba-a501f9a9d33c-Creamy-Peri-Peri_variant_0-2024-11-06065707.jpg",
    isNew: true,
    categoryId: "3", // Sides category
    options: [
      { label: "4 Strips", price: 499 },
      { label: "6 Strips", price: 699 },
    ],
  },
  {
    id: "1",
    name: "Lava Cake",
    description:
      "2 servings of divine milk chocolate cakes with a moist molten chocolate center, sprinkled with icing sugar",
    price: 750,
    image:
      "https://www.dominos.com.pk/images/58ef8ed0-9c0c-11ef-8548-d516d5226edf-Lava-Cake_variant_0-2024-11-06065711.jpg",
    isNew: true,
    categoryId: "4", // Sides category
    options: [{ label: "Double Serving", price: 750 }],
  },
  {
    id: "2",
    name: "Choco Bread",
    description:
      "2 servings of divine milk chocolate cakes with a moist molten chocolate center, sprinkled with icing sugar",
    price: 600,
    image:
      "https://www.dominos.com.pk/images/58ef67c0-9c0c-11ef-a0ab-8bb78e0710e7-Choco-Bread-copy_variant_0-2024-11-06065711.jpg",
    isNew: true,
    categoryId: "4", // Sides category
    options: [{ label: "Double Serving", price: 750 }],
  },

  {
    id: "1",
    name: "Pepsi",
    description: "PEPSI",
    price: 119,
    image:
      "https://www.dominos.com.pk/images/4c9a0e80-9c0c-11ef-bff6-bf27d5d23f5e-Pepsi_variant_0-2024-11-06065651.jpg",
    categoryId: "5", // Drinks category
    options: [
      { label: "Regular", price: 119 },
      { label: "Large", price: 169 },
    ],
  },
  {
    id: "2",
    name: "7UP",
    description: "7UP",
    price: 119,
    image:
      "https://www.dominos.com.pk/images/58ef67c0-9c0c-11ef-a781-9112538a4c9a-7up_variant_0-2024-11-06065711.jpg",
    categoryId: "5", // Drinks category
    options: [
      { label: "Regular", price: 119 },
      { label: "Large", price: 169 },
    ],
  },
  {
    id: "3",
    name: "Choco Bread Twist",
    description:
      "8 Pieces of freshly baked twisted soft bread served with chocolate sauce",
    price: 499,
    image:
      "https://www.dominos.com.pk/images/561fcd00-9c0c-11ef-9a76-1f6f1b37f3c8-Choco-Bread-Twist_variant_0-2024-11-06065707.jpg",
    isNew: true,
    categoryId: "4", // Desserts category
    options: [{ label: "Single Serving  ", price: 499 }],
  },
];
