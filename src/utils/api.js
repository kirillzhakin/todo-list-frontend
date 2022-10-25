const API_URL = "";

class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
  }

  //  Загрузка задач с сервера
  getInitialTasks(token) {
    return fetch(`${this.baseUrl}tasks`, {
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  //  Добавление новой задачи
  createTask(newTask, token) {
    return fetch(`${this.baseUrl}tasks`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTask.title,
        priority: newTask.priority,
        date: newTask.date,
        responsible: newTask.responsible,
        status: newTask.status,
      }),
    }).then(this._getResponseData);
  }

  // Удаление задачи
  deleteTask(id, token) {
    return fetch(`${this.baseUrl}tasks/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  // Редактировать задачу
  setTask(id, token) {
    return fetch(`${this.baseUrl}tasks/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  // Если сервер вернул ошибку, отклоняем Промис
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// Подключение Api
export const api = new Api({
  baseUrl: API_URL,
});
