import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

import "./Login.css";

function Login({ onLogin, errorMessage }) {
  const [inputs, setState] = useState({
    login: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setState({ ...inputs, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ login: inputs.login, password: inputs.password });
  }
  return (
    <div className="login">
      <AuthForm
        title="Вход"
        buttonText="Войти"
        login={inputs.login}
        password={inputs.password}
        onChange={handleChange}
        onSubmit={handleSubmit}
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
