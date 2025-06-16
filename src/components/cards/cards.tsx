import { useState, useEffect } from "react";
import { Card } from "antd";
import "./cards.scss";
import { useCart } from "../../context/BasketContext";
import { useFavorites } from "../../context/FavoritesContext";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const { Meta } = Card;

interface dataT {
  id: number;
  title: string;
  image: string;
  price: number;
  desc: string;
}

const API: string = import.meta.env.VITE_SOME_KEY;

export const Cards = () => {
  const [data, setData] = useState<dataT[] | null>(null);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetch(`${API}/data`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="head">
      <h1>Пицца</h1>
      <div className="pizza">
        {data?.map((piz) => (
          <Card
            className="piz"
            key={piz.id}
            hoverable
            cover={<img alt={piz.title} src={piz.image} />}
          >
            <Meta
              style={{ paddingBottom: "10px" }}
              title={piz.title}
              description={piz.desc}
            />
            <span>{piz.price} сум</span>

            <div className="add">
              <button
                onClick={() =>
                  addToCart({
                    id: piz.id,
                    title: piz.title,
                    price: piz.price,
                    image: piz.image,
                  })
                }
              >
                Add
              </button>
            </div>

            <div
              onClick={() => toggleFavorite(piz)}
              className={`favorite-icon ${
                isFavorite(piz.id) ? "active" : "inactive"
              }`}
            >
              {isFavorite(piz.id) ? <HeartFilled /> : <HeartOutlined />}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
