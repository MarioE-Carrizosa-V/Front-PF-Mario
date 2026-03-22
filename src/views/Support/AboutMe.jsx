import React from 'react';
import styles from './SupportPage.module.css';
import useDocumentTitle from "../../utils/useDocumentTitle";

const AboutMe = () => {
  useDocumentTitle("AnimeZone - Sobre Nosotros");
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Sobre Mí</h1>
                <p>
                    ¡Hola! Soy Mario Carrizosa, un apasionado desarrollador frontend enfocado en crear 
                    experiencias digitales fluidas, modernas y altamente funcionales.
                </p>
                <p>
                    AnimeZone es el resultado de mi dedicación por perfeccionar mis habilidades en el 
                    ecosistema de React. En este proyecto, he implementado desde la gestión compleja de 
                    estados con Redux hasta sistemas de persistencia personalizados y diseños 
                    completamente responsivos que se adaptan a cualquier dispositivo.
                </p>
                <p>
                    Mi objetivo con este proyecto es demostrar mi capacidad para transformar requerimientos 
                    de negocio en una interfaz de usuario premium, siempre priorizando el rendimiento y 
                    la experiencia del usuario final.
                </p>
                <p>
                    Si te gusta lo que ves, no dudes en contactarme a través de mis redes sociales o 
                    enviarme un correo directo. ¡Estoy siempre abierto a nuevos retos y colaboraciones!
                </p>
            </div>
        </div>
    );
};

export default AboutMe;
