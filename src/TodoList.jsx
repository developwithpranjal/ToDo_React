import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function TodoList() {
  const [inp, setinput] = useState("");
  const [task, setTask] = useState([]);
  const [isEditing, setEditing] = useState(false);

  function addTask() {
    const obj = { id: Date.now(), tasks: inp };

    setTask([...task, obj]);
    setinput("");
  }
  function DeleteTask(id) {
    setTask(task.filter((obj) => obj.id !== id));
  }

  function Editing(id) {
    const editList =task.find((obj) => obj.id === id);
    setinput(editList.tasks)
    setEditing(true)
  }

  return (
    <>
      <div>
        <input
          onChange={(e) => setinput(e.target.value)}
          type="text"
          value={inp}
          placeholder="Enter the text"
        />
        <button onClick={addTask}>{isEditing?"Edit Task":"Add Task"}</button>
      </div>
      <ul>
        {task.map((obj) => {
          return (
            <li>
              <span>{obj.tasks}</span>
              <MdDelete onClick={() => DeleteTask(obj.id)} />
              <MdEdit onClick={() => Editing(obj.id)} />
              <FaCheck />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TodoList;
