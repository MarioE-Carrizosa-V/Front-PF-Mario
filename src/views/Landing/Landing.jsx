import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import logoImage from "../../assets/AnimeZoneLogo.png";

const Landing = () => {
  return (
    <div className={styles.container}>
      <img src={logoImage} alt="AnimeZone" className={styles.logo} />
      <Link to="/home">
        <button className={styles.button}>start</button>
      </Link>
      <p className={styles.subHeading}>
        Discover the excitement in AnimeZone. Get the best anime series and
        movies in our online store. Dive into unforgettable adventures and
        challenge your skills!
      </p>
    </div>
  );
};

export default Landing;
