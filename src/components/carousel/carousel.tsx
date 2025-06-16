import { Carousel, Row, Col } from "antd";
import { useState } from "react";
import a1 from "../../assets/a1.webp";
import a2 from "../../assets/a2.webp";
import a3 from "../../assets/a3.webp";
import a4 from "../../assets/a4.webp";
import a5 from "../../assets/a5.webp";
import { Story } from "../story/story";
import "./carousel.scss";

const images = [a1, a2, a3, a4, a5];

const chunk = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export const CarouselComp = () => {
  const [showStory, setShowStory] = useState(false);

  const slides = chunk(images, 5);

  return (
    <div className="carousel-wrapper">
      <Carousel className="carousel" autoplay>
        {slides.map((group, index) => (
          <div key={index} className="carousels">
            <Row gutter={16} justify="center" className="c_row">
              {group.map((imgSrc, idx) => (
                <Col key={idx} className="c_col">
                  <img
                    src={imgSrc}
                    alt={`img-${idx}`}
                    onClick={() => {
                      if (imgSrc === a1) setShowStory(true);
                    }}
                  />
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Carousel>

      {showStory && <Story onClose={() => setShowStory(false)} />}
    </div>
  );
};
