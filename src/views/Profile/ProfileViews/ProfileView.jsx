import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./ProfileView.module.css";
import * as act from "../../../redux/actions";
import {
  FaCalendarAlt,
  FaGem,
  FaTimesCircle,
  FaChevronRight
} from "react-icons/fa";
import {
  formatDate,
  getSubscriptionEndDate,
  isSubscriptionValid,
  getPersistentSubscription
} from "../../../utils/subscriptionUtils";
import usuarioImg from "../../../assets/usuario.png";

const ProfileView = (props) => {
  const dispatch = useDispatch();
  const datosUser = JSON.parse(localStorage.getItem("user")) || {};
  const persistentData = getPersistentSubscription(datosUser.email || datosUser.id);
  const isPremium = isSubscriptionValid(datosUser);
  const subscriptionDate = datosUser.subscriptionDate || persistentData?.subscriptionDate;
  const endDate = getSubscriptionEndDate(subscriptionDate);

  const handleCancelSubscription = () => {
    dispatch(act.updateUserSubscription(false));
  };

  useEffect(() => {
    if (datosUser?.id) {
      dispatch(act.getUserStorage(datosUser.id));
    }
    dispatch(act.postLogin());

    return () => {
      dispatch(act.CleanDetail());
    };
  }, [dispatch, datosUser?.id]);

  return (
    <div className={style.container}>
      <div className={style.profileHeader}>
         <h1>Mi Cuenta Premium</h1>
      </div>
      
      <div className={style.profileCard}>
        <div className={style.cardMain}>
          <div className={style.avatarWrapper}>
            <img
              className={style.image}
              src={datosUser?.profileImage || usuarioImg}
              alt="Profile"
              referrerPolicy="no-referrer"
            />
            {isPremium && <FaGem className={style.premiumIconBadge} />}
          </div>

          <div className={style.subscriptionSection}>
            <div className={style.statusHeader}>
              <h3>Estado de Suscripción</h3>
              <span className={isPremium ? style.statusBadge : style.inactiveBadge}>
                {isPremium ? "ALFA PREMIUM" : "INACTIVA"}
              </span>
            </div>

            {isPremium ? (
              <div className={style.detailsGrid}>
                <div className={style.detailItem}>
                  <div className={style.detailIcon}><FaCalendarAlt /></div>
                  <div className={style.detailContent}>
                    <label>Fecha de Inicio</label>
                    <p>{formatDate(subscriptionDate)}</p>
                  </div>
                </div>
                
                <div className={style.detailItem}>
                  <div className={style.detailIcon}><FaTimesCircle /></div>
                  <div className={style.detailContent}>
                    <label>Vence el</label>
                    <p>{formatDate(endDate)}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.nonPremiumInfo}>
                <p>Únete a la legión premium para acceso total.</p>
                <a href="/cart" className={style.subscribeBtn}>
                  Ver Planes <FaChevronRight />
                </a>
              </div>
            )}

            {isPremium && (
              <div className={style.actionArea}>
                <button 
                  className={style.cancelButton} 
                  onClick={handleCancelSubscription}
                >
                  Cancelar Suscripción
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
