import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

import "./Register.css";

function Register({ onRegister, errorMessage }) {
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
    onRegister({ login: inputs.login, password: inputs.password });
  }

  return (
    <div className="register">
      <AuthForm
        title="Регистрация"
        buttonText="Зарегестрироваться"
        login={inputs.login}
        password={inputs.password}
        onChange={handleChange}
        onSubmit={handleSubmit}
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
