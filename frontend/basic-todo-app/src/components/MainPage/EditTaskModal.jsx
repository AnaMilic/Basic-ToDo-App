import React, { useState, forwardRef } from "react";

import axios from "axios";
function EditTaskModal({ task, setEditingTask }, ref) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  function editTask(e) {
    e.stopPropagation();
    e.preventDefault();
    return axios
      .patch("http://localhost:5050/api/tasks", {
        task: {
          ...task,
          title,
          description,
        },
      })
      .then((response) => {
        alert("Successful change of task.");
      })
      .catch((err) => alert(`Change of task failed. Error: ${err}.`))
      .finally(() => setEditingTask(null));
  }

  return (
    <div
      className="addModal"
      id="modalEdit"
      style={{ display: "block" }}
      ref={ref}
    >
      <div className="modalContent" style={{ height: "60%" }}>
        <span
          className="closeModal"
          onClick={() => {
            setEditingTask(null);
          }}
        >
          X
        </span>
        <p
          style={{
            color: "grey",
            fontFamily: "sans-serif",
            fontStyle: "italic",
          }}
        >
          You can edit your task by changing title or description.
        </p>
        <form action="submit">
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            style={{ marginLeft: "0px", width: "75%" }}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <textarea
            type="text"
            name="description"
            placeholder="Enter task description"
            style={{
              padding: "10px",
              backgroundColor: "#e0dede",
              border: "none",
              broderRadius: "15px",
              fontFamily: "sans-serif",
              width: "75%",
              height: "200px",
              resize: "none",
              outline: "none",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="saveBtn"
            onClick={editTask}
            disabled={title === ""}
          >
            Edit TASK
          </button>
        </form>
      </div>
    </div>
  );
}

export default forwardRef(EditTaskModal);
