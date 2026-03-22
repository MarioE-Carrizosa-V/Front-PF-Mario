import React, { useState, useEffect, useMemo } from "react";
import style from "./NavBar.module.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import usuarioImg from "../../assets/usuario.png";
import {
  logoutUser,
  getDataGoogle,
  logoutGoogle,
  getAnimeSearch,
} from "../../redux/actions";
import { 
  FaHome, 
  FaHeart, 
  FaShoppingBag, 
  FaSearch, 
} from "react-icons/fa";
import Swal from "sweetalert2";

const NavBar = () => {
  const cart = useSelector((state) => state.cart);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [carItem, setCarItem] = useState(0);

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isFixed = window.pageYOffset > 0;
      setIsNavbarFixed(isFixed);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();

  const usuario = useSelector((state) => state.user);

  const datosUser = useMemo(() => {
    return usuario || JSON.parse(localStorage.getItem("user"));
  }, [usuario]);

  const conteo = datosUser && (datosUser.email || datosUser.id) ? 1 : 0;

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("user", JSON.stringify(usuario));
    }
  }, [usuario]);

  const removerDatos = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Sesión cerrada",
    });

    await localStorage.removeItem("user");
    //await Cookies.remove("token")
    await dispatch(logoutUser());
    await dispatch(logoutGoogle());

    history.push("/home");
  };

  useEffect(() => {
    if (!datosUser) {
      dispatch(getDataGoogle());
    }
  }, [dispatch, datosUser]);

  useEffect(() => {
    setCarItem(cart.length);
  }, [cart]);

  return (
    <div
      className={`${style["custom-navbar"]} ${isNavbarFixed ? style.fixedNavbar : ""}`}
    >
      <div className={style.logoAndSearch}>
        <Link to="/home">
            <FaHome className={style.cart_icon} />
        </Link>
        <div className={style.searchContainer}>
          <input
            type="text"
            placeholder="Buscar anime..."
            className={style.searchInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(getAnimeSearch({ q: e.target.value }));
                history.push("/search");
              }
            }}
          />
          <FaSearch className={style.searchIcon} />
        </div>
      </div>
      <ul className={style.NaV}>
        <li className={style["submenu-item"]}>
          <Link to="/library" className={style["submenu-link"]} title="Biblioteca (Favoritos)">
            <FaHeart className={style.cart_icon} />
          </Link>
        </li>
        <li className={style["submenu__item"]}>
          <Link to="/cart" className={style["submenu_link"]} title="Carrito">
            {carItem > 0 && (
              <div className={style["cart_count"]}>{carItem}</div>
            )}
            <FaShoppingBag className={style.cart_icon} />
          </Link>
        </li>

        {conteo > 0 ? (
          <li>
            <div className={style.usuarioContainer}>
              <img
                src={datosUser?.profileImage || usuarioImg}
                className={style.usuario}
                alt={datosUser?.name || "Usuario"}
                title={datosUser?.name || "Usuario"}
                onClick={handleSubMenuToggle}
                referrerPolicy="no-referrer"
              />
              {isSubMenuOpen && (
                <ul className={style.submenu}>
                  <li className={style["submenu_item"]}>
                    <Link to="/user">Suscripción</Link>
                  </li>
                  <li className={style["submenu_item"]}>
                    <div onClick={removerDatos}>Cerrar Sesión</div>
                  </li>
                </ul>
              )}
            </div>
          </li>
        ) : (
          <li className={style.NaV_item}>
            <Link to="/login" className={style.login_link}>
              <button className={style.login_button}>Iniciar Sesión</button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
