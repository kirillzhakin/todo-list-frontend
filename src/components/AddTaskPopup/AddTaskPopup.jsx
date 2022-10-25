import React from "react";
import { useEffect, useState, useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddTaskPopup(props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Средний");
  const [date, setDate] = useState("2022-12-31");
  const [responsible, setResponsible] = useState("");
  const [status, setStatus] = useState("К выполнению");

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangePriority(e) {
    setPriority(e.target.value);
  }

  function handleChangeData(e) {
    setDate(e.target.value);
  }

  function handleChangeResponsible(e) {
    setResponsible(e.target.value);
  }

  function handleChangeStatus(e) {
    setStatus(e.target.value);
  }

  useEffect(() => {
    setTitle("");
    setPriority("Средний");
    setDate("2022-12-31");
    setResponsible("");
    setStatus("К выполнению");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddTask({
      title,
      priority,
      date,
      responsible,
      status,
      
    });
  }

  return (
    <PopupWithForm
      name="add-task"
      title={title}
      priority={priority}
      date={date}
      responsible={responsible}
      status={status}
      taskTitle="Новая задача"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
      handleChangeTitle={handleChangeTitle}
      handleChangePriority={handleChangePriority}
      handleChangeData={handleChangeData}
      handleChangeResponsible={handleChangeResponsible}
      handleChangeStatus={handleChangeStatus}
    />
  );
}

export default AddTaskPopup;
