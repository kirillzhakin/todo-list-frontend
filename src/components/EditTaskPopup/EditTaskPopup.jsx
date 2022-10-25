import React from "react";
import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditTaskPopup(props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [responsible, setResponsible] = useState("");
  const [status, setStatus] = useState("");

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
    setTitle(props.task.title);
    setPriority(props.task.priority);
    setDate(props.task.date);
    setResponsible(props.task.responsible);
    setStatus(props.task.status);
  }, [props.task, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditTask({
      title,
      priority,
      date,
      responsible,
      status,
      id: props.task.id,
    });
  }

  return (
    <PopupWithForm
      name="edit-task"
      taskTitle="Редактировать задачу"
      title={title}
      priority={priority}
      date={date}
      responsible={responsible}
      status={status}
      buttonText="Сохранить"
      isOpen={props.task.isOpen}
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

export default EditTaskPopup;
