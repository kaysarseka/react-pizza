import { Drawer, Button } from "antd";
import { useCart } from "../../context/BasketContext";
import { useState } from "react";
import "./basket.scss"; 

type PropsType = {
  openb: boolean;
  setOpenb: (val: boolean) => void;
};

export const Basket = ({ openb, setOpenb }: PropsType) => {
  const { cartItems, removeFromCart } = useCart();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const grouped = cartItems.reduce((acc: any[], item) => {
    const found = acc.find((el) => el.id === item.id);
    if (found) {
      found.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, []);

  return (
    <Drawer
      title="Корзина"
      closable
      onClose={() => setOpenb(false)}
      open={openb}
      width={400}
    >
      {grouped.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div className="basket-list">
          {grouped.map((item) => {
            const isHovered = hoveredId === item.id;
            return (
              <div
                key={item.id}
                className={`basket-item ${isHovered ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img src={item.image} alt={item.title} className="basket-img" />
                <div className="basket-info">
                  <h4>{item.title}</h4>
                  <p>Цена: {item.price*item.count} сум</p>
                </div>
                <span className="basket-count">{item.count}x</span>
                <Button
                  danger
                  type="text"
                  className={`basket-delete ${isHovered ? "visible" : ""}`}
                  onClick={() => removeFromCart(item.id)}
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
