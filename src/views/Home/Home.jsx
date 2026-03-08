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

  useEffect(() => {
    const fetchAllData = async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      await dispatch(act.getGames());
      await sleep(400);
      await dispatch(act.getGamesOffer());
      await sleep(400);
      await dispatch(act.getGamesNewReleases());
      await sleep(400);
      await dispatch(act.getGamesComingSoon());
      await sleep(400);
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

  const selectedGames = games;
  console.log(
    "DEBUG: Home current games state:",
    selectedGames?.length,
    selectedGames,
  );
  console.log("DEBUG: Home other sections:", {
    gameOffer,
    gamesNewReleases,
    gamesTopSellers,
  });

  return (
    <div className={style.homeContainer}>
      <Carousel />
      <div>
        <div className={style.searchcontainer}>
          <input
            className={style.search}
            placeholder="Search anime..."
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

      <HomeCarousel items={gamesTopSellers} title="Recommendations" />
      <HomeCarousel items={gameOffer} title="Top Anime Movies" />
      <HomeCarousel items={gamesNewReleases} title="Airing Now" />

      <h3 className={style.title}>All Animes</h3>
      <CardsContainer gameComingSoon={selectedGames} />
    </div>
  );
};

export default Home;
