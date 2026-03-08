import React from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import * as act from "../../redux/actions";
import Card from "../../components/Card/Card";
import styles from "./ShoppingCart.module.css";
import { PayPalButtons } from "@paypal/react-paypal-js";

//* las cards que vengan del home...
//! revisar la convergencia
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector((state) => state.total);
  //console.log(cart);
  // const wholePart = Math.floor(totalPrice / 100);
  // const partDecimal = (totalPrice % 100).toString().padStart(2, '0');
  // const formattedTotalPrice = parseFloat(`${wholePart}.${partDecimal}`);
  const dataUser = JSON.parse(localStorage.getItem("user"));
  //console.log(dataUser);

  const handleRemove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your cart has been deleted.", "success");
        dispatch(act.clearCart());
      }
    });
  };

  // const handleBuy = async () => {
  //   try {
  //     //! mandar tanto juegos como el precio total
  //     dispatch(act.createOrder(totalPrice, cart, dataUser));
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  return (
    <div>
      <br />
      <h2 className={styles.titleCarrito}>My Watchlist & Subscription</h2>
      <br />
      <div className={styles.container}>
        <div className={styles.juegosContainer}>
          <div className={styles.cajitaItems}>
            {cart.length === 0 ? (
              <div className={styles.emptyCart}>
                <p> Your watchlist is currently empty...</p>
              </div>
            ) : (
              cart.map((game) => (
                <li className={styles.li} key={game.id}>
                  <Card
                    id={game.id}
                    name={game.name}
                    image={game.image}
                    price={game.price}
                  />
                </li>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <button className={styles.botonBorrar} onClick={handleRemove}>
              Clear Watchlist
            </button>
          )}
        </div>

        <div className={styles.cajitaResumen}>
          <div className={styles.premiumBox}>
            <h3 className={styles.premiumTitle}>ALFA PREMIUM</h3>
            <p className={styles.premiumPrice}>$9.99 / MONTH</p>
            <ul className={styles.benefits}>
              <li>✨ No Ads</li>
              <li>✨ Full Library Access</li>
              <li>✨ High Definition Stream</li>
              <li>✨ Offline Viewing</li>
            </ul>
            <div className={styles.paymentButton}>
              <PayPalButtons
                style={{
                  layout: "vertical",
                  shape: "rect",
                  label: "subscribe",
                }}
                createOrder={(data, actions) => {
                  /* 
                    NOTE: To use real subscriptions, you MUST create a Plan in your PayPal Dashboard 
                    and use its ID here. For this demo, we'll use a transaction that simulates it.
                  */
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: "9.99",
                        },
                        description: "AnimeZone Premium Monthly Subscription",
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    const name = details.payer.name.given_name;
                    Swal.fire({
                      title: `Welcome, ${name}!`,
                      text: "You are now an ALFA PREMIUM member. Enjoy the best anime!",
                      icon: "success",
                      confirmButtonColor: "#69526d",
                    });
                    dispatch(act.updateUserSubscription(true));
                    if (cart.length > 0) dispatch(act.clearCart());
                  });
                }}
                onError={(err) => {
                  console.error("PayPal Error:", err);
                  Swal.fire(
                    "Error",
                    "Transaction could not be completed.",
                    "error",
                  );
                }}
              />
            </div>
          </div>

          {totalPrice > 0 && (
            <div className={styles.totalBox}>
              <h4>Total Purchase: ${totalPrice.toFixed(2)}</h4>
              <PayPalButtons
                style={{ layout: "horizontal", height: 45 }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalPrice.toString(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(() => {
                    Swal.fire("Success!", "Purchase completed!", "success");
                    dispatch(act.clearCart());
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
