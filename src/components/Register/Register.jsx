import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

import "./Register.css";

function Register({ onRegister, errorMessage }) {
  return (
    <div className="register">
      <AuthForm
        title="Регистрация"
        buttonText="Зарегестрироваться"
        onRegister={onRegister}
        errorMessage={errorMessage}
      />
      <div className="register__signin">
        <p className="register__signin-parag">Уже зарегистрированы?</p>
        <Link className="register__nav" to="/signin">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
