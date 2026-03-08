import React, { useRef } from "react";
import Card from "../Card/Card";
import style from "./HomeCarousel.module.css";
import arrow from "../../assets/arrow.png";

const HomeCarousel = ({ items, title }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -800, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 800, behavior: "smooth" });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={style.section}>
      <h3 className={style.title}>{title}</h3>
      <div className={style.carouselContainer}>
        <button
          className={`${style.navButton} ${style.left}`}
          onClick={() => scroll("left")}
        >
          <img src={arrow} alt="prev" className={style.arrowIcon} />
        </button>
        <div className={style.scrollContainer} ref={scrollRef}>
          {items.map((item, index) => (
            <div key={item.id || index} className={style.cardWrapper}>
              <Card
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
        <button
          className={`${style.navButton} ${style.right}`}
          onClick={() => scroll("right")}
        >
          <img src={arrow} alt="next" className={style.arrowIcon} />
        </button>
      </div>
    </div>
  );
};

export default HomeCarousel;
