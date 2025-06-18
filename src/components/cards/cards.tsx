import { useState } from "react";
import { Card } from "antd";
import "./cards.scss";
import { useCart } from "../../context/BasketContext";
import { useFavorites } from "../../context/FavoritesContext";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import React from "react";

const { Meta } = Card;

interface dataT {
  id: number;
  title: string;
  image: string;
  price: number;
  desc: string;
}

const pizzas: dataT[] = [
  {
    id: 1,
    title: "Навруз",
    image:
      "https://media.dodostatic.net/image/r:584x584/0195ae18b955759d8b22125578545e4c.avif",
    price: 79000,
    desc: "Мясная пицца с тушеной говядиной, колбасками, пицца-соусом, красным луком, моцареллой и маринованными огурчиками с поливкой из горчичного соуса",
  },
  {
    id: 2,
    title: "Баварская",
    image:
      "https://media.dodostatic.net/image/r:584x584/01945f8b83c47656afab822b4ef315e6.avif",
    price: 59000,
    desc: "Баварские колбаски, маринованные огурчики, красный лук, томаты, горчичный соус, моцарелла, фирменный томатный соус",
  },
  {
    id: 3,
    title: "Чилл Грилл",
    image:
      "https://media.dodostatic.net/image/r:584x584/01945f33348274af854e32e23fa3147a.avif",
    price: 69000,
    desc: "Цыпленок, соленые огурчики, красный лук, соус гриль, моцарелла, чеснок, фирменный соус альфредо",
  },
  {
    id: 4,
    title: "Пицца Барака",
    image:
      "https://media.dodostatic.net/image/r:584x584/019613d222d37299af8d334da03c0da8.avif",
    price: 95000,
    desc: "Томатный соус, тушеная говядина, моцарелла, красный лук, томаты и маринованные огурчики",
  },
  {
    id: 5,
    title: "Жюльен",
    image:
      "https://media.dodostatic.net/image/r:584x584/0195f593c11876cd886af0a034a96e57.avif",
    price: 69000,
    desc: "Нежный цыпленок, моцарелла, двойная порция шампиньонов, грибной соус, смесь сыров, чеснок, лук и сливочный соус альфредо",
  },
  {
    id: 6,
    title: "Маргарита",
    image:
      "https://media.dodostatic.net/image/r:584x584/11ee89722ed2d2f992155a94fa4d383a.avif",
    price: 49000,
    desc: "Томатный соус, увеличенная порция моцареллы, томаты, итальянские травы",
  },
  {
    id: 7,
    title: "Индейка и сыр",
    image:
      "https://media.dodostatic.net/image/r:584x584/11ee8977d2824254a943008321e7f2e9.avif",
    price: 49000,
    desc: "Ветчина из индейки, соус альфредо и нежный сыр моцарелла",
  },
  {
    id: 8,
    title: "Двойной Цыплёнок",
    image:
      "https://media.dodostatic.net/image/r:584x584/0193b01fbbe7704ba559683215e47c17.avif",
    price: 59000,
    desc: "Моцарелла из цельного молока, соус альфредо, вдвое больше цыплёнка — вдвое больше удовольствия",
  },
  {
    id: 9,
    title: "Песто",
    image:
      "https://media.dodostatic.net/image/r:584x584/0195f59128fb774a9a9b8c95ff6cfac6.avif",
    price: 69000,
    desc: "Соус песто, сливочный соус альфредо, двойная порция цыплёнка, кубики брынзы, томаты, моцарелла из натурального молока",
  },
  {
    id: 10,
    title: "Вау! Донар",
    image:
      "https://media.dodostatic.net/image/r:584x584/0195ff38f1a173dd98ba59b6123fdfcc.avif",
    price: 79000,
    desc: "Донарное мясо, моцарелла, пицца-соус, томаты, перец, лук под соусом гриль",
  },
  {
    id: 11,
    title: "Пицца из половинок",
    image:
      "https://media.dodostatic.net/image/r:584x584/11eee2044ca44bf799c868da91888281.avif",
    price: 98000,
    desc: "Соберите свою пиццу 35 см с двумя разными вкусами",
  },
  {
    id: 12,
    title: "Чиззи Чеддер",
    image:
      "https://media.dodostatic.net/image/r:584x584/11ee7d6264845c8fb0b7e3bcfca7b15e.avif",
    price: 49000,
    desc: "Ветчина из индейки, сыр чеддер и пармезан, сладкий перец, моцарелла, томатный соус",
  },
];

export const Cards = () => {
  const [data] = useState<dataT[]>(pizzas); // ← напрямую используем локальный массив
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="head">
      <h1>Пицца</h1>
      <div className="pizza">
        {data.map((piz) => (
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
