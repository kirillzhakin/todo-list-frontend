import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header(props) {
  let location = useLocation();
  let { login }  = props.userData || {};

  return (
    <header className="header">
      {props.isLoggedIn && (
        <h2 className="header__name"> {`Пользователь: ${login}`}</h2>
      )}

      <ul className="header__nav">
        {!props.isLoggedIn && (
          <li>
            {location.pathname === "/signin" && (
              <Link
                className="header__button"
                type="button"
                aria-label="Кнопка"
                to="/signup"
              >
                Регистрация
              </Link>
            )}
          </li>
        )}
        {!props.isLoggedIn && (
          <li>
            {location.pathname === "/signup" && (
              <Link
                className="header__button"
                type="button"
                aria-label="Кнопка"
                to="/signin"
              >
                Войти
              </Link>
            )}
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <Link
              className="header__button"
              type="button"
              aria-label="Кнопка"
              to="/sign-in"
              onClick={props.handleSignOut}
            >
              Выйти
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
