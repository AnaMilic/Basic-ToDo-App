import { React, useState, useEffect, Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TaskCard from "./TaskCard";
import AddNewTaskModal from "./AddNewTaskModal";
import EditTaskModal from "./EditTaskModal";
import TaskColumn from "./TaskColumn";

function MainPage() {
  const navigate = useNavigate();

  const url = "http://localhost:5050/api/tasks/getByEmail";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const [editingTask, setEditingTask] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  let [userLogined, setUserLogined] = useState(
    JSON.parse(localStorage.getItem("user-info")).user
  );

  const editModalRef = useRef(null);
  const addModalRef = useRef(null);

  const fetchInfo = () => {
    return axios
      .get(url, {
        params: {
          user: userLogined,
        },
      })
      .then((response) => {
        response.data.forEach((task) => {
          switch (task.status) {
            case "done":
              setDoneTasks((currentValue) => {
                return [...currentValue, task];
              });
              break;
            case "doing":
              setDoingTasks((currentValue) => {
                return [...currentValue, task];
              });
              break;
            case "todo":
              setTodoTasks((currentValue) => {
                return [...currentValue, task];
              });
              break;
            default:
              break;
          }
        });
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
    let data = ev.dataTransfer.getData("text");
    console.log({ ev, data });
    ev.currentTarget.appendChild(document.getElementById(data));
  }

  useEffect(() => {
    function outsideModalClick(event) {
      if (event.target === addModalRef.current) {
        setIsAddModalVisible(false);
      }
      if (event.target === editModalRef.current) {
        setEditingTask(null);
      }
    }

    window.addEventListener("click", outsideModalClick);

    return () => {
      window.removeEventListener("click", outsideModalClick);
    };
  }, []);

  const renderTable = () => (
    <div className="toDoList">
      <TaskColumn
        borderTopColor="#ff5659"
        onDrop={(event) => {
          drop(event);
        }}
        onDragOver={(event) => {
          allowDrop(event);
        }}
      >
        <h2>to do ({todoTasks.length})</h2>
        {todoTasks.map((t) => {
          return (
            <TaskCard
              title={t.title}
              description={t.description}
              taskId={t._id}
              onDragStart={(event) => {
                drag(event);
              }}
              renderButton={() => (
                <button
                  className="editBtn"
                  onClick={() => {
                    // modalEdit.style.display = "block"
                    setEditingTask(t);
                  }}
                >
                  edit task
                </button>
              )}
            />
          );
        })}
      </TaskColumn>
      <TaskColumn
        borderTopColor="#ffff80"
        onDrop={(event) => {
          drop(event);
        }}
        onDragOver={(event) => {
          allowDrop(event);
        }}
      >
        <h2>doing ({doingTasks.length})</h2>
        {doingTasks.map((t) => {
          return (
            <TaskCard
              title={t.title}
              description={t.description}
              taskId={t._id}
              onDragStart={(event) => {
                drag(event);
              }}
            />
          );
        })}
      </TaskColumn>
      <TaskColumn
        borderTopColor="#99ff99"
        onDrop={(event) => {
          drop(event);
        }}
        onDragOver={(event) => {
          allowDrop(event);
        }}
      >
        <h2>done ({doneTasks.length})</h2>
        {doneTasks.map((t) => {
          return (
            <TaskCard
              title={t.title}
              description={t.description}
              taskId={t._id}
              onDragStart={(event) => {
                drag(event);
              }}
            />
          );
        })}
      </TaskColumn>
    </div>
  );

  return (
    <Fragment>
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          setEditingTask={setEditingTask}
          ref={editModalRef}
        />
      )}
      {isAddModalVisible && (
        <AddNewTaskModal
          setTodoTasks={setTodoTasks}
          ref={addModalRef}
          setIsModalVisible={setIsAddModalVisible}
        />
      )}
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
              setIsAddModalVisible(true);
            }}
          >
            ADD NEW TASK
          </button>
          {renderTable()}
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
    </Fragment>
  );
}

export default MainPage;
