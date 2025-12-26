import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Fish } from '@/data/fishData';

interface CartItem {
  fish: Fish;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (fish: Fish, quantity?: number) => void;
  removeFromCart: (fishId: string) => void;
  updateQuantity: (fishId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (fish: Fish, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.fish.id === fish.id);
      if (existing) {
        return prev.map((item) =>
          item.fish.id === fish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { fish, quantity }];
    });
  };

  const removeFromCart = (fishId: string) => {
    setItems((prev) => prev.filter((item) => item.fish.id !== fishId));
  };

  const updateQuantity = (fishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(fishId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.fish.id === fishId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.fish.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
