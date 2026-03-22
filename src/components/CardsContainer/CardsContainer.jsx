import React from "react";
import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";

const CardsContainer = (props) => {
  const { gameComingSoon } = props;
  if (gameComingSoon === null) {
    return <p>Cargando...</p>;
  } else if (!Array.isArray(gameComingSoon)) {
    return <p>Datos inválidos</p>;
  } else {
    const uniqueGames = gameComingSoon;

    return (
      <div className={styles.container}>
        {uniqueGames.map((game, index) => (
          <Card
            key={`${game.id || index}`}
            id={game.id}
            image={game.image}
            name={game.name}
            price={game.price}
          />
        ))}
      </div>
    );
  }
};

export default CardsContainer;
