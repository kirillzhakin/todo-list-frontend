import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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
  const [visor, setVisor] = useState("");

  const [tasks, setTasks] = useState([])

  const [filtred, setFiltred] = useState(tasks);
  const [isAddTaskPopupOpen, setAddTaskPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({
    title: "",
    priority: "",
    date: "",
    responsible: "",
    status: "",
    id: "",
    isOpen: false,
  });

  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const data = new Date();
  const today = data.getTime();
  const week = data.setDate(data.getDate() + 7);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialTasks(token)
        .then((tasks) => {
          setTasks(tasks.reverse());
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    setFiltred(tasks);
  }, [tasks]);

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
          setLoginErrorMessage("Неправильные почта или пароль");
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
    if (param === "all-tasks") {
      setFiltred(tasks);
    }
    if (param === "visor-tasks") {
      const visorTasks = [...tasks].filter((item) =>
        visor ? item.responsible === visor : item
      );
      setFiltred(visorTasks);
    }
    if (param === "future-tasks") {
      const futureTasks = [...tasks].filter((item) => {
        const date = new Date(item.date).getTime();
        return date > week;
      });
      setFiltred(futureTasks);
    }
    if (param === "week-tasks") {
      const weekTasks = [...tasks].filter((item) => {
        const date = new Date(item.date).getTime();
        return date >= today && date <= week;
      });
      setFiltred(weekTasks);
    }
    if (param === "today-tasks") {
      const todayTasks = [...tasks].filter((item) => {
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
    let newTask = [...tasks].map((item) => {
      if (item.id === task.id) {
        item.title = task.title;
        item.priority = task.priority;
        item.responsible = task.responsible;
        item.status = task.status;
      }
      return item;
    });
    setTasks(newTask);
    closeAllPopups();
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
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              isLoggedIn={isLoggedIn}
              userData={userData}
              handleSignOut={handleSignOut}
            />
          }
        >
          <Route
            index
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onAddTask={handleAddTaskClick}
                  onEditTask={handleTaskClick}
                  onTaskDelete={handleTaskDelete}
                  onFiltred={handleFiltredTasks}
                  tasks={filtred}
                  visor={visor}
                  handleChangeVisor={handleChangeVisor}
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
                <Login onLogin={handleLogin} errorMessage={loginErrorMessage} />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>

      <EditTaskPopup
        isOpen={setSelectedTask}
        onClose={closeAllPopups}
        task={selectedTask}
        onEditTask={handleUpdateTask}
      />
      <AddTaskPopup
        isOpen={isAddTaskPopupOpen}
        onClose={closeAllPopups}
        onAddTask={handleAddTaskSubmit}
      />
    </div>
  );
}

export default App;
