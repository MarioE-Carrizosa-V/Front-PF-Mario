import React from 'react';
import styles from './SupportPage.module.css';

const Privacy = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Política de Privacidad</h1>
                <p>Tu privacidad es importante para nosotros.</p>
                
                <section>
                    <h2>Recopilación de Datos</h2>
                    <p>
                        AnimeZone almacena información mínima necesaria para la sesión del usuario en el 
                        alamcenamiento local (localStorage) de tu navegador. No vendemos ni compartimos 
                        tus datos con terceros.
                    </p>
                </section>

                <section>
                    <h2>Seguridad</h2>
                    <p>
                        Aunque este es un proyecto de portafolio, implementamos mejores prácticas de 
                        seguridad para proteger la integridad de la aplicación y la experiencia del usuario.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
