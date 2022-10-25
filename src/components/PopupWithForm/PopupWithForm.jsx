import "./PopupWithForm.css";

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <form
          name={props.name}
          className="popup__form"
          noValidate
          onSubmit={props.handleSubmit}
        >
          <h2 className="popup__title">{props.taskTitle}</h2>
          <div className="popup__input-container">
            <p className="popup__input-placeholder">Задача:</p>
            <input
              type="text"
              name="title"
              id="title"
              className="popup__input"
              required
              minLength="2"
              maxLength="100"
              value={props.title || ""}
              onChange={props.handleChangeTitle}
            />
          </div>
          <div className="popup__input-container">
            <p className="popup__input-placeholder">Приоритет:</p>
            <select
              name="select"
              id="priority"
              className="popup__input"
              value={props.priority || ""}
              onChange={props.handleChangePriority}
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
              required
              value={props.date || ""}
              onChange={props.handleChangeData}
            />
          </div>
          <div className="popup__input-container">
            <p className="popup__input-placeholder">Ответственный:</p>
            <select
              name="select"
              id="responsible"
              required
              className="popup__input"
              value={props.responsible || ""}
              onChange={props.handleChangeResponsible}
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
              value={props.status || ""}
              onChange={props.handleChangeStatus}
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
            value={props.buttonText}
            className="popup__button"
          />
        </form>
        <button
          aria-label="Выход"
          type="button"
          className="popup__close-btn"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
