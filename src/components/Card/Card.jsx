import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as act from "../../redux/actions";
import style from "./Card.module.css";
import { useHistory } from "react-router-dom";
import favoriteIcon from "../../assets/favorite.svg";
import favoriteFullIcon from "../../assets/favoriteFull.svg";
import { isSubscriptionValid } from "../../utils/subscriptionUtils";

const Card = (props) => {
  let { id, price, name, image, appid } = props;

  price = parseFloat(isNaN(price) ? 0 : price) ?? 0;

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isShoppCartRoute = location.pathname === "/cart";
  const whishList = useSelector((state) => state.whishList) || [];
  const userRedux = useSelector((state) => state.user);
  const userLocal = JSON.parse(localStorage.getItem("user")) || {};
  const user = userRedux || userLocal;
  const isPremium = isSubscriptionValid(user);
  const isWhishlistArea = whishList.some((item) => item.id === (id || appid));
  const isWhishListRoute = location.pathname === "/whishlist";
  // const wholePart = Math.floor(price / 100);
  // const partDecimal = (price % 100).toString().padStart(2, '0');
  // const formattedNumber = parseFloat(`${wholePart}.${partDecimal}`);

  const handleAdd = () => {
    dispatch(act.clearCart());
    dispatch(act.addCart({ id, price: price, name, image }));
    history.push("/cart");
  };

  const handleAddWhish = () => {
    dispatch(act.addWhishList({ id, price: price, name, image }));
  };

  const handleRemove = () => {
    dispatch(act.removeCart(id || appid));
  };

  const handelRemoveWhishList = () => {
    dispatch(act.removeWhishList(id || appid));
  };

  const handleClick = (appid, id) => {
    history.push(`/detail/${appid || id}`);
  };

  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const titleElement = titleRef.current;
      const maxTitleLength = 35;
      const title = titleElement.innerText;
      if (title.length > maxTitleLength) {
        titleElement.innerText = title.slice(0, maxTitleLength) + "...";
      }
    }
  }, []);

  //console.log(appid);

  return (
    <li className={style.box} key={id || appid}>
      <div
        className={style.imagecontainer}
        onClick={() => {
          handleClick(id || appid);
        }}
      >
        {!isPremium && <div className={style.premiumBadge}>Premium</div>}
        <img className={style.image} src={image} alt={name}></img>
        <h1 ref={titleRef} className={style.name}>
          {name}
        </h1>
      </div>
      {!isShoppCartRoute && !isWhishListRoute && (
        <div className={style.buttoncontainer}>
          <img
            src={isWhishlistArea ? favoriteFullIcon : favoriteIcon}
            alt={isWhishlistArea ? "Eliminar de Favoritos" : "Añadir a Favoritos"}
            className={style.favoriteIcon}
            onClick={(e) => {
              e.stopPropagation(); // Prevent clicking the card
              if (isWhishlistArea) {
                handelRemoveWhishList();
              } else {
                handleAddWhish();
              }
            }}
            title={
              isWhishlistArea ? "Eliminar de Favoritos" : "Añadir a Favoritos"
            }
          />
          <button
            className={style.buttonadd}
            onClick={(e) => {
              e.stopPropagation();
              isPremium ? handleClick(id || appid) : handleAdd();
            }}
          >
            {isPremium ? "¡A disfrutar!" : "Suscribirse para Ver"}
          </button>
        </div>
      )}
      {isWhishListRoute && (
        <div className={style.buttoncontainer}>
          <button
            className={style.buttonadd}
            onClick={(e) => {
              e.stopPropagation();
              isPremium ? handleClick(id || appid) : handleAdd();
            }}
          >
            {isPremium ? "¡A disfrutar!" : "Suscribirse para Ver"}
          </button>
          <button
            className={style.botonBorrar}
            onClick={() => {
              handelRemoveWhishList();
            }}
          >
            Eliminar
          </button>
        </div>
      )}
      {isShoppCartRoute && (
        <div className={style.buttoncontainer}>
          <button
            className={style.botonBorrar}
            onClick={() => {
              handleRemove();
            }}
          >
            Eliminar
          </button>
        </div>
      )}
    </li>
  );
};

export default Card;
