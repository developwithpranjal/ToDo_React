import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

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
  function DeleteTask(IdToDelete) {
    SetTasks(
      Tasks.filter((obj) => {
        return obj.id !== IdToDelete;
      }),
    );
  }
  function EditTask(IdToEdit) {
    const Editing = Tasks.find((obj) => {
      return obj.id == IdToEdit;
    });
    setInput(Editing.task);
    setIsEdit(true);
    setEditId(IdToEdit);
  }
  function CheckMarktask(IdToCheck) {
    SetTasks(
      Tasks.map((obj) => {
        return obj.id == IdToCheck
          ? { ...obj, Complete: obj.Complete ? false : true }
          : obj;
      }),
    );
    setIsEdit(false);
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
            <li
              key={obj.id}
              style={
                obj.Complete
                  ? { opacity: 0.5, textDecoration: "line-Through" }
                  : { opacity: 1, textDecoration: "none" }
              }
            >
              {obj.task}{" "}
              <span className="edit">
                {" "}
                <FaPencil onClick={(e) => EditTask(obj.id)} />
              </span>
              <span className="del">
                <MdDelete onClick={(e) => DeleteTask(obj.id)} />
              </span>
              <span>
                <FaRegCheckCircle
                  onClick={(e) => CheckMarktask(obj.id)}
                  style={{
                    color: obj.Complete ? "green" : "grey",
                    cursor: "pointer",
                  }}
                />
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
