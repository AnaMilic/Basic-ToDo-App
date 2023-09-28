import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  function allowDrop(ev) {
    ev.preventDefault();
  }
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //el.target.closest(".column").append(document.getElementById(data));
    ev.currentTarget.appendChild(document.getElementById(data));
  }
  var modal = document.getElementById("modal");
  var addModalBtn = document.getElementById("addBtn");
  var span = document.getElementsByClassName("closeModal")[0];

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
      }}
    >
      <div className="mainPage">
        <div className="heading">
          <p className="headingText">
            <i>TO DO LIST</i>
          </p>
        </div>

        <button
          className="addBtn"
          onClick={() => {
            modal.style.display = "block";
          }}
        >
          ADD NEW TASK
        </button>
        <div className="addModal" id="modal" style={{ display: "none" }}>
          <div className="modalContent">
            <span
              className="closeModal"
              onClick={() => {
                modal.style.display = "none";
              }}
            >
              X
            </span>

            <p>uweigbuqono</p>
            <form>
              <input
                type="text"
                name="title"
                placeholder="Enter task title"
              ></input>
              <input
                type="text"
                name="description"
                placeholder="Enter task description"
              ></input>
            </form>
            <button className="saveBtn">SAVE TASK</button>
          </div>
        </div>

        <div className="toDoList">
          <div
            className="column"
            id="toDo"
            style={{ borderTopColor: "#ff5659" }}
            onDrop={(event) => {
              drop(event);
            }}
            onDragOver={(event) => {
              allowDrop(event);
            }}
          >
            <h2>to do</h2>
            <div
              className="task"
              id="task1"
              draggable="true"
              onDragStart={(event) => {
                drag(event);
              }}
            >
              <span>Task 1</span>
            </div>
            <div
              className="task"
              id="task2"
              draggable="true"
              onDragStart={(event) => {
                drag(event);
              }}
            >
              <span>Task 2</span>
            </div>
            <div
              className="task"
              id="task3"
              draggable="true"
              onDragStart={(event) => {
                drag(event);
              }}
            >
              <span>Task 3</span>
            </div>
          </div>
          <div
            className="column"
            id="doing"
            style={{ borderTopColor: "#ffff80" }}
            onDrop={(event) => {
              drop(event);
            }}
            onDragOver={(event) => {
              allowDrop(event);
            }}
          >
            <h2>doing</h2>
          </div>
          <div
            className="column"
            id="done"
            style={{ borderTopColor: "#99ff99" }}
            onDrop={(event) => {
              drop(event);
            }}
            onDragOver={(event) => {
              allowDrop(event);
            }}
          >
            <h2>done</h2>
          </div>
        </div>
      </div>
      <button
        className="logOutBtn"
        onClick={() => {
          navigate("/");
        }}
      >
        LOGOUT
      </button>
    </div>
  );
}

export default MainPage;
