import React, {useState} from 'react';
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import style from "./Reviews.module.css"
import { withRouter } from 'react-router-dom';
import Swal from "sweetalert2";

//! agregar alerta de swift
const ReviewsModif = ({ match }) => {
  const { id } = match.params;

  const gameRe = useSelector(state => state.review)
 
  // const IDUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    review: "",
    rating: 0,
    id: id,
    name: gameRe.name,
    idGame: gameRe.id,
  });

 
  
  const handleStarClick = (rating) => {
    setForm({ ...form, rating });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.put("http://localhost:3001/user/review", form, id)
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Editado con éxito",
      showConfirmButton: false,
      timer: 2000
  })
    
    .then(res => {
      setForm({
        review: "",
        rating: 0,
        
    
      });
    })
    .catch(error => {
      console.error("Error submitting review:", error);
    });
  };
  
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
        key={i}
        className={i <= form.rating ? style.starFilled : style.star}
        onClick={() => handleStarClick(i)}
        />
        );
      }
      return stars;
    };
    
    return (
      <div className={style.body_form}>
    <form onSubmit={handleSubmit}>
      <div className={style.total_container}>
        <label className={style.review}>Reseña:</label>
        <textarea 
          name="review"
          value={form.review}
          onChange={(event) => setForm({ ...form, review: event.target.value })}
          className={style.texto_review}
        />
      
      <div>
        <label className={style.rating}>Calificación:</label>
        <div className={style.starContainer}>
          {renderStars()}
        </div>
      </div>
      <button className={style.button} type="submit">Editar Reseña</button>
      </div>
    </form>
    </div>

  );
};

export default withRouter(ReviewsModif);