import React from "react";
import styles from "./Form.module.css";
import { useDispatch } from "react-redux";
import { loginGoogle } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import LogoBackground from "../../assets/AnimeZoneLogo.png";

const Form = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const continueGoogle = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    // Store in localStorage for persistence
    const googleUser = {
      isGoogle: true,
      name: decoded.name,
      user_name: decoded.name,
      email: decoded.email,
      profileImage: decoded.picture,
      sub: decoded.sub,
    };
    localStorage.setItem("user", JSON.stringify(googleUser));

    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: `¡Bienvenido, ${decoded.name}!`,
    });

    await dispatch(loginGoogle(googleUser));
    history.push("/home");
  };

  return (
    <div className={styles.body_form}>
      <div className={styles.loginContainer}>
        <img
          src={LogoBackground}
          alt="AnimeZone"
          className={styles.loginLogo}
        />
        <h2 className={styles.loginTitle}>Bienvenido a AnimeZone</h2>
        <div className={styles.googleBtnContainer}>
          <GoogleLogin
            onSuccess={continueGoogle}
            onError={() => {
              console.log("Google Login Failed");
              Swal.fire("Error", "El inicio de sesión con Google falló.", "error");
            }}
            useOneTap
            theme="filled_black"
            shape="rectangular"
            text="continue_with"
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
