import React, { createContext, useState, useContext } from "react";

type CartItem = {
  product: any;
  size: string;
  crust: string;
  toppings: string[];
  quantity: number;
  instructions: string;
  totalPrice: number;
};

type Store = {
  id: string;
  title: string;
  // Add other store properties as needed
};

type AppContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  orderType: "delivery" | "pickup" | null;
  setOrderType: (type: "delivery" | "pickup" | null) => void;
  selectedStore: Store | null;
  setSelectedStore: (store: Store | null) => void;
  deliveryAddress: string | null;
  setDeliveryAddress: (address: string | null) => void;
  areaName: string | null;
  setAreaName: (name: string | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<"delivery" | "pickup" | null>(
    null
  );
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null);
  const [areaName, setAreaName] = useState<string | null>(null);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        orderType,
        setOrderType,
        selectedStore,
        setSelectedStore,
        deliveryAddress,
        setDeliveryAddress,
        areaName,
        setAreaName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
