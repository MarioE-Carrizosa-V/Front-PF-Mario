import React from "react";
import styles from "./WhishList.module.css";
import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";

const WhishList = () => {
  const list = useSelector((state) => state.whishList);

  return (
    <div>
      <br />
      <h2 className={styles.titleCarrito}>Mi Biblioteca</h2>
      <br />
      {list.length === 0 ? (
        <div className={styles.container}>
          <div className={styles.juegosContainer}>
            <div className={styles.cajitaItems}>
              <div className={styles.emptyCart}>
                <p> Aún no has añadido ningún anime a la lista... </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.juegosContainer}>
            <div className={styles.cajitaItems}>
              {list.map((game) => {
                return (
                  <li className={styles.li} key={game.id}>
                    <Card
                      id={game.id}
                      name={game.name}
                      image={game.image}
                      price={game.price}
                    />
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhishList;
