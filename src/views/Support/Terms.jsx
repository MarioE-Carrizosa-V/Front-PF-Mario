import React from 'react';
import styles from './SupportPage.module.css';
import useDocumentTitle from "../../utils/useDocumentTitle";

const Terms = () => {
    useDocumentTitle("AnimeZone - Términos");
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Términos y Condiciones</h1>
                <p>Última actualización: Marzo 2026</p>
                
                <section>
                    <h2>1. Uso de la Plataforma</h2>
                    <p>
                        Bienvenido a AnimeZone. Al acceder a nuestro sitio, aceptas cumplir con estos términos. 
                        Esta plataforma ha sido desarrollada con fines educativos y de portafolio profesional.
                    </p>
                </section>

                <section>
                    <h2>2. Contenido</h2>
                    <p>
                        Todo el contenido informativo sobre animes es proporcionado por la API de Jikan/MyAnimeList. 
                        AnimeZone no reclama propiedad sobre las imágenes o metadatos de los mismos.
                    </p>
                </section>

                <section>
                    <h2>3. Suscripciones Simuladas</h2>
                    <p>
                        Todas las suscripciones y pagos dentro de esta plataforma son simulaciones para fines 
                        de demostración de funcionalidad. No se realizan cargos reales ni se solicita 
                        información bancaria sensible.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
