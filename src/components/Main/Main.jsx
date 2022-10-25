import React from "react";
import Task from "../Task/Task";
import "./Main.css";

function Main(props) {
  return (
    <main className="content">
      <section className="tasks-nav">
        <h3 className="tasks-nav__title">Мои задачи:</h3>
        <button
          onClick={() => props.onFiltred("today-tasks")}
          aria-label="На сегодня"
          type="button"
          className="tasks-nav__button"
        >
          На сегодня
        </button>
        <button
          onClick={() => props.onFiltred("week-tasks")}
          aria-label="На неделю"
          type="button"
          className="tasks-nav__button"
        >
          На неделю
        </button>
        <button
          onClick={() => props.onFiltred("future-tasks")}
          aria-label="На будущее"
          type="button"
          className="tasks-nav__button"
        >
          На будущее
        </button>

        <button
          onClick={() => props.onFiltred("all-tasks")}
          aria-label="Все задачи"
          type="button"
          className="tasks-nav__button"
        >
          Все задачи
        </button>
        <button
          onClick={props.onAddTask}
          aria-label="Новая задача"
          type="button"
          className="tasks-nav__button"
        >
          Новая задача
        </button>

        <h3 className="tasks-nav__title">Руководитель:</h3>

        <select
          name="select"
          id="visor"
          required
          className="task-nav__input"
          value={props.visor || ""}
          onChange={props.handleChangeVisor}
        >
          <option value=""></option>
          <option value="Иванов">Иванов</option>
          <option value="Петров">Петров</option>
          <option value="Романов">Романов</option>
        </select>

        <button
          onClick={() => props.onFiltred("visor-tasks")}
          aria-label="Задачи руководителя"
          type="button"
          className="tasks-nav__button"
        >
          Задачи руководителя
        </button>
      </section>

      <section className="tasks">
        {props.tasks.map((item) => {
          return (
            <Task
              key={item.id}
              {...item}
              onEditTask={props.onEditTask}
              onTaskDelete={props.onTaskDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
