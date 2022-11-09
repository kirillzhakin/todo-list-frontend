import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

import "./Login.css";

function Login({ onLogin, errorMessage }) {

  return (
    <div className="login">
      <AuthForm
        title="Вход"
        buttonText="Войти"
        onLogin={onLogin}
        errorMessage={errorMessage}
      />
      <div className="login__signup">
        <p className="login__signup-parag">Еще не зарегистрированы?</p>
        <Link className="login__nav" to="/signup">
          Регистрация
        </Link>
      </div>
    </div>
  );
}

export default Login;
