import axios from "axios";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const CLEAR_CART = "CLEAR_CART";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const GET_GAMES = "GET_ANIME";
export const GET_DETAIL = "GET_ANIME_DETAIL";
export const CLEAR_DETAIL = "CLEAR_ANIME_DETAIL";
export const GET_GAMES_OFFER = "GET_ANIME_MOVIES";
export const GET_GAMES_COMING_SOON = "GET_ANIME_TOP";
export const GET_GAMES_TOP_SELLERS = "GET_ANIME_TV";
export const GET_GAMES_NEW_RELEASES = "GET_ANIME_NEW";
export const GET_BY_NAME = "GET_BY_NAME";
export const ADD_TO_WHISH_LIST = "ADD_TO_WHISH_LIST";
export const REMOVE_TO_WHISH_LIST = "REMOVE_TO_WHISH_LIST";
export const CLEAR_WHISH_LIST = "CLEAR_WHISH_LIST";
export const CREATE_USER = "CREATE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const DATA_GOOGLE = "DATA_GOOGLE";
export const LOGOUT_USERGOOGLE = "LOGOUT_USERGOOGLE";
export const UPDATE_USER_SUBSCRIPTION = "UPDATE_USER_SUBSCRIPTION";

export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const PLATFORMS = "PLATFORMS";
export const LANGUAGES = "LANGUAGES";
export const CATEGORIES = "CATEGORIES";
export const DEVELOPERS = "DEVELOPERS";
export const GENRES = "GENRES";

export const ORDER_BY = "ORDER_BY";
export const FILTER_TYPE = "FILTER_TYPE";
export const FILTER_AGE = "FILTER_AGE";
export const FILTER_FREE = "FILTER_FREE";
export const RESET_FILTERS = "RESET_FILTERS";
export const FILTER_PLATFORMS = "FILTER_PLATFORMS";
export const FILTER_CATEGORIES = "FILTER_CATEGORIES";
export const FILTER_LANGUAGES = "FILTER_LANGUAGES";
export const FILTER_GENRES = "FILTER_GENRES";
export const FILTER_CONTROLLER = "FILTER_CONTROLLER";
export const USER_PROFILE = "USER_PROFILE";
export const CLEANDETAIL = "CLEANDETAIL";
export const EDITNAME = "EDITNAME";
export const EDITUSERNAME = "EDITUSERNAME";
export const EDITCOUNTRY = "EDITCOUNTRY";
export const EDIT_PROFILE_IMAGE = "EDIT_PROFILE_IMAGE";
export const GETUSERSTORAGE = "GETUSERSTORAGE";
export const GET_MYGAMES = "GET_MYGAMES";

export const GETGAMEREVIEW = "GETGAMEREVIEW";

export const MANDARREVIEW = "MANDARREVIEW";

export const DELETEREVIEW = "DELETEREVIEW";

export const mandarAReview = (game) => {
  //console.log(game);
  return {
    type: MANDARREVIEW,
    payload: game,
  };
};

//! ARREGLAR TODAS LAS RUTAS Y REDUCER PARA ANIME
//? FUNCIONES DE PETICIONES
const ANIME_URL =
  process.env.REACT_APP_ANIME_URL || "https://api.jikan.moe/v4/anime";
const JIKAN_BASE_URL = ANIME_URL.replace(/\/anime\/?$/, "");

const mapAnime = (a) => {
  if (!a) return null;
  return {
    id: a.mal_id || a.entry?.[0]?.mal_id, // Fallback for some recommendation formats
    name: a.title || a.entry?.[0]?.title || "Unknown Title",
    image:
      a.images?.jpg?.large_image_url ||
      a.images?.jpg?.image_url ||
      a.entry?.[0]?.images?.jpg?.large_image_url ||
      "https://static.myanimelist.net/images/anime/10/47347.jpg",
    rating: a.score || "N/A",
    released: a.year || a.aired?.prop?.from?.year || "N/A",
    tags: a.genres ? a.genres.map((g) => g.name) : [],
    type: a.type,
    episodes: a.episodes || 0,
    status: a.status,
    price: 9.99,
  };
};

const mapAnimeFull = (a) => ({
  ...mapAnime(a),
  detailed_description: a.synopsis || "No synopsis available.",
  background: a.background,
  trailer: a.trailer?.embed_url,
  aired_string: a.aired?.string,
  rating_age: a.rating,
  duration: a.duration,
  source: a.source,
  studios: a.studios ? a.studios.map((s) => s.name).join(", ") : "N/A",
  producers: a.producers ? a.producers.map((p) => p.name).join(", ") : "N/A",
  streaming: a.streaming
    ? a.streaming.map((s) => ({ name: s.name, url: s.url }))
    : [],
});

// const axiosInstance = axios.create({
//   baseURL: ANIME_URL,
// });

export const resetfilters = () => {
  return {
    type: "RESET_FILTERS",
  };
};
export const filterplatforms = (payload) => {
  return {
    type: "FILTER_PLATFORMS",
    payload: payload,
  };
};
export const filterlanguages = (payload) => {
  return {
    type: "FILTER_LANGUAGES",
    payload: payload,
  };
};
export const filtercontroller = (payload) => {
  return {
    type: "FILTER_CONTROLLER",
    payload: payload,
  };
};
export const filtergenres = (payload) => {
  return {
    type: "FILTER_GENRES",
    payload: payload,
  };
};
export const filtercategories = (payload) => {
  return {
    type: "FILTER_CATEGORIES",
    payload: payload,
  };
};
export const filterage = (payload) => {
  return {
    type: "FILTER_AGE",
    payload: payload,
  };
};
export const orderBy = (payload) => {
  return {
    type: "ORDER_BY",
    payload: payload,
  };
};
export const filtertype = (payload) => {
  return {
    type: "FILTER_TYPE",
    payload: payload,
  };
};
export const filterfree = (payload) => {
  return {
    type: "FILTER_FREE",
    payload: payload,
  };
};
export const getGames = (limit = 20, page = 1) => {
  return async function (dispatch) {
    try {
      const url = `${ANIME_URL}?limit=${limit}&page=${page}&order_by=mal_id&sort=desc`;
      const response = await axios.get(url);

      if (!response.data || !response.data.data) {
        return;
      }

      const animes = response.data.data.map(mapAnime);

      dispatch({
        type: GET_GAMES,
        payload: animes,
      });
    } catch (error) {
      console.error("Error in getAnimes action:", error.message);
    }
  };
};

export const gameDetail = (id) => {
  return async function (dispatch) {
    try {
      // Jikan: /anime/{id}/full
      const url = `${JIKAN_BASE_URL}/anime/${id}/full`;
      const response = await axios.get(url);
      const anime = mapAnimeFull(response.data.data);
      dispatch({
        type: GET_DETAIL,
        payload: anime,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// export const preload = () => {
//     return async (dispatch) => {
//         try {
//             await axios.get('http://localhost:3001/preload');
//             console.log("base de datos cargada")
//         } catch (error) {
//         dispatch(console.log(error));
//         }
//     };
// };

export const getAnimeSearch = (filters = {}) => {
  return async function (dispatch) {
    try {
      const params = new URLSearchParams();
      if (filters.q) params.append("q", filters.q);
      if (filters.type) params.append("type", filters.type);
      if (filters.status) params.append("status", filters.status);
      if (filters.rating) params.append("rating", filters.rating);
      if (filters.genres) params.append("genres", filters.genres);
      if (filters.order_by) params.append("order_by", filters.order_by);
      if (filters.sort) params.append("sort", filters.sort);
      if (filters.min_score) params.append("min_score", filters.min_score);
      if (filters.max_score) params.append("max_score", filters.max_score);
      if (filters.sfw) params.append("sfw", "true");
      if (filters.unapproved) params.append("unapproved", "true");
      if (filters.page) params.append("page", filters.page);
      if (filters.limit) params.append("limit", filters.limit || 20);

      const response = await axios.get(`${ANIME_URL}?${params.toString()}`);
      const animes = response.data.data.map(mapAnime);

      dispatch({
        type: GET_BY_NAME,
        payload: animes,
      });
    } catch (error) {
      console.log("Error in getAnimeSearch:", error.message);
    }
  };
};

// Internal alias for backward compatibility if needed elsewhere
export const getByName = (name) => getAnimeSearch({ q: name });

export const clearDetail = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAR_DETAIL,
    });
  };
};

export const clearSearch = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAR_SEARCH,
    });
  };
};

export const getGamesOffer = () => {
  return async function (dispatch) {
    try {
      // Top Anime Movies
      const url = `${JIKAN_BASE_URL}/top/anime?type=movie&limit=10`;
      console.log("DEBUG: getGamesOffer calling:", url);
      const response = await axios.get(url);
      console.log(
        "DEBUG: getGamesOffer data count:",
        response.data.data?.length,
      );
      const animes = response.data.data.map(mapAnime);
      dispatch({
        type: GET_GAMES_OFFER,
        payload: animes,
      });
    } catch (error) {
      console.log("ERROR in getGamesOffer:", error.message);
    }
  };
};

export const getGamesComingSoon = () => {
  return async function (dispatch) {
    try {
      // Direct Top Anime Upcoming fetch
      const url = `${JIKAN_BASE_URL}/top/anime?filter=upcoming&limit=10`;
      console.log("DEBUG: getGamesComingSoon calling:", url);

      const response = await axios.get(url);
      console.log(
        "DEBUG: getGamesComingSoon data:",
        response.data.data?.length,
      );

      const animes = response.data.data.map(mapAnime);

      dispatch({
        type: GET_GAMES_COMING_SOON,
        payload: animes,
      });
    } catch (error) {
      console.log("ERROR in getGamesComingSoon:", error.message);
    }
  };
};

export const getRecommendations = (limit = 10) => {
  return async function (dispatch) {
    try {
      // /recommendations/anime doesn't support 'limit' as a direct query param in many versions/wrappers
      // but it does return a list of recommendations
      const url = `${JIKAN_BASE_URL}/recommendations/anime`;
      console.log("DEBUG: getRecommendations calling:", url);

      const response = await axios.get(url);
      console.log(
        "DEBUG: getRecommendations data:",
        response.data.data?.length,
      );

      // Flatten recommendations: each item has an 'entry' array with 2 animes
      const flattenedAnimes = [];
      response.data.data.forEach((rec) => {
        rec.entry.forEach((animeEntry) => {
          // Check for uniqueness by mal_id
          if (!flattenedAnimes.find((a) => a.id === animeEntry.mal_id)) {
            flattenedAnimes.push(mapAnime(animeEntry));
          }
        });
      });
      return flattenedAnimes.slice(0, limit);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };
};

export const getGamesTopSellers = () => {
  return async function (dispatch) {
    try {
      // Recommendations endpoint as requested
      const animes = await dispatch(getRecommendations(10));

      dispatch({
        type: GET_GAMES_TOP_SELLERS,
        payload: animes,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getGamesNewReleases = () => {
  return async function (dispatch) {
    try {
      // Seasonal Now Anime
      const url = `${JIKAN_BASE_URL}/seasons/now?limit=10`;
      const response = await axios.get(url);

      if (!response.data || !response.data.data) {
        return;
      }

      const animes = response.data.data.map(mapAnime);
      dispatch({
        type: GET_GAMES_NEW_RELEASES,
        payload: animes,
      });
    } catch (error) {
      console.log("ERROR in getGamesNewReleases:", error.message);
    }
  };
};

//? FUNCIONES DEL CARRITO
export const addCart = (game) => {
  return function (dispatch) {
    dispatch({
      type: ADD_TO_CART,
      payload: game,
    });
  };
};

export const removeCart = (id) => {
  //console.log(id);
  return {
    type: REMOVE_TO_CART,
    payload: id,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const createOrder = (totalPrice, cartGames, dataUser) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/createOrder", {
        totalPrice,
        cartGames,
        dataUser,
      });
      if (response.status === 200) {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: response.data,
        });
        const data = response.data;
        const paymentLink = data.links[1].href;
        window.location.href = paymentLink;
      } else {
        dispatch(createOrderFailure("Error creating order"));
      }
    } catch (error) {
      dispatch(createOrderFailure("Error creating order"));
      console.error("Error creating order:", error.message);
    }
  };
};

export const createOrderFailure = (errorMessage) => {
  return {
    type: CREATE_ORDER_FAILURE,
    payload: errorMessage,
  };
};

//? FUNCIONES DE LA LISTA DE DESEADOS

export const addWhishList = (game) => {
  return function (dispatch) {
    //console.log(game);
    dispatch({
      type: ADD_TO_WHISH_LIST,
      payload: game,
    });
  };
};

export const removeWhishList = (id) => {
  return function (dispatch) {
    dispatch({
      type: REMOVE_TO_WHISH_LIST,
      payload: id,
    });
  };
};

//? Action de Create User

export const postCreateUser = (props) => {
  return async function (dispatch) {
    try {
      const user = await axios.post("crearCuenta", props);
      console.log(user.props);
      return dispatch({
        type: CREATE_USER,
        payload: user.props,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//? Accion de Loguear Usuario

export const postLogin = (datos) => {
  return async function (dispatch) {
    try {
      const userTwo = await axios.post("iniciarSesion", datos);
      return dispatch({
        type: LOGIN_USER,
        payload: userTwo.data,
      });
    } catch (error) {
      //return dispatch({
      //    type : LOGIN_USER,
      //    payload : error.response.data
      //})
    }
  };
};

//? Action de Logout Usuario

export const logoutUser = () => {
  return async function (dispatch) {
    try {
      const logout = axios.post("cerrarSesion");
      console.log(logout);
      return dispatch({
        type: LOGOUT_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//Action de login with Google

export const loginGoogle = (googleUser) => {
  return function (dispatch) {
    try {
      return dispatch({
        type: DATA_GOOGLE,
        payload: googleUser,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDataGoogle = () => {
  return async (dispatch) => {
    try {
      const dataGoogle = await axios.get("/auth/user", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credential": true,
        },
      });
      if (dataGoogle.status === 200) {
        return dispatch({
          type: DATA_GOOGLE,
          payload: dataGoogle.data,
        });
        //setUser(dato.data.user);
      } else {
        throw new Error("Authentication has failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutGoogle = () => {
  return async (dispatch) => {
    try {
      const logoutTwo = await window.open("/auth/logout", "_self");
      console.log(logoutTwo);
      return dispatch({
        type: LOGOUT_USERGOOGLE,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearWhishList = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAR_WHISH_LIST,
    });
  };
};

export const platformsAll = () => {
  return async (dispatch) => {
    try {
      // Simulating platforms as Anime Types (TV, MOVIE, etc.)
      const types = ["TV", "MOVIE", "OVA", "SPECIAL", "ONA", "MUSIC"];
      return dispatch({
        type: PLATFORMS,
        payload: types.map((t) => ({ id: t, name: t })),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const languagesGames = () => {
  const endpoint = `languagesGames`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    return dispatch({
      type: LANGUAGES,
      payload: data,
    });
  };
};

export const categoriesGames = () => {
  const endpoint = `categoriesGames`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    return dispatch({
      type: CATEGORIES,
      payload: data,
    });
  };
};

export const developersGames = () => {
  const endpoint = `developersGames`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    return dispatch({
      type: DEVELOPERS,
      payload: data,
    });
  };
};

export const genresGames = () => {
  return async (dispatch) => {
    try {
      // Since the Anime API doc doesn't show a 'tags' list endpoint,
      // using a common set or assuming we can get them from a specific endpoint if it existed.
      const tags = [
        "action",
        "adventure",
        "comedy",
        "drama",
        "fantasy",
        "romance",
        "sci-fi",
      ];
      return dispatch({
        type: GENRES,
        payload: tags.map((t) => ({ id: t, name: t, description: t })), // keeping description for reducer compatibility
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const CleanDetail = () => {
  return function (dispatch) {
    dispatch({ type: CLEANDETAIL });
  };
};

export const editName = (id, newName) => {
  const endpoint = `/users/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.put(endpoint, { name: newName });
      dispatch({
        type: EDITNAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const editUserName = (id, newUserName) => {
  const endpoint = `/users/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.put(endpoint, { user_name: newUserName });
      dispatch({
        type: EDITUSERNAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const editCountry = (id, newCountry) => {
  const endpoint = `/users/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.put(endpoint, { country: newCountry });
      dispatch({
        type: EDITCOUNTRY,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

//   export const editProfileImage = () => {
//     return async function () {
//         try {
//             const formData = new FormData();
//             formData.append('file', selectedImage);
//             const response = await axios.post('http://localhost:3001/upload', formData, {
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//                 datosUser: JSON.stringify(datosUser.id),
//               },
//             });

//             if (response.status === 200) {
//               console.log(response.data); // URL de la imagen en Cloudinary
//             } else {
//               console.log(response.data); // Mensaje de error
//             }
//           } catch (error) {
//             console.log(error.message);
//           }
//     }
// };

export const getUserStorage = (id) => {
  const endpoint = `/profile/${id}`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    return dispatch({
      type: GETUSERSTORAGE,
      payload: data,
    });
  };
};

// export const getGameReview = (id) => {

//     const endpoint = `/reviewsDemo/${id}`;

//     return async (dispatch) => {
//         const {data} = await axios.get(endpoint);
//         return dispatch({
//             type: GETGAMEREVIEW,
//             payload: data
//         })
//     }

// }

//? ACCIONES DE MI BIBLIOTECA

export const getMyGames = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/user/games?id=${id}`);
      const games = response.data;
      dispatch({
        type: GET_MYGAMES,
        payload: games.Games,
      });
      //console.log(games.Games);
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getGameReview = (game) => {
  console.log(game);
  return (dispatch) => {
    return dispatch({
      type: GETGAMEREVIEW,
      payload: game,
    });
  };
};

export const getDeleteReview = (idRev) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/user/deleteReview/${idRev}`);
      //console.log("RESPONSEEEE",response);
      //console.log("IIIIIID",ids);
      const game = response.data;
      dispatch({
        type: DELETEREVIEW,
        payload: game,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const updateUserSubscription = (status) => {
  return {
    type: UPDATE_USER_SUBSCRIPTION,
    payload: status,
  };
};
