import { createContext, useContext, useState, type ReactNode } from "react";

type PizzaItem = {
  image: string | undefined;
  id: number;
  title: string;
  price: number;
};

type CartContextType = {
  cartItems: PizzaItem[];
  addToCart: (item: PizzaItem) => void;
  removeFromCart: (id: number) => void; 
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<PizzaItem[]>([]);

  const addToCart = (item: PizzaItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) return prev; 
      const newCart = [...prev];
      newCart.splice(index, 1); 
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
