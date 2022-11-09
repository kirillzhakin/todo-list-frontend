import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddTaskPopup({ isOpen, onClose, date, onAddTask }) {
  return (
    <PopupWithForm
      name="add-task"
      buttonText="Создать"
      taskTitle="Новая задача"
      date={date}
      isOpen={isOpen}
      onClose={onClose}
      onAddTask={onAddTask}
    />
  );
}

export default AddTaskPopup;
