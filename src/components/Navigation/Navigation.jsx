import React, { useState } from "react";
import "./Navigation.css";

function Navigation({ onAddTask, onFiltred, visor, handleChangeVisor }) {
  const [clickedId, setClickedId] = useState(null);

  const activeButton = "tasks-nav__button tasks-nav__button_active";
  const passiveButton = "tasks-nav__button";

  function onClickBtn(id) {
    onFiltred(id);
    // const buttons = document.getElementsByClassName("tasks-nav__button");
    // [...buttons].forEach((el) => {
    //   if (el.id === id) {
    //     el.classList.add(active);
    //   } else {
    //     el.classList.remove(active);
    //   }
    // });
  }

  return (
    <header className="tasks-nav">
      <ul className="tasks-nav__box">
        <li>
          <button
            onClick={(e) => onClickBtn(e.target.id)}
            aria-label="Мои задачи"
            type="button"
            className="tasks-nav__button"
            id="my-tasks"
          >
            Мои задачи
          </button>
        </li>
        <li>
          <button
            onClick={(e) => onClickBtn(e.target.id)}
            aria-label="На сегодня"
            type="button"
            className="tasks-nav__button"
            id="today-tasks"
          >
            На сегодня
          </button>
        </li>
        <li>
          <button
            onClick={(e) => onClickBtn(e.target.id)}
            aria-label="На неделю"
            type="button"
            className="tasks-nav__button"
            id="week-tasks"
          >
            На неделю
          </button>
        </li>
        <li>
          <button
            onClick={(e) => onClickBtn(e.target.id)}
            aria-label="На будущее"
            type="button"
            className="tasks-nav__button"
            id="future-tasks"
          >
            На будущее
          </button>
        </li>
        <li>
          <button
            onClick={(e) => onClickBtn(e.target.id)}
            aria-label="Все задачи"
            type="button"
            className="tasks-nav__button"
            id="all-tasks"
          >
            Все задачи
          </button>
        </li>
        <li>
          <button
            onClick={onAddTask}
            aria-label="Новая задача"
            type="button"
            className="tasks-nav__button"
          >
            Новая задача
          </button>
        </li>
      </ul>
      <div className="tasks-nav__visor">
        <h3 className="tasks-nav__title">Руководитель:</h3>

        <select
          name="select"
          id="visor"
          required
          className="tasks-nav__input"
          value={visor || ""}
          onChange={handleChangeVisor}
        >
          <option value=""></option>
          <option value="Иванов">Иванов</option>
          <option value="Петров">Петров</option>
          <option value="Романов">Романов</option>
        </select>

        <button
          onClick={(e) => onClickBtn(e.target.id)}
          aria-label="Задачи руководителя"
          type="button"
          className="tasks-nav__button"
          id="visor-tasks"
        >
          Задачи руководителя
        </button>
      </div>
    </header>
  );
}

export default Navigation;
