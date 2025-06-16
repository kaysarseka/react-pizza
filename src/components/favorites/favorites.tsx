import { Drawer, Button } from "antd";
import { useFavorites } from "../../context/FavoritesContext";
import { useState } from "react";
import "./favorites.scss"; 

type PropsType = {
  openf: boolean;
  setOpenf: (val: boolean) => void;
};

export const Favorites = ({ openf, setOpenf }: PropsType) => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <Drawer
      title="Избранное"
      closable
      onClose={() => setOpenf(false)}
      open={openf}
      width={400}
    >
      {favorites.length === 0 ? (
        <p>Список избранного пуст</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((item) => {
            const isHovered = hoveredId === item.id;
            return (
              <div
                key={item.id}
                className={`favorites-item ${isHovered ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="favorites-img"
                />
                <div className="favorites-info">
                  <h4>{item.title}</h4>
                  <p>Цена: {item.price} сум</p>
                </div>
                <Button
                  danger
                  type="text"
                  className={`favorites-delete ${isHovered ? "visible" : ""}`}
                  onClick={() => removeFromFavorites(item.id)}
                >
                  Удалить
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </Drawer>
  );
};
