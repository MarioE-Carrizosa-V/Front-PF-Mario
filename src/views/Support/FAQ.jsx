import React from 'react';
import styles from './SupportPage.module.css';
import useDocumentTitle from "../../utils/useDocumentTitle";

const FAQ = () => {
    useDocumentTitle("AnimeZone - Preguntas Frecuentes");
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Preguntas Frecuentes</h1>
                
                <section>
                    <h2>¿Cómo funciona la suscripción?</h2>
                    <p>
                        La suscripción en AnimeZone es una simulación para fines de demostración. Al suscribirte, 
                        obtienes el rango de "Alfa Premium" que te permite ver el catálogo completo y elimina 
                        las etiquetas de restricción.
                    </p>
                </section>

                <section>
                    <h2>¿Qué datos debo usar para el pago?</h2>
                    <p>
                        Para completar el flujo de compra, debes utilizar una **tarjeta ficticia de PayPal** 
                        proporcionada por su entorno de pruebas (Sandbox). No ingreses datos de tarjetas 
                        reales ni información bancaria personal, ya que este es un proyecto de portafolio.
                    </p>
                </section>

                <section>
                    <h2>¿Mi suscripción caduca?</h2>
                    <p>
                        Sí, las suscripciones simuladas tienen una validez de 30 días a partir de la "fecha de pago". 
                        El sistema calculará automáticamente la expiración y te lo notificará en tu perfil.
                    </p>
                </section>

                <section>
                    <h2>¿Qué tecnologías usa este proyecto?</h2>
                    <p>
                        Este proyecto está construido con React, Redux, CSS Modules y consume datos 
                        reales a través de la API de Jikan (MyAnimeList).
                    </p>
                </section>
            </div>
        </div>
    );
};

export default FAQ;
