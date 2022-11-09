import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Layout from "../Layout/Layout";
import Main from "../Main/Main";

import EditTaskPopup from "../EditTaskPopup/EditTaskPopup";
import AddTaskPopup from "../AddTaskPopup/AddTaskPopup";
import "./App.css";
import * as auth from "../../utils/auth";
import { api } from "../../utils/api";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ login: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [visor, setVisor] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filtred, setFiltred] = useState(tasks);
  const [isAddTaskPopupOpen, setAddTaskPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({
    title: "",
    priority: "",
    date: "",
    responsibleUser: "",
    status: "",
    id: "",
    isOpen: false,
  });
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const date = new Date().toLocaleDateString("en-ca");
  const today = new Date().getTime();
  const week = new Date().setDate(new Date().getDate() + 7);
  const token = localStorage.getItem("token");

  //Группировка по пользователю
  const tasksUser = tasks.filter((item) => item.userId === currentUser.id);

  // По дате последнего обновления
  const tasksSortUpdate = tasks.slice().sort((prev, next) => {
    const prevTask = new Date(prev.updatedAt).getTime();
    const nextTask = new Date(next.updatedAt).getTime();
    return prevTask - nextTask;
  });

  // По дате завершения
  const tasksSortEnd = tasksUser.slice().sort((prev, next) => {
    const prevTask = new Date(prev.date).getTime();
    const nextTask = new Date(next.date).getTime();
    return prevTask - nextTask;
  });

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialTasks(token)
        .then((tasks) => setTasks(tasks))
        .catch((err) => console.log(`${err}`));
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    setFiltred(tasks)
  }, [tasks]);

  //Токен
  useEffect(() => {
    if (token) {
      auth
        .check(token)
        .then(() => {
          const data = jwt_decode(token);
          setUserData({ login: data.login });
          setCurrentUser(data);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(`${err}`);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          navigate("/");
        });
    }
  }, [navigate, token]);

  //Регистрация
  function handleRegister({ login, password }) {
    auth
      .register(login, password)
      .then((res) => {
        if (res) {
          navigate("/signin");
          setLoginErrorMessage("Регистрация прошла успешно! Авторизируйтесь!");
          console.log("Регистрация успешна", res);
          setTimeout(() => {
            setLoginErrorMessage("");
          }, 3000);
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 400") {
          setRegisterErrorMessage("Введены невалидные данные");
        } else if (err === "Ошибка: 409") {
          setRegisterErrorMessage("Такой пользователь уже зарегестрирован");
        } else {
          setRegisterErrorMessage(`Что-то пошло не так...${err}`);
        }
        setTimeout(() => {
          setRegisterErrorMessage("");
        }, 3000);
      });
  }

  //Вход
  function handleLogin({ login, password }) {
    auth
      .login(login, password)
      .then((res) => {
        if (res.token) {
          console.log(`Авторизация успешна`, res);
          localStorage.setItem("token", res.token);
          const token = localStorage.getItem("token");
          if (token) {
            const data = jwt_decode(token);
            setUserData({ login: data.login });
            setCurrentUser(data);
          }
          setIsLoggedIn(true);
          setLoginErrorMessage("");
          navigate("/");
          return res.token;
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 400") {
          setLoginErrorMessage("Введены невалидные данные");
        } else if (err === "Ошибка: 401") {
          setLoginErrorMessage("Неправильные login или пароль");
        } else {
          setLoginErrorMessage(`Что-то пошло не так...${err}`);
        }
        setTimeout(() => {
          setLoginErrorMessage("");
        }, 3000);
      });
  }

  //Удаление задачи
  function handleTaskDelete(id) {
    api
      .deleteTask(id, token)
      .then(() => {
        setTasks((state) => state.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  // Группировка задач
  function handleFiltredTasks(param) {
    if (param === "my-tasks") {
      setFiltred(tasksSortEnd);
    }
    if (param === "all-tasks") {
      setFiltred(tasksSortUpdate);
    }
    if (param === "visor-tasks") {
      const visorTasks = [...tasksSortUpdate].filter((item) =>
        visor ? item.responsibleUser === visor : item
      );
      setFiltred(visorTasks);
    }
    if (param === "future-tasks") {
      const futureTasks = [...tasksSortEnd].filter((item) => {
        const date = new Date(item.date).getTime();
        return date > week;
      });
      setFiltred(futureTasks);
    }
    if (param === "week-tasks") {
      const weekTasks = [...tasksSortEnd].filter((item) => {
        const date = new Date(item.date).getTime();
        return date >= today && date <= week;
      });
      setFiltred(weekTasks);
    }
    if (param === "today-tasks") {
      const todayTasks = [...tasksSortEnd].filter((item) => {
        const date = new Date(item.date).getTime();
        return date < today;
      });
      setFiltred(todayTasks);
    }
  }

  // Руководитель
  function handleChangeVisor(e) {
    setVisor(e.target.value);
  }

  // Модальное окно Новая задача
  function handleAddTaskClick() {
    setAddTaskPopupOpen(true);
  }

  // Модальное окно Редактировать задачу
  function handleTaskClick(task) {
    setSelectedTask({ ...task, isOpen: true });
  }

  // Новая задача Submit
  function handleAddTaskSubmit(task) {
    api
      .createTask(task, token)
      .then((newTask) => {
        setTasks([newTask, ...tasks]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  // Редактировать задачу
  function handleUpdateTask(task) {
    api
      .setTask(task, token)
      .then((res) => {
        const newTask = [...tasks].map((item) => {
          if (item.id === res.id) {
            item.title = res.title;
            item.date = res.date;
            item.priority = res.priority;
            item.responsibleUser = res.responsibleUser;
            item.status = res.status;
          }
          return item;
        });
        setTasks(newTask);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  // Закрыть модальное окно
  function closeAllPopups() {
    setSelectedTask((state) => ({ ...state, isOpen: false }));
    setAddTaskPopupOpen(false);
  }

  // Выход
  function handleSignOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/signin");
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                isLoggedIn={isLoggedIn}
                userData={userData}
                handleSignOut={handleSignOut}
                onAddTask={handleAddTaskClick}
                onFiltred={handleFiltredTasks}
                visor={visor}
                handleChangeVisor={handleChangeVisor}
              />
            }
          >
            <Route
              index
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    onEditTask={handleTaskClick}
                    onTaskDelete={handleTaskDelete}
                    tasks={filtred}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Register
                    onRegister={handleRegister}
                    errorMessage={registerErrorMessage}
                  />
                )
              }
            />
            <Route
              path="signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Login
                    onLogin={handleLogin}
                    errorMessage={loginErrorMessage}
                  />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>

        <EditTaskPopup
          onClose={closeAllPopups}
          task={selectedTask}
          onEditTask={handleUpdateTask}
        />
        <AddTaskPopup
          isOpen={isAddTaskPopupOpen}
          onClose={closeAllPopups}
          date={date}
          onAddTask={handleAddTaskSubmit}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
