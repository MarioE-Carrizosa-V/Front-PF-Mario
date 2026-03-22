import React, { useEffect, useState,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Carousel.module.css";
import * as act from "../../redux/actions";
import arrow from "../../assets/arrow.png";
import punto from "../../assets/punto.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Carousel = () => {
  const dispatch = useDispatch();
  const gameComingSoon = useSelector((state) => state.gameComingSoon);

  console.log(
    "DEBUG: Carousel gameComingSoon state:",
    gameComingSoon?.length,
    gameComingSoon,
  );

  useEffect(() => {
    dispatch(act.getGamesComingSoon());
  }, [dispatch]);

  const [currentCard, setCurrentCard] = useState(1);
  const [charactersPerPage, setCharacterPerPage] = useState(1);
  console.log(setCharacterPerPage);

  const totalCards =
    gameComingSoon && Math.ceil(gameComingSoon.length / charactersPerPage);


const handleNextCard = useCallback(() => {
  setCurrentCard((prev) => {
    if (prev < totalCards) {
      return prev + 1;
    } else {
      return 1;
    }
  });
}, [totalCards]);

const handlePrevCard = useCallback(() => {
  setCurrentCard((prev) => {
    if (prev > 1) {
      return prev - 1;
    } else {
      return totalCards;
    }
  });
}, [totalCards]);

  const handleGoToCard = (cardNumber) => {
    setCurrentCard(cardNumber);
  };

  useEffect(() => {
    if (gameComingSoon && gameComingSoon.length > 0) {
      const interval = setInterval(() => {
        handleNextCard();
      }, 4000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentCard, gameComingSoon, handleNextCard]);

  const indexOfLastCharacter = currentCard * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = gameComingSoon
    ? gameComingSoon.slice(indexOfFirstCharacter, indexOfLastCharacter)
    : [];

  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/detail/${id}`);
  };

  return (
    <div className={style.container}>
      <h2 className={style.principaltitle}>Próximos Animes</h2>
      <div className={style.containerimage}>
        {currentCharacters.map((character, index) => (
          <div
            key={index}
            className={style.tarjeta}
            onClick={() => {
              handleClick(character.id);
            }}
          >
            <h3 className={style.name}>{character.name}</h3>
            <img
              className={style.image}
              src={character.image}
              alt={character.name}
            />
          </div>
        ))}
      </div>
      <div className={style.paginado}>
        <img
          alt="arrowprev"
          className={style.arrowprev}
          src={arrow}
          onClick={handlePrevCard}
          disabled={currentCard === 1}
        />
        {[...Array(totalCards)].map((_, index) => (
          <img
            alt="punto"
            src={punto}
            className={`${style.punto} ${currentCard === index + 1 ? style.selected : ""}`}
            key={index}
            onClick={() => handleGoToCard(index + 1)}
            disabled={currentCard === index + 1}
          />
        ))}
        <img
          alt="arrownext"
          className={style.arrownext}
          src={arrow}
          onClick={handleNextCard}
          disabled={currentCard === totalCards}
        />
      </div>
    </div>
  );
};

export default Carousel;
