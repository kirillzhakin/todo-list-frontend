import React from "react";
import Task from "../Task/Task";
import "./Main.css";

function Main({ onEditTask, onTaskDelete, tasks }) {
  return (
    <main className="content">
      <section className="tasks">
        {tasks.map((item) => {
          return (
            <Task
              key={item.id}
              {...item}
              onEditTask={onEditTask}
              onTaskDelete={onTaskDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
