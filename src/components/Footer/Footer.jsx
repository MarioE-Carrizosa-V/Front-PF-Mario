import React from "react";
import styles from "./Footer.module.css";
import { 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaInstagram, 
  FaFacebook,
  FaHeart
} from "react-icons/fa";
import logoImage from "../../assets/AnimeZoneLogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandSection}>
          <img src={logoImage} alt="AnimeZone" className={styles.logo} />
          <p className={styles.description}>
            La plataforma definitiva para los amantes del anime. 
            Contenido premium, sin límites y en máxima calidad.
          </p>
          <div className={styles.socialIcons}>
            <a href="https://www.linkedin.com/in/mariocarrizosa21/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://github.com/MarioE-Carrizosa-V" target="_blank" rel="noreferrer"><FaGithub /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
          </div>
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.column}>
            <h4>Navegación</h4>
            <ul>
              <li><a href="/home">Inicio</a></li>
              <li><a href="/library">Biblioteca</a></li>
              <li><a href="/cart">Suscripción</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Soporte</h4>
            <ul>
              <li><a href="/aboutme">Sobre Mí</a></li>
              <li><a href="mailto:mytcarrizosaland@gmail.com">Contacto</a></li>
              <li><a href="/faq">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Legal</h4>
            <ul>
              <li><a href="/terminos">Términos</a></li>
              <li><a href="/privacidad">Privacidad</a></li>
              <li><a href="/cookies">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.divider}></div>
        <div className={styles.bottomContent}>
          <p>© {currentYear} AnimeZone. Todos los derechos reservados.</p>
          <p className={styles.credit}>
            Desarrollado con <FaHeart className={styles.heart} /> por Mario Carrizosa
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
