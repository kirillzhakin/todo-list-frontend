import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Task.css";

function Task(props) {
  const currentUser = useContext(CurrentUserContext);

  const task = {
    title: props.title,
    priority: props.priority,
    date: props.date,
    responsibleUser: props.responsibleUser,
    status: props.status,
    id: props.id,
    userId: props.userId,
  };

  function handleClick() {
    props.onEditTask(task);
  }

  function handleDeleteClick() {
    props.onTaskDelete(task.id);
  }

  const isOwn = task.userId !== currentUser.id;
  const dateView = new Date(props.date).toLocaleDateString();
  const today = new Date().getTime();
  const date = new Date(props.date).getTime();

  return (
    <div className="task">
      <div className="task__container" onClick={!isOwn ? handleClick : null}>
        <h2
          className={`task__title ${
            props.status === "Выполняется" && today > date
              ? "task__color-red"
              : props.status === "Выполнена"
              ? "task__color-green"
              : null
          }`}
        >
          {props.title}
        </h2>
        <ul className="task__un-list">
          <li className="task__list">Приоритет: {props.priority}</li>
          <li
            className={`task__list ${
              props.status === "Выполняется" && today > date
                ? "task__color-red"
                : null
            }`}
          >
            Дата окончания: {dateView}
          </li>
          <li className="task__list">Ответственный: {props.responsibleUser}</li>
          <li className="task__list">Статус: {props.status}</li>
          <li className="task__list">Пользователь: {props.creatorUser}</li>
        </ul>
      </div>
      <button
        className="task__button"
        disabled={isOwn}
        onClick={handleDeleteClick}
      >
        Удалить задачу
      </button>
    </div>
  );
}

export default Task;
