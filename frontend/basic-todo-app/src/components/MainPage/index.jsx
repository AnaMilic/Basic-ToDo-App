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

  const todoColRef = useRef();
  const doingColRef = useRef();
  const doneColRef = useRef();

  const [editingTask, setEditingTask] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  let [userLogined, setUserLogined] = useState(
    JSON.parse(localStorage.getItem("user-info")).user
  );

  let tsk = [...todoTasks, ...doingTasks, ...doneTasks];

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

    let t = tsk.find((i) => i._id === data);

    let status = "";
    const oldStatus = t.status;

    if (todoColRef.current.contains(ev.target)) {
      status = "todo";
    }
    if (doingColRef.current.contains(ev.target)) {
      status = "doing";
    }
    if (doneColRef.current.contains(ev.target)) {
      status = "done";
    }

    if (oldStatus === status || status === "") {
      return;
    }

    switch (oldStatus) {
      case "todo":
        setTodoTasks((old) => [...old.filter((oldT) => oldT._id !== t._id)]);
        break;
      case "doing":
        setDoingTasks((old) => [...old.filter((oldT) => oldT._id !== t._id)]);
        break;
      case "done":
        setDoneTasks((old) => [...old.filter((oldT) => oldT._id !== t._id)]);
        break;

      default:
        break;
    }

    switch (status) {
      case "todo":
        setTodoTasks((old) => [...old, t]);
        break;
      case "doing":
        setDoingTasks((old) => [...old, t]);
        break;
      case "done":
        setDoneTasks((old) => [...old, t]);
        break;

      default:
        break;
    }

    editTaskStatus(ev, t, status);
  }

  function editTaskStatus(e, task, status) {
    e.stopPropagation();
    e.preventDefault();

    return axios
      .patch("http://localhost:5050/api/tasks", {
        task: {
          ...task,
          status,
        },
      })
      .then((response) => {
        const updatedTask = response.data;
        switch (updatedTask.status) {
          case "todo":
            setTodoTasks((old) => {
              const filteredOld = old.filter((oldT) => oldT._id !== task._id);
              return [...filteredOld, updatedTask];
            });
            break;
          case "doing":
            setDoingTasks((old) => {
              const filteredOld = old.filter((oldT) => oldT._id !== task._id);
              return [...filteredOld, updatedTask];
            });
            break;
          case "done":
            setDoneTasks((old) => {
              const filteredOld = old.filter((oldT) => oldT._id !== task._id);
              return [...filteredOld, updatedTask];
            });
            break;

          default:
            break;
        }
        //alert("Successful change of task.");
      })
      .catch((err) => alert(`Change of task status failed. Error: ${err}.`))
      .finally(() => setEditingTask(null));
  }

  function deleteTask(t, e) {
    e.stopPropagation();
    e.preventDefault();
    try {
      axios
        .delete("http://localhost:5050/api/tasks", {
          params: t,
        })
        .then((response) => {
          const deletedTask = response.data;
          switch (deletedTask.status) {
            case "todo":
              setTodoTasks((old) => {
                const filteredOld = old.filter((oldT) => oldT._id !== t._id);
                return [...filteredOld];
              });
              break;
            case "doing":
              setDoingTasks((old) => {
                const filteredOld = old.filter((oldT) => oldT._id !== t._id);
                return [...filteredOld];
              });
              break;
            case "done":
              setDoneTasks((old) => {
                const filteredOld = old.filter((oldT) => oldT._id !== t._id);
                return [...filteredOld];
              });
              break;

            default:
              break;
          }
          alert("Successfully deleted task.");
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      console.log(error);
    }
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
        ref={todoColRef}
        id="colToDo"
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
              deleteButton={() => (
                <button
                  className="deleteBtn"
                  onClick={(e) => {
                    if (
                      // eslint-disable-next-line no-restricted-globals
                      !confirm("Are you sure you want to delete this task?")
                    ) {
                      return;
                    } else {
                      deleteTask(t, e);
                    }
                  }}
                >
                  delete task
                </button>
              )}
            />
          );
        })}
      </TaskColumn>
      <TaskColumn
        ref={doingColRef}
        borderTopColor="#ffff80"
        id="colDoing"
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
              renderButton={() => (
                <button
                  className="editBtn"
                  onClick={() => {
                    setEditingTask(t);
                  }}
                >
                  edit task
                </button>
              )}
              deleteButton={() => (
                <button
                  className="deleteBtn"
                  onClick={(e) => {
                    if (
                      // eslint-disable-next-line no-restricted-globals
                      !confirm("Are you sure you want to delete this task?")
                    ) {
                      return;
                    } else {
                      deleteTask(t, e);
                    }
                  }}
                >
                  delete task
                </button>
              )}
            />
          );
        })}
      </TaskColumn>
      <TaskColumn
        ref={doneColRef}
        borderTopColor="#99ff99"
        id="colDone"
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
              renderButton={() => (
                <button
                  className="editBtn"
                  onClick={() => {
                    setEditingTask(t);
                  }}
                >
                  edit task
                </button>
              )}
              deleteButton={() => (
                <button
                  className="deleteBtn"
                  onClick={(e) => {
                    if (
                      // eslint-disable-next-line no-restricted-globals
                      !confirm("Are you sure you want to delete this task?")
                    ) {
                      return;
                    } else {
                      deleteTask(t, e);
                    }
                  }}
                >
                  delete task
                </button>
              )}
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
