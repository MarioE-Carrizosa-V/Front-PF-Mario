import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import logoImage from "../../assets/AnimeZoneLogo.png";
import useDocumentTitle from "../../utils/useDocumentTitle";

const Landing = () => {
  useDocumentTitle("AnimeZone - Bienvenido");
  return (
    <div className={styles.container}>
      <img src={logoImage} alt="AnimeZone" className={styles.logo} />
      <Link to="/home">
        <button className={styles.button}>empezar</button>
      </Link>
      <p className={styles.subHeading}>
        Descubre la emoción en AnimeZone. Obtén las mejores series y películas
        de anime en nuestra tienda online. ¡Sumérgete en aventuras inolvidables
        y desafía tus habilidades!
      </p>
    </div>
  );
};

export default Landing;
