import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, gameDetail } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import style from "./Detail.module.css";
// import { isSubscriptionValid } from "../../utils/subscriptionUtils";
import { PacmanLoader } from "react-spinners";
import * as act from "../../redux/actions";
import {
  FaStar,
  FaPlay,
  FaPlus,
  FaCalendarAlt,
  FaTv,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

const Detail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.gameDetail);
  // const user = useSelector((state) => state.user) || JSON.parse(localStorage.getItem("user"));
  // const isPremium = isSubscriptionValid(user);
  const isLoading = game === undefined || game === null;
  const id = props.match.params.id;

  useEffect(() => {
    if (id) {
      dispatch(gameDetail(id));
    }
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const handleAdd = () => {
    dispatch(act.clearCart());
    dispatch(
      act.addCart({
        id: game.id,
        image: game.image,
        name: game.name,
        price: 9.99, // Premium price
      }),
    );
    history.push("/cart");
  };

  const handleAddWhish = () => {
    dispatch(
      act.addWhishList({
        id: game.id,
        name: game.name,
        image: game.image,
      }),
    );
  };

  const Rating = ({ rating }) => {
    const stars = [];
    const score = Math.round((rating || 0) / 2);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          color={
            i < score ? "var(--color-purple-light)" : "rgba(255,255,255,0.2)"
          }
        />,
      );
    }
    return <div className={style.stars}>{stars}</div>;
  };

  if (isLoading) {
    return (
      <div className={style.loading}>
        <PacmanLoader color="var(--color-purple-light)" size={60} />
      </div>
    );
  }

  return (
    <div className={style.detailWrapper}>
      {/* Hero Background */}
      <div
        className={style.heroBg}
        style={{ backgroundImage: `url(${game.image})` }}
      >
        <div className={style.heroOverlay}></div>
      </div>

      <div className={style.contentContainer}>
        {/* Main Header Info Area */}
        <section className={style.mainHero}>
          <div className={style.posterArea}>
            <img
              src={game.image}
              alt={game.name}
              className={style.mainPoster}
            />
            <div className={style.mobileActions}>
              <button onClick={handleAdd} className={style.primaryBtn}>
                <FaPlay /> Suscribirse para Ver
              </button>
              <button onClick={handleAddWhish} className={style.secondaryBtn}>
                <FaPlus /> Añadir a Favoritos
              </button>
            </div>
          </div>

          <div className={style.infoGlass}>
            <div className={style.headerLabels}>
              <span className={style.statusLabel}>
                <FaCheckCircle /> {game.status === "Finished" ? "Finalizado" : game.status || "Finalizado"}
              </span>
              <span className={style.typeLabel}>
                <FaTv /> {game.type === "TV" ? "Serie TV" : game.type || "Serie TV"}
              </span>
            </div>

            <h1 className={style.title}>{game.name}</h1>

            <div className={style.ratingRow}>
              <Rating rating={game.rating} />
              <span className={style.scoreText}>
                {game.rating || "N/A"} Puntos
              </span>
              <span className={style.episodesCount}>
                {game.episodes || "?"} Episodios
              </span>
            </div>

            <p className={style.synopsis}>{game.detailed_description}</p>

            <div className={style.desktopActions}>
              <button onClick={handleAdd} className={style.primaryBtn}>
                <FaPlay /> Suscribirse para Ver
              </button>
              <button onClick={handleAddWhish} className={style.secondaryBtn}>
                <FaPlus /> Añadir a Favoritos
              </button>
            </div>
          </div>
        </section>

        {/* Details & Trailer Section */}
        <div className={style.secondaryContent}>
          <section className={style.metadataSection}>
            <h2 className={style.sectionTitle}>
              <FaInfoCircle /> Información Detallada
            </h2>
            <div className={style.metaGrid}>
              <div className={style.metaItem}>
                <label>Estudios</label>
                <span>{game.studios || "N/A"}</span>
              </div>
              <div className={style.metaItem}>
                <label>Emisión</label>
                <span>
                  <FaCalendarAlt /> {game.aired_string || "N/A"}
                </span>
              </div>
              <div className={style.metaItem}>
                <label>Calificación</label>
                <span>{game.rating_age || "N/A"}</span>
              </div>
              <div className={style.metaItem}>
                <label>Duración</label>
                <span>{game.duration || "N/A"}</span>
              </div>
              <div className={style.metaItem}>
                <label>Géneros</label>
                <span>{game.tags ? game.tags.join(", ") : "N/A"}</span>
              </div>
              <div className={style.metaItem}>
                <label>Productores</label>
                <span>{game.producers || "N/A"}</span>
              </div>
            </div>
          </section>

          {game.trailer && (
            <section className={style.trailerSection}>
              <h2 className={style.sectionTitle}>
                <FaPlay /> Tráiler Oficial
              </h2>
              <div className={style.videoWrapper}>
                <iframe
                  src={game.trailer}
                  title={`${game.name} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}
        </div>

        {/* Reviews Section */}
        {game.Reviews && game.Reviews.length > 0 && (
          <section className={style.reviewsSection}>
            <h2 className={style.sectionTitle}>Reseñas de Usuarios</h2>
            <div className={style.reviewsGrid}>
              {game.Reviews.map((review, idx) => (
                <div key={idx} className={style.reviewCard}>
                  <div className={style.reviewHeader}>
                    <img
                      src={review.Users[0].profileImage}
                      alt={review.author}
                      className={style.userAvatar}
                    />
                    <div className={style.userMeta}>
                      <h4>{review.author}</h4>
                      <span>{review.date}</span>
                    </div>
                    <div className={style.userRating}>
                      <FaStar /> {review.rating}
                    </div>
                  </div>
                  <p className={style.reviewText}>{review.reviews}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Detail;
