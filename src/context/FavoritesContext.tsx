import { createContext, useContext, useState, type ReactNode } from "react";

type FavoriteItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  desc: string;
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: number) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prev) =>
      prev.find((i) => i.id === item.id) ? prev : [...prev, item]
    );
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
