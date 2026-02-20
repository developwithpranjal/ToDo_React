import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
const TodoList = () => {
  const [inp, setInput] = useState("");
  const [Tasks, SetTasks] = useState([]);
  const [IsEdit, setIsEdit] = useState(false);
  const [EditId, setEditId] = useState(null);

  function addTask() {
    if (!IsEdit) {
      const obj = { id: Date.now(), task: inp };
      SetTasks([...Tasks, obj]);
    } else {
      SetTasks(
        Tasks.map((obj) => {
          return obj.id === EditId ? { ...obj, task: inp } : obj;
        }),
      );
    }
    setIsEdit(false);
    setEditId(null);
    setInput("");
  }
  function DeleteTask(id) {
    SetTasks(
      Tasks.filter((obj) => {
        return obj.id !== id;
      }),
    );
  }
  function EditTask(id) {
    const Editing = Tasks.find((obj) => {
      return obj.id == id;
    });
    setInput(Editing.task);
    setIsEdit(true);
    setEditId(id);
  }

  return (
    <>
      <div>
        <h1>ToDo List</h1>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={inp}
          type="text"
          placeholder="Enter Your Text"
        />
        <button onClick={addTask}> {!IsEdit ? "Add Task" : "Edit Task"}</button>
      </div>
      <ul>
        {Tasks.map((obj) => {
          return (
            <li>
              {obj.task}{" "}
              <span className="del">
                <MdDelete onClick={(e) => DeleteTask(obj.id)} />
              </span>
              <span className="edit">
                {" "}
                <FaPencil onClick={(e) => EditTask(obj.id)} />
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
