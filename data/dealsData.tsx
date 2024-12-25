import { DealProduct } from "../types";
export type DealCategory = {
  id: string;
  title: string;
  products: DealProduct[];
};

export const dealsData: DealCategory[] = [
  {
    id: "wacky-wednesday",
    title: "WACKY WEDNESDAY",
    products: [
      {
        id: "wacky-medium",
        name: "Wacky Medium",
        description: "50% off on Medium Pizzas",
        image:
          "https://www.dominos.com.pk/images/6c6f63c0-aafa-11ef-997d-a1219bd4c3fc-EVD-Medium-2024-11-25065640.jpg",
        price: 999,
        originalPrice: 1999,
        discount: 50,
        isHot: true,
      },
      {
        id: "wacky-large",
        name: "Wacky Large",
        description: "50% off on Large Pizzas",
        image:
          "https://www.dominos.com.pk/images/6c702710-aafa-11ef-9fa8-55a04cb9fca9-EVD-Double-Large-2024-11-25065640.jpg",
        price: 3200,
        originalPrice: 2399,
        discount: 50,
        isHot: true,
      },
    ],
  },
  {
    id: "premium-crusts",
    title: "PREMIUM CRUSTS",
    products: [
      {
        id: "double-melt-large",
        name: "Double Melt Deal Large",
        description: "1 Large Double Melt Pizza",
        image:
          "https://www.dominos.com.pk/images/6c6fd8f0-aafa-11ef-976c-a5926090af2a-EVD-Large-2024-11-25065640.jpg",
        price: 1499,
        isNew: true,
      },
      {
        id: "cheese-burst-large",
        name: "Cheese Burst Large",
        description: "1 Large Cheese Burst Pizza",
        image: "https://www.dominos.com.pk/deals#EverydayTripleValueLarge_223",
        price: 1599,
        isNew: true,
      },
    ],
  },
  {
    id: "everyday-value-medium",
    title: "EVERYDAY VALUE MEDIUM",
    products: [
      {
        id: "medium-value-1",
        name: "Medium Value Deal 1",
        description: "1 Medium Pizza at special price",
        image:
          "https://www.dominos.com.pk/images/6c6f63c0-aafa-11ef-997d-a1219bd4c3fc-EVD-Medium-2024-11-25065640.jpg  ",
        price: 599,
        originalPrice: 899,
        discount: 33,
      },
    ],
  },
  {
    id: "everyday-value-large",
    title: "EVERYDAY VALUE LARGE",
    products: [
      {
        id: "large-value-1",
        name: "Large Value Deal 1",
        description: "1 Large Pizza at special price",
        image:
          "https://www.dominos.com.pk/images/6c702710-aafa-11ef-9fa8-55a04cb9fca9-EVD-Medium-Drinks-2024-11-25065640.jpg",
        price: 799,
        originalPrice: 1199,
        discount: 33,
      },
    ],
  },
  {
    id: "mybox-pizza",
    title: "MYBOX PIZZA",
    products: [
      {
        id: "mybox-1",
        name: "MyBox Special",
        description: "Personal pizza with sides",
        image:
          "https://www.dominos.com.pk/images/2a46cd30-9830-11ef-991b-1132c17c7045-mybox-1-side-icon-2024-11-01090330.webp",
        price: 399,
        isNew: true,
      },
    ],
  },
];
