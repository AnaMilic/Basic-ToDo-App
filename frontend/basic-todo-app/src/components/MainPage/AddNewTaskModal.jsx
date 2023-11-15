import React, { useState, forwardRef } from "react";

function AddNewTaskModal({ setTodoTasks, setIsModalVisible }, ref) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  let handleSubmit = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("button clickesd");
    let user = JSON.parse(localStorage.getItem("user-info")).user;

    try {
      const requestBody = JSON.stringify({
        task: {
          title,
          description,
        },
        user,
      });
      if (!requestBody) {
        return;
      }
      let res = await fetch("http://localhost:5050/api/tasks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      const formattedResponse = await res.json();

      if (res.status === 200) {
        setTitle("");
        setDescription("");
        // setTodoTasks((oldTasks) => [...oldTasks, res.task]);

        alert("A new task has been seccessfully added.");
      } else {
        alert(formattedResponse);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="addModal" id="modal" ref={ref}>
      <div className="modalContent" style={{ height: "60%" }}>
        <span
          className="closeModal"
          onClick={() => {
            setIsModalVisible(false);
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
          Add new task to your list.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            style={{ marginLeft: "0px", width: "75%" }}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
          <button type="submit" className="saveBtn">
            SAVE TASK
          </button>
        </form>
      </div>
    </div>
  );
}

export default forwardRef(AddNewTaskModal);
