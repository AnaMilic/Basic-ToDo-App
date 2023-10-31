import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MainPage() {
  const navigate = useNavigate();

  const url = "http://localhost:5050/api/tasks/getByEmail";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tasks, setTasks] = useState([]);
  const [tasksLength, setTasksLength] = useState(0);

  let [userLogined, setUserLogined] = useState("");
  userLogined = JSON.parse(localStorage.getItem("user-info")).user;

  const fetchInfo = () => {
    return axios
      .get(url, {
        params: {
          user: userLogined,
        },
      })
      .then((response) => {
        setTasks(response.data);
        setTasksLength(tasks.length);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

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
  const modal = document.getElementById("modal");
  //const addModalBtn = document.getElementById("addBtn");
  //const span = document.getElementsByClassName("closeModal")[0];

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  let handleSubmit = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("button clickesd");
    let user = JSON.parse(localStorage.getItem("user-info")).user;
    console.log(user.user);

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
      console.log(formattedResponse);

      if (res.status === 200) {
        setTitle("");
        setDescription("");

        alert("A new task has been seccessfully added.");
      } else {
        alert(formattedResponse);
      }
    } catch (error) {
      alert(error);
    }
  };

  function editTask(e) {
    e.stopPropagation();
    e.preventDefault();
  }

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
            const modal = document.getElementById("modal");
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
                const modal = document.getElementById("modal");
                modal.style.display = "none";
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
              <button type="submit" className="saveBtn">
                SAVE TASK
              </button>
            </form>
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
            <h2>to do ({tasks.filter((x) => x.status === "todo").length})</h2>
            {tasks.map((t) => {
              if (t.status === "todo")
                return (
                  <div
                    className="task"
                    id="task1"
                    draggable="true"
                    onDragStart={(event) => {
                      drag(event);
                    }}
                  >
                    <span style={{ fontStyle: "italic" }}>{t.title}</span>{" "}
                    <br />
                    <span style={{ marginLeft: "15px" }}>{t.description}</span>
                    <button
                      className="editBtn"
                      onClick={(e) => {
                        editTask(e);
                      }}
                    >
                      edit task
                    </button>
                  </div>
                );
            })}
            {/* <div
              className="task"
              id="task1"
              draggable="true"
              onDragStart={(event) => {
                drag(event);
              }}
            >
              <span>Task 1 --- </span>
            </div>
            <div
              className="task"
              id="task2"
              draggable="true"
              onDragStart={(event) => {
                drag(event);
              }}
            >
              <span>Task 2 </span>
            </div>
            <div
              className="task"
              id="task3"
              draggable="true"
              onDragStart={(event) => {
                drag(event);
              }}
            >
              <span>Task 3 </span>
            </div> */}
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
            <h2>doing ({tasks.filter((x) => x.status === "doing").length})</h2>
            {tasks.map((t) => {
              if (t.status === "doing")
                return (
                  <div
                    className="task"
                    id="task1"
                    draggable="true"
                    onDragStart={(event) => {
                      drag(event);
                    }}
                  >
                    <span style={{ fontStyle: "italic" }}>{t.title}</span>{" "}
                    <br />
                    <span style={{ marginLeft: "15px" }}>{t.description}</span>
                  </div>
                );
            })}
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
            <h2>done ({tasks.filter((x) => x.status === "done").length})</h2>
            {tasks.map((t) => {
              if (t.status === "done")
                return (
                  <div
                    className="task"
                    id="task1"
                    draggable="true"
                    onDragStart={(event) => {
                      drag(event);
                    }}
                  >
                    <span style={{ fontStyle: "italic" }}>{t.title}</span>{" "}
                    <br />
                    <span style={{ marginLeft: "15px" }}>{t.description}</span>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
      <button
        className="logOutBtn"
        onClick={() => {
          navigate("/");
          localStorage.removeItem("user-info");
        }}
      >
        LOGOUT
      </button>
    </div>
  );
}

export default MainPage;
