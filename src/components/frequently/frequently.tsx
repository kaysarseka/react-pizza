import { Carousel, Col, Row } from "antd";
import { useEffect, useState } from "react";
import "./frequently.scss";

interface PizzasTypes {
  id: number;
  title: string;
  image: string;
  price: number;
  desc: string;
}

const API: string = import.meta.env.VITE_SOME_KEY;

const chunk = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export const Frequently = () => {
  const [pizza, setPizza] = useState<PizzasTypes[] | null>(null);
  const [chunkSize, setChunkSize] = useState<number>(5);

  // определить нужный размер чанка по ширине экрана
  const updateChunkSize = () => {
    const width = window.innerWidth;
    if (width > 1200) setChunkSize(5);
    else if (width > 980) setChunkSize(4);
    else if (width > 768) setChunkSize(3);
    else setChunkSize(2);
  };

  useEffect(() => {
    updateChunkSize();
    window.addEventListener("resize", updateChunkSize);
    return () => window.removeEventListener("resize", updateChunkSize);
  }, []);

  useEffect(() => {
    fetch(`${API}/data`)
      .then((res) => res.json())
      .then((data) => {
        const limitedData = data.slice(0, 10);
        setPizza(limitedData);
      })
      .catch((err) => console.log(err));
  }, []);

  const slides = pizza ? chunk(pizza, chunkSize) : [];

  return (
    <div className="frequently">
      <Carousel className="carousel" autoplay arrows infinite>
        {slides.map((group, index) => (
          <div key={index} className="caru">
            <div className="c_cards">
              <Row gutter={16} justify="center" className="c_row">
                {group.map((p: PizzasTypes) => (
                  <Col key={p.id} className="c_col">
                    <img src={p.image} alt={p.title} />
                    <div className="info">
                      <h3>{p.title}</h3>
                      <span>от {p.price}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
