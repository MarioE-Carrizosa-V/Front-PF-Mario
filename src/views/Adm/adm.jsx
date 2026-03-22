import styles from './adm.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  //Form Game
  const [showForm, setShowForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [requiredAge, setRequiredAge] = useState('');
  const [isFree, setIsFree] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [aboutTheGame, setAboutTheGame] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [comingSoon, setComingSoon] = useState('');
  const [supportInfo, setSupportInfo] = useState('');
  const [metacritic, setMetacritic] = useState('');
  const [priceOverview, setPriceOverview] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [capsuleImage, setCapsuleImage] = useState('');
  const [developers, setDevelopers] = useState('');
  const [genres, setGenres] = useState('');
  const [, setPublishers] = useState('');
  const [platform, setPlatform] = useState('');
  const [languages, setLanguages] = useState('');
  const [categories, setCategories] = useState('');

  // Form User
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleGameSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar os dados do formulário de criação de jogo
    // Limpar os campos do formulário após o envio
    setName('');
    setType('');
    setRequiredAge('');
    setIsFree('');
    setDetailedDescription('');
    setAboutTheGame('');
    setShortDescription('');
    setReleaseDate('');
    setComingSoon('');
    setSupportInfo('');
    setMetacritic('');
    setPriceOverview('');
    setHeaderImage('');
    setCapsuleImage('');
    setDevelopers('');
    setGenres('');
    setPublishers('');
    setPlatform('');
    setLanguages('');
    setCategories('');
  };

  const handleUserSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar os dados do formulário de criação de usuário
    // Limpar os campos do formulário após o envio
    setUserName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('user');
  };

  const handleCreateGameClick = (e) => {
    e.preventDefault();
    setShowForm(true);
    setShowUserForm(false);
  };

  const handleCreateUserClick = (e) => {
    e.preventDefault();
    setShowUserForm(true);
    setShowForm(false);
  };

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.area}></div>
      <nav className={styles.main_menu}>
        <ul>
          <li>
            <Link to="/home" className={styles.nav_link}>
              <i className={`fa fa-home ${styles["fa-2x"]}`}></i>
              <span className={styles.nav_text}>Home</span>
            </Link>
          </li>
          <li>
            <button className={styles.nav_button} onClick={handleCreateGameClick}>
              <i className={`fa fa-cogs ${styles["fa-2x"]}`}></i>
              <span className={styles.nav_text}>Create Game</span>
            </button>
          </li>
          <li>
            <button className={styles.nav_button} onClick={handleCreateUserClick}>
              <i className={`fa fa-user ${styles["fa-2x"]}`}></i>
              <span className={styles.nav_text}>Create User</span>
            </button>
          </li>
          <li>
            <button className={styles.nav_button}>
              <i className={`fa fa-shopping-cart ${styles["fa-2x"]}`}></i>
              <span className={styles.nav_text}>Sales</span>
            </button>
          </li>
        </ul>
        <ul className={styles.logout}>
          <li>
            <Link to="/login">
              <i className={`fa fa-power-off ${styles["fa-2x"]}`}></i>
              <span className={styles.nav_text}>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>


        {showForm && (
          <div className={styles.cardContainer}>
            <div>
              <button className={styles.close} onClick={() => setShowForm(!showForm)}>X</button>
            </div>
            <div className={styles.form1}>
              <h2>Creación de Producto</h2>
              <form onSubmit={handleGameSubmit}>
                <label>
                  Nombre del Juego:
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>

                <label>
                  Tipo:
                  <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                </label>

                <label>
                  Edad Requerida:
                  <input type="number" value={requiredAge} onChange={(e) => setRequiredAge(e.target.value)} />
                </label>

                <label>
                  Es Gratis:
                  <input type="text" value={isFree} onChange={(e) => setIsFree(e.target.value)} />
                </label>

                <label>
                  Descripción Detallada:
                  <textarea value={detailedDescription} onChange={(e) => setDetailedDescription(e.target.value)} />
                </label>

                <label>
                  Sobre el Juego:
                  <textarea value={aboutTheGame} onChange={(e) => setAboutTheGame(e.target.value)} />
                </label>

                <label>
                  Descripción Corta:
                  <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
                </label>



                <label>
                  Fecha de Lanzamiento:
                  <input type="text" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                </label>

                <label>
                  Próximamente:
                  <input type="text" value={comingSoon} onChange={(e) => setComingSoon(e.target.value)} />
                </label>

                <label>
                  Información de Soporte:
                  <textarea value={supportInfo} onChange={(e) => setSupportInfo(e.target.value)} />
                </label>

                <label>
                  Metacritic:
                  <input type="text" value={metacritic} onChange={(e) => setMetacritic(e.target.value)} />
                </label>

                <label>
                  Resumen de Precio:
                  <input type="text" value={priceOverview} onChange={(e) => setPriceOverview(e.target.value)} />
                </label>
                <label>
                  Imagen de Cápsula:
                  <input type="text" value={capsuleImage} onChange={(e) => setCapsuleImage(e.target.value)} />
                </label>

                <label>
                  Desarrolladores:
                  <input type="text" value={developers} onChange={(e) => setDevelopers(e.target.value)} />
                </label>

                <label>
                  Géneros:
                  <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} />
                </label>

                <label>
                  Plataforma:
                  <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} />
                </label>

                <label>
                  Idiomas:
                  <input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} />
                </label>

                <label>
                  Categorías:
                  <input type="text" value={categories} onChange={(e) => setCategories(e.target.value)} />
                </label>
                
                <label>
                  URL de Imagen:
                  <input type="text" value={headerImage} onChange={(e) => setHeaderImage(e.target.value)} />
                </label>

                <input className={styles.button2} type="submit" value="Crear Juego" />
              </form>
            </div>
          </div>
        )}

        {showUserForm && (
          <div className={styles.cardContainer}>
            <div>
            <button className={styles.close} onClick={() => setShowUserForm(!showUserForm)}>X</button>
            </div>
            <div className={styles.form1}>
              <h2>Crear Usuario</h2>
              <form onSubmit={handleUserSubmit}>
                <label>
                  Name:
                  <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </label>
                <label>
                  Email:
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                  Password:
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                  Confirm Password:
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                <label>
                  Select a Role:
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
                <input className={styles.button2} type="submit" value="Registrar" />
              </form>
            </div>
          </div>
        )}
    </div>
  );
}

export default Dashboard;
