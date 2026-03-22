import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";
import * as act from "../../redux/actions";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const gameOffer = useSelector((state) => state.gameOffer);
  const gamesNewReleases = useSelector((state) => state.gamesNewReleases);
  const gamesTopSellers = useSelector((state) => state.gamesTopSellers);
  const games = useSelector((state) => state.games);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      dispatch(act.getGames());
      
      await sleep(500);
      await dispatch(act.getGamesOffer());
      await sleep(500);
      await dispatch(act.getGamesNewReleases());
      await sleep(500);
      await dispatch(act.getGamesComingSoon());
      await sleep(500);
      await dispatch(act.getGamesTopSellers());

      dispatch(act.clearSearch());
    };

    fetchAllData();
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleButton = (e) => {
    if (name.trim() !== "") {
      dispatch(act.getByName(name));
      history.push(`/search?name=${encodeURIComponent(name)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleButton();
    }
  };

  const handleSeeMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    await dispatch(act.getMoreGames(20, nextPage));
    setPage(nextPage);
    setLoadingMore(false);
  };

  const selectedGames = games;

  return (
    <div className={style.homeContainer}>
      <Carousel />
      <div>
        <div className={style.searchcontainer}>
          <input
            className={style.search}
            placeholder="Buscar anime..."
            type="text"
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
          />
          <FontAwesomeIcon
            className={style.buttonsearch}
            onClick={name.trim() !== "" ? handleButton : undefined}
            icon={faSearchengin}
            size="xl"
          />
        </div>
      </div>

      <HomeCarousel items={gamesTopSellers} title="Recomendaciones" />
      <HomeCarousel items={gameOffer} title="Principales Películas de Anime" />
      <HomeCarousel items={gamesNewReleases} title="En Emisión" />

      <h3 className={style.title}>Todos los Animes</h3>
      <CardsContainer gameComingSoon={selectedGames} />
      
      <div className={style.seeMoreContainer}>
        <button 
          className={style.seeMoreButton} 
          onClick={handleSeeMore}
          disabled={loadingMore}
        >
          {loadingMore ? "Cargando..." : "Ver más"}
        </button>
      </div>
    </div>
  );
};

export default Home;
