import './App.css';
import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Landing, Home, ShoppingCart, Detail, Whishlist , Form, AboutMe, Terms, Privacy, FAQ} from "./views";
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './views/Adm/adm';
import Search from "./views/Search/Search"
import Review from './views/Reviews/Reviews';

import Profile from './views/Profile/Profile';
import ReviewsModif from './views/Reviews/ReviewsModif';

import ShoppingView from './views/Profile/ProfileViews/ShoppingView';

function App() {

  const location = useLocation()

return (
  <div className="App">
    <>
      {location.pathname !== "/" && location.pathname !== "/dashboard" && <NavBar/>}
      <Route exact path="/" render={() => <Landing/>} />
      <Route path="/home" render={() => <Home/>}/>
      <Route path="/cart" render={() => <ShoppingCart/>} /> 
      <Route path="/login" render={() => <Form/>} /> 
      <Route exact path="/detail/:id" render={(routeProps) => <Detail {...routeProps} />} />
      <Route path="/whishlist" render={() => <Whishlist />} />
      <Route path="/dashboard" render={() => <Dashboard />} />
      <Route path="/search" render={() => <Search />} />
      <Route path="/review" render={() => <Review />} />
      <Route path="/library" render={() => <Whishlist />}/>
      <Route path="/pruebas" render={() => <ShoppingView />}/>
      <Route path="/user" render={(routeProps) => <Profile {...routeProps} />} />
      <Route path="/detail/reviews/:id" render={() => <ReviewsModif />} />
      <Route path="/aboutme" render={() => <AboutMe />} />
      <Route path="/terminos" render={() => <Terms />} />
      <Route path="/privacidad" render={() => <Privacy />} />
      <Route path="/faq" render={() => <FAQ />} />
      {location.pathname !== "/dashboard" && <Footer/>}
    </>
  </div>
);}


export default App;