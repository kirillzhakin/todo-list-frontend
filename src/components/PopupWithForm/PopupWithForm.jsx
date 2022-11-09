import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./PopupWithForm.css";

function PopupWithForm({
  name,
  task,
  taskTitle,
  date,
  buttonText,
  isOpen,
  onClose,
  onAddTask,
  onEditTask,
}) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    console.log(data);

    if (onAddTask) {
      onAddTask({
        title: data.title,
        priority: data.priority,
        date: data.date,
        responsibleUser: data.responsibleUser,
        status: data.status,
      });
    }
    if (onEditTask) {
      onEditTask({
        title: data.title,
        priority: data.priority,
        date: data.date,
        responsibleUser: data.responsibleUser,
        status: data.status,
        id: task.id,
      });
    }
  };

  useEffect(() => {
    if (onAddTask) {
      reset({
        title: "",
        priority: "Средний",
        date: date,
        responsibleUser: "Иванов",
        status: "К выполнению",
      });
    }

    if (onEditTask) {
      reset({
        title: task.title,
        priority: task.priority,
        date: new Date(task.date).toLocaleDateString("en-ca"),
        responsibleUser: task.responsibleUser,
        status: task.status,
      });
    }
  }, [isOpen]);

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <form
          name={name}
          className="popup__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="popup__title">{taskTitle}</h2>
          <div className="popup__input-container">
            <p className="popup__input-placeholder">Задача:</p>
            <input
              type="text"
              name="title"
              id="title"
              className="popup__input"
              {...register("title", {
                required: "Поле обязательно к заполнению",
              })}
            />
          </div>
          {errors?.title && (
            <span className="popup__error">
              {errors?.title?.message || "Error!"}
            </span>
          )}
          <div className="popup__input-container">
            <p className="popup__input-placeholder">Приоритет:</p>
            <select
              name="select"
              id="priority"
              className="popup__input"
              {...register("priority")}
            >
              <option value="Высокий">Высокий</option>
              <option value="Средний">Средний</option>
              <option value="Низкий">Низкий</option>
            </select>
          </div>

          <div className="popup__input-container">
            <p className="popup__input-placeholder">Дата окончания:</p>

            <input
              type="date"
              name="date"
              id="date"
              className="popup__input"
              {...register("date", { value: date })}
            />
          </div>
          <div className="popup__input-container">
            <p className="popup__input-placeholder">Ответственный:</p>
            <select
              name="select"
              id="responsibleUser"
              className="popup__input"
              {...register("responsibleUser")}
            >
              <option value="Иванов">Иванов</option>
              <option value="Петров">Петров</option>
              <option value="Романов">Романов</option>
            </select>
          </div>

          <div className="popup__input-container">
            <p className="popup__input-placeholder">Статус:</p>
            <select
              name="select"
              id="status"
              className="popup__input"
              {...register("status")}
            >
              <option value="К выполнению">К выполнению</option>
              <option value="Выполняется">Выполняется</option>
              <option value="Выполнена">Выполнена</option>
              <option value="Отменена">Отменена</option>
            </select>
          </div>
          <input
            type="submit"
            name="submit"
            value={buttonText}
            className={`popup__button ${
              isValid ? "" : "popup__button_disabled"
            }`}
            disabled={!isValid}
          />
        </form>
        <button
          aria-label="Выход"
          type="button"
          className="popup__close-btn "
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
