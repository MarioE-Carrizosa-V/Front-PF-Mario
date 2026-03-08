// import { useEffect, useState } from "react";
// import { useHistory, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { clearDetail, gameDetail } from "../../redux/actions";
// import style from "./Detail.module.css";
// import { PacmanLoader } from "react-spinners";
// import * as act from "../../redux/actions";
// import { FaStar } from "react-icons/fa";

// const Detail = (props) => {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const game = useSelector((state) => state.gameDetail);
//   const isLoading = game === undefined || game === null;
//   const genres = game && game?.genres;
//   const [videoUrl, setVideoUrl] = useState("");
//   // const categoriesLimited = game && game?.categories?.slice(0, 3);
//   const id = props.match.params.id
//   let idReview

//   const datosUser = JSON.parse(localStorage.getItem("user"));
//   console.log("asdfghjhgfds",datosUser?.name)

//   useEffect(() => {
//     if (id) {
//       dispatch(gameDetail(id))
//       .then(() => {
//         const video = game?.Videos || "";
//         setVideoUrl(video);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     } else {
//       setVideoUrl("");
//     }

//     return () => {
//       dispatch(clearDetail());
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (game) {
//       const video = game?.Videos || "ssdds";
//       setVideoUrl(video);
//     }
//   }, []);

//   function sanitizeText(text) {
//     if (typeof text === "string") {
//       text = text.replace(/<\/?[^>]+(>|$)/g, "");
//       text = text.replace(/\*\*/g, "");
//       return text;
//     }
//     return text;
//   }

//   const handleAdd = () => {
//     dispatch(act.addCart({id: bkId, image: img, name:name , price: isNaN(price) ? 0 : price}));
//   }

//   const handleAddWhish = () => {
//     dispatch(act.addWhishList({ id: bkId, price: isNaN(price) ? 0 : price, name:name, image: img }));
//   };

//   const Rating = ({ rating }) => {
//     const renderStars = () => {
//       const stars = [];
//       for (let i = 0; i < 5; i++) {
//         if (i < rating) {
//           stars.push(<FaStar key={i} color="white" />);
//         } else {
//           stars.push(<FaStar key={i} color="gray" />);
//         }
//       }
//       return stars;
//     };

//     return <div style={{ display: "flex" }}>{renderStars()}</div>;
//   };

//   // promedio puntuacion
//   const calculateAverageRating = (reviews) => {
//     if (!reviews || reviews.length === 0) {
//       return 0;
//     }

//     const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//     const averageRating = totalRating / reviews.length;

//     return averageRating;
//   };

//   const calculateRatingCounts = (reviews) => {
//     const ratingCounts = {
//       1: 0,
//       2: 0,
//       3: 0,
//       4: 0,
//       5: 0,
//     };

//     if (!reviews || reviews.length === 0) {
//       return ratingCounts;
//     }

//     reviews.forEach((review) => {
//       ratingCounts[review.rating]++;
//     });

//     return ratingCounts;
//   };

//   const calculateRatingPercentages = (reviews) => {
//     const ratingCounts = calculateRatingCounts(reviews);
//     const totalReviews = reviews.length;

//     const ratingPercentages = {
//       1: totalReviews === 0 ? 0 : (ratingCounts[1] / totalReviews) * 100,
//       2: totalReviews === 0 ? 0 : (ratingCounts[2] / totalReviews) * 100,
//       3: totalReviews === 0 ? 0 : (ratingCounts[3] / totalReviews) * 100,
//       4: totalReviews === 0 ? 0 : (ratingCounts[4] / totalReviews) * 100,
//       5: totalReviews === 0 ? 0 : (ratingCounts[5] / totalReviews) * 100,
//     };

//     return ratingPercentages;
//   };

//   const handleEditReview = () => {
//     dispatch(act.getGameReview({review: reviews, rating: reviews?.rating}))
//   };

//   const handleDeleteReview = () => {
//     dispatch(act.getDeleteReview(idReview))
//     // console.log("IIIIDDDD HANDLER",idReview);
//   };

//   const reviews = game?.Reviews || [];
//   const averageRating = calculateAverageRating(game?.Reviews);
//   const ratingCounts = calculateRatingCounts(game?.Reviews);
//   const ratingPercentages = calculateRatingPercentages(reviews);

//   const price = game && (game?.price_overview)
//   const gamePrice = game && (game?.price_overview);
//   const img = game && game?.header_image;
//   const bkId = game && game?.id;
//   const name = game && game?.name

//   const handleBack = () => {
//     history.push("/home");
//   };

//   console.log("GAMEEEEEEEEEEEEEEE",game);
//   // console.log(game && game.Reviews);
//   // console.log("REVIEEEEEEEEEEEEW", game?.Reviews[0].id);
//   // console.log(game?.Reviews[0].Users[0].profileImage);

//   return (

//     <div className={style.info}>
//       {isLoading ? (
//         <div className={style.loading}>
//           <PacmanLoader color="blue" size={80} speedMultiplier={1} />
//         </div>
//       ) : (
//         <div className={style.container}>
//           <div className={style.container_juego}>
//             <div className={style.container_texto}>
//               <div className={style.name_margen}>
//                 <h1 className={style.name} translate="no">
//                   {sanitizeText(game.name)}
//                 </h1>
//               </div>
//               <p className={style.descripcion}>
//                 {sanitizeText(game.detailed_description)}
//               </p>
//               <div className={style.comprar}>
//                 <p className={style.texto_comprar}>
//                   {`Buy ${sanitizeText(game.name)}`}
//                 </p>
//                 <div className={style.div_comprar}>
//                 <p className={style.texto_precio}>
//                   }`}
//                 </p>
//                 <p className={style.texto_boton}>

//                   <button onClick={() => handleAdd(game)} className={style.buttonadd}>
//                     Add to Cart
//                   </button>
//                   <button onClick={() => handleAddWhish(game)} className={style.buttonWish}>
//                     Add to WhishList
//                   </button>
//                 </p>
//                 </div>

//               </div>
//             </div>
//             <div className={style.container_imagenes}>
//             <div className={style.image}>
//               <img
//                 className={style.img}
//                 src={game?.header_image}
//                 alt="Game"
//               />
//             </div>

//             <div className={style.container_screenshots}>
//   {game?.Videos && (
//     <video className={style.video} controls>
//       <source src={game?.Videos[0]?.video}  />
//     </video>
//   )}

//   {!game?.Videos &&

//     game?.Images.slice(0, 4).map((image, index) => (
//       <div key={index} className={style[`container_screenshots${index + 1}`]}>
//         <img
//           className={style.img}
//           src={image.image}
//           alt={`Screenshot ${index + 1}`}
//         />
//       </div>
//     ))}
//           {game?.Videos &&
//             game?.Images.slice(0, 3).map((image, index) => (
//               <div key={index} className={style[`container_screenshots${index + 1}`]}>
//                 <img
//                   className={style.img}
//                   src={image.image}
//                   alt={`Screenshot ${index + 1}`}
//                 />
//               </div>
//             ))}
//         </div>

//           </div>
//           </div>

//           <div className={style.detail_container}>

//             <div className={style.detail_left}>
//               <h2>
//                 <strong>Requirements </strong>
//               </h2>
//               <p>{sanitizeText(game?.pc_requirements.minimum)}</p>
//               <p>{sanitizeText(game.pc_requirements.recommended)}</p>
//               <h2>
//                 <strong>Languages </strong>
//               </h2>
//               <p>{sanitizeText(game?.Languages.map(l => `<p>${l.language}</p>`).join(', '))}</p>

//               <h2>
//                 <strong>Minimum age </strong>
//               </h2>
//               <p>{game.required_age}</p>
//               <h2>
//                 <strong>Developers </strong>
//               </h2>
//               <p>{sanitizeText(game?.Developers.map(d => `<p>${d.developer}</p>`).join(', '))}</p>
//             </div>

//             <div className={style.detail_rigth}>
//               <h2>
//                 <strong>Categories</strong>
//               </h2>
//               {/* {categoriesLimited && categoriesLimited.map((category) => ( */}
//                 <p>{sanitizeText(game?.Categories.map(c => `<p>${c.category}</p>`).join(', '))}</p>
//               {/* ))} */}
//               <h2>
//                 <strong>Genres </strong>
//               </h2>
//               <p>{sanitizeText(game?.Genres.map(g => `<p>${g.genre}</p>`).join(', '))}</p>
//               <h2>
//                 <strong>Released date </strong>
//               </h2>
//               <p>{game.release_date}</p>
//               <h2>
//                 <strong>ID :</strong>
//               </h2>
//               <p>{game?.id}</p>
//             </div>

//             </div>

//             <div className={style.reviews_container}>

//             <div className={style.promedio}>

//               <div className={style.promedioInfo}>
//               <h1 className={style.promedioNumber2}>{averageRating.toFixed(1)}</h1>

//               <div className={style.cantidadReviews}>
//               <h7 className={style.numeroReviews}>{reviews.length}</h7>
//               <h7> total reviews</h7>
//               </div>

//                 <div className={style.ratingCounts}>
//                    {[5, 4, 3, 2, 1].map((rating) => (
//                 <div key={rating} className={style.ratingCount}>
//               <div className={style.starRating}>
//                 <span className={style.ratingNumber}>{rating}</span>
//                 <span className={style.star}>★</span>
//               </div>
//             <div className={style.bar}>
//             <div
//             className={style.fill}
//             style={{ width: `${ratingPercentages[rating]}%`, backgroundColor: 'white'}}
//             ></div>
//             </div>
//             <div className={style.ratingPercentage}>
//               <span>{`${ratingPercentages[rating].toFixed(0)}%`}</span>
//               </div>
//          </div>
//     ))}
//   </div>
// </div>
// </div>

//                 <div className={style.opiniones}>

//                 {game?.Reviews &&
//                 game?.Reviews.map((review, index) => (
//                   <div className={style.opinion} key={index}>

//                     <div className={style.opiniontop} >

//                       <div className={style.opiniontopleft} >
//                         <img className={style.profileImage} src={review?.Users[0].profileImage} alt={`Screenshot`} />
//                        </div>

//                        <div className={style.opiniontopright} >
//                         <h3>{review?.author}</h3>
//                         <p>{review?.Users[0].name}</p>
//                         <p>{review?.date}</p>
//                         <Rating rating={review?.rating} />
//                        </div>

//                       </div>

//                     <div className={style.opinionback} >
//                       <p>{review?.reviews}</p>
//                       <p hidden>{idReview = review?.id}</p>
//                       {review?.Users[0].name  === datosUser.name &&
//                       <div className={style.opinionbuton} >
//                       <Link to={`reviews/${review?.id}` }>
//                       <button onClick={() => handleEditReview(review?.id)}>Edit Review</button>
//                       </Link>
//                       <button onClick={() => handleDeleteReview(review?.id)}>Delete Review</button>
//                       </div>
//                       }
//                     </div>

//                   </div>
//                 ))}

//                 </div>

//             </div>

//           </div>
//       )}
//     </div>
//   );
// };

// export default Detail;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, gameDetail } from "../../redux/actions";
import style from "./Detail.module.css";
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
  const dispatch = useDispatch();
  const game = useSelector((state) => state.gameDetail);
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
    dispatch(
      act.addCart({
        id: game.id,
        image: game.image,
        name: game.name,
        price: 9.99, // Premium price
      }),
    );
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
                <FaPlay /> Subscribe to Watch
              </button>
              <button onClick={handleAddWhish} className={style.secondaryBtn}>
                <FaPlus /> Add to Watchlist
              </button>
            </div>
          </div>

          <div className={style.infoGlass}>
            <div className={style.headerLabels}>
              <span className={style.statusLabel}>
                <FaCheckCircle /> {game.status || "Finished"}
              </span>
              <span className={style.typeLabel}>
                <FaTv /> {game.type || "TV"}
              </span>
            </div>

            <h1 className={style.title}>{game.name}</h1>

            <div className={style.ratingRow}>
              <Rating rating={game.rating} />
              <span className={style.scoreText}>
                {game.rating || "N/A"} Score
              </span>
              <span className={style.episodesCount}>
                {game.episodes || "?"} Episodes
              </span>
            </div>

            <p className={style.synopsis}>{game.detailed_description}</p>

            <div className={style.desktopActions}>
              <button onClick={handleAdd} className={style.primaryBtn}>
                <FaPlay /> Subscribe to Watch
              </button>
              <button onClick={handleAddWhish} className={style.secondaryBtn}>
                <FaPlus /> Add to Watchlist
              </button>
            </div>
          </div>
        </section>

        {/* Details & Trailer Section */}
        <div className={style.secondaryContent}>
          <section className={style.metadataSection}>
            <h2 className={style.sectionTitle}>
              <FaInfoCircle /> Detail Information
            </h2>
            <div className={style.metaGrid}>
              <div className={style.metaItem}>
                <label>Studios</label>
                <span>{game.studios || "N/A"}</span>
              </div>
              <div className={style.metaItem}>
                <label>Aired</label>
                <span>
                  <FaCalendarAlt /> {game.aired_string || "N/A"}
                </span>
              </div>
              <div className={style.metaItem}>
                <label>Rating</label>
                <span>{game.rating_age || "N/A"}</span>
              </div>
              <div className={style.metaItem}>
                <label>Duration</label>
                <span>{game.duration || "N/A"}</span>
              </div>
              <div className={style.metaItem}>
                <label>Genres</label>
                <span>{game.tags ? game.tags.join(", ") : "N/A"}</span>
              </div>
              <div className={style.metaItem}>
                <label>Producers</label>
                <span>{game.producers || "N/A"}</span>
              </div>
            </div>
          </section>

          {game.trailer && (
            <section className={style.trailerSection}>
              <h2 className={style.sectionTitle}>
                <FaPlay /> Offical Trailer
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
            <h2 className={style.sectionTitle}>User Reviews</h2>
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
