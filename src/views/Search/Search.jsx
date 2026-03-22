import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Search.module.css";
import * as act from "../../redux/actions";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../../components/Pagination/Pagination";

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);

  const [filters, setFilters] = useState({
    q: "",
    type: "",
    status: "",
    rating: "",
    order_by: "popularity",
    sort: "desc",
    sfw: true,
    unapproved: false,
    min_score: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initial popular results if no search
    if (search.length === 0) {
      dispatch(
        act.getAnimeSearch({ order_by: "popularity", sort: "desc", limit: 20 }),
      );
    }
  }, [dispatch, search.length]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    const newFilters = { ...filters, [name]: val };
    setFilters(newFilters);
    setCurrentPage(1);

    setLoading(true);
    dispatch(act.getAnimeSearch(newFilters)).then(() => setLoading(false));
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, q: e.target.value });
  };

  const handleSearchSubmit = () => {
    setLoading(true);
    dispatch(act.getAnimeSearch(filters)).then(() => {
      setCurrentPage(1);
      setLoading(false);
    });
  };

  const resetFilters = () => {
    const reset = {
      q: "",
      type: "",
      status: "",
      rating: "",
      order_by: "popularity",
      sort: "desc",
      sfw: true,
    };
    setFilters(reset);
    dispatch(act.getAnimeSearch(reset));
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = search
    ? search.slice(indexOfFirstResult, indexOfLastResult)
    : [];

  return (
    <div className={style.searchPage}>
      <div className={style.searchbar}>
        <div className={style.searchcontainer}>
          <input
            className={style.search}
            placeholder="Buscar anime..."
            type="text"
            value={filters.q}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          />
          <FontAwesomeIcon
            className={style.buttonsearch}
            onClick={handleSearchSubmit}
            icon={faSearchengin}
            size="xl"
          />
        </div>
      </div>

      <div className={style.searchyfilters}>
        <aside className={style.filters}>
          <button className={style.reset} onClick={resetFilters}>
            Restablecer Filtros
          </button>

          <div className={style.option}>
            <h3>Tipo:</h3>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">Todos los Tipos</option>
              <option value="tv">Serie TV</option>
              <option value="movie">Película</option>
              <option value="ova">OVA</option>
              <option value="special">Especial</option>
              <option value="ona">ONA</option>
              <option value="music">Música</option>
            </select>
          </div>

          <div className={style.option}>
            <h3>Estado:</h3>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Todos los Estados</option>
              <option value="airing">En Emisión</option>
              <option value="complete">Finalizado</option>
              <option value="upcoming">Próximamente</option>
            </select>
          </div>

          <div className={style.option}>
            <h3>Clasificación:</h3>
            <select
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
            >
              <option value="">Todas las Clasificaciones</option>
              <option value="g">G - Para todos los públicos</option>
              <option value="pg">PG - Niños</option>
              <option value="pg13">PG-13 - Adolescentes</option>
              <option value="r17">R - 17+</option>
              <option value="r">R+ - Desnudez leve</option>
            </select>
          </div>

          <div className={style.option}>
            <h3>Ordenar Por:</h3>
            <select
              name="order_by"
              value={filters.order_by}
              onChange={handleFilterChange}
            >
              <option value="popularity">Popularidad</option>
              <option value="score">Puntuación</option>
              <option value="rank">Rango</option>
              <option value="title">Título</option>
              <option value="start_date">Fecha de Estreno</option>
            </select>
          </div>

          <div className={style.option}>
            <h3>Orden:</h3>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
            >
              <option value="desc">Descendente</option>
              <option value="asc">Ascendente</option>
            </select>
          </div>

          <div className={style.option}>
            <h3>Pun. Mínima:</h3>
            <input
              type="number"
              name="min_score"
              value={filters.min_score}
              onChange={handleFilterChange}
              min="1"
              max="10"
              placeholder="1-10"
              className={style.scoreInput}
            />
          </div>

          <div className={style.checkboxGroup}>
            <label className={style.checkboxLabel}>
              <input
                type="checkbox"
                name="sfw"
                checked={filters.sfw}
                onChange={handleFilterChange}
              />
              SFW (Seguro para el trabajo)
            </label>
            <label className={style.checkboxLabel}>
              <input
                type="checkbox"
                name="unapproved"
                checked={filters.unapproved}
                onChange={handleFilterChange}
              />
              Mostrar No Aprobados
            </label>
          </div>
        </aside>

        <section className={style.results}>
          {loading ? (
            <div className={style.loadingContainer}>
              <div className={style.loading}></div>
            </div>
          ) : (
            <>
              {currentResults.length > 0 ? (
                <>
                  <CardsContainer gameComingSoon={currentResults} />
                  <Pagination
                    resultsPerPage={resultsPerPage}
                    totalResults={search ? search.length : 0}
                    currentPage={currentPage}
                    paginate={setCurrentPage}
                    maxPageButtons={3}
                  />
                </>
              ) : (
                <div className={style.noResults}>
                  <p>No se encontraron animes con los filtros actuales.</p>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Search;
