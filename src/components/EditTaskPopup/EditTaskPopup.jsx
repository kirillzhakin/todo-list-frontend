import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditTaskPopup({ onClose, task, onEditTask }) {
  return (
    <PopupWithForm
      name="edit-task"
      buttonText="Сохранить"
      taskTitle="Редактировать задачу"
      task={task}
      onClose={onClose}
      isOpen={task.isOpen}
      onEditTask={onEditTask}
    />
  );
}

export default EditTaskPopup;
