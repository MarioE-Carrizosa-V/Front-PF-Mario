import React from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as act from "../../redux/actions";
import { isSubscriptionValid } from "../../utils/subscriptionUtils";
import styles from "./ShoppingCart.module.css";
import { PayPalButtons } from "@paypal/react-paypal-js";
import useDocumentTitle from "../../utils/useDocumentTitle";

//* las cards que vengan del home...
//! revisar la convergencia
const ShoppingCart = () => {
  useDocumentTitle("AnimeZone - Premium");
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const usuario = useSelector((state) => state.user);
  const user = React.useMemo(() => {
    return usuario || JSON.parse(localStorage.getItem("user")) || {};
  }, [usuario]);
  const isPremium = isSubscriptionValid(user);

  const [checkoutData, setCheckoutData] = React.useState({
    name: user.name || "",
    email: user.email || "",
  });

  React.useEffect(() => {
    if (user.name || user.email) {
      setCheckoutData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData({ ...checkoutData, [name]: value });
  };

  const isCheckoutValid = checkoutData.name && checkoutData.email;


  if (isPremium) {
    return (
      <div className={styles.container}>
        <div className={styles.premiumFocusActive}>
          <h2>✨ Ya eres Miembro ALFA PREMIUM</h2>
          <p>Tu suscripción está activa y tienes acceso total al catálogo.</p>
          <button className={styles.backButton} onClick={() => history.push("/home")}>
            Ir al Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <br />
      <h2 className={styles.titleCarrito}>Finalizar Suscripción</h2>
      <br />
      <div className={styles.container}>
        <div className={styles.subscriptionFocus}>
          {cart.length > 0 && (
            <div className={styles.triggerAlert}>
              <p>
                Te estás suscribiendo para disfrutar de <strong>{cart[0].name}</strong> y todo el catálogo premium de AnimeZone.
              </p>
            </div>
          )}
        </div>

        <div className={styles.cajitaResumen}>
          <div className={styles.checkoutForm}>
            <h3 className={styles.checkoutTitle}>Datos de Finalización</h3>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nombre Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ej. Juan Pérez"
                value={checkoutData.name}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@correo.com"
                value={checkoutData.email}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            {!isCheckoutValid && cart.length > 0 && (
              <p className={styles.validationMessage}>
                Por favor, completa tus datos para habilitar el pago.
              </p>
            )}
          </div>

          <div className={styles.premiumBox}>
            <h3 className={styles.premiumTitle}>ALFA PREMIUM</h3>
            <p className={styles.premiumPrice}>$9.99 / MES</p>
            <ul className={styles.benefits}>
              <li>✨ Sin Anuncios</li>
              <li>✨ Acceso Total a la Biblioteca</li>
              <li>✨ Streaming en Alta Definición</li>
              <li>✨ Visualización sin Conexión</li>
            </ul>
            <div className={styles.paymentButton}>
              <PayPalButtons
                disabled={!isCheckoutValid}
                style={{
                  layout: "vertical",
                  shape: "rect",
                  label: "subscribe",
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: "9.99",
                        },
                        description: `Suscripción Mensual AnimeZone Premium - ${checkoutData.name}`,
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    const name = details.payer.name.given_name;
                    Swal.fire({
                      title: `¡Bienvenido, ${name}!`,
                      text: "Ya eres miembro de ALFA PREMIUM. ¡Disfruta del mejor anime!",
                      icon: "success",
                      confirmButtonColor: "#69526d",
                    });
                    dispatch(act.updateUserSubscription(true));
                    if (cart.length > 0) dispatch(act.clearCart());
                  });
                }}
                onError={(err) => {
                  console.error("Error de PayPal:", err);
                  Swal.fire(
                    "Error",
                    "No se pudo completar la transacción.",
                    "error",
                  );
                }}
              />
            </div>
          </div>

          {/* Removed item-based total price box */}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
