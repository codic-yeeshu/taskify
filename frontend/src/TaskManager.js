import React, { useContext, useEffect, useState } from "react";
import { FaPlus, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from "./api";
import { notify } from "./utils";
import { Context } from "./context/context";
import Task from "./components/task";
import ProgressBar from "./components/progressBar";

function TaskManager() {
  const { logout } = useContext(Context);
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState();
  const [completePercentage, setCompletePercentage] = useState(0);

  const handleTask = () => {
    if (updateTask && input) {
      //upadte api call
      // console.log("update api call");
      const obj = {
        taskName: input,
        isDone: updateTask.isDone,
        _id: updateTask._id,
      };
      setUpdateTask(null);
      handleUpdateItem(obj);
    } else if (updateTask === null && input) {
      // console.log("create api call");
      //create api call
      handleAddTask();
    }
    setInput("");
  };

  useEffect(() => {
    if (updateTask) {
      setInput(updateTask.taskName);
    }
  }, [updateTask]);

  useEffect(() => {
    calCompletePercentage();
  }, [tasks]);

  useEffect(() => {
    fetchAllTasks();
    moveCompletedTaskToBottom();
  }, []);

  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };
    try {
      notify("adding task", "warning");
      const { success, message } = await CreateTask(obj);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const fetchAllTasks = async () => {
    try {
      const { data } = await GetAllTasks();
      setTasks(data);
      setCopyTasks(data);
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const moveCompletedTaskToBottom = () => {
    const complete = tasks.filter((item) => item.isDone);
    const incomplete = tasks.filter((item) => !item.isDone);

    setTasks([...incomplete, ...complete]);
  };

  const handleDeleteTask = async (id) => {
    try {
      notify("deleting the task", "warning");
      const { success, message } = await DeleteTaskById(id);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const calCompletePercentage = () => {
    const totalTodo = tasks.length;
    if (totalTodo === 0) {
      setCompletePercentage(0);
      return;
    }

    const completedTodo = tasks.reduce(
      (acc, item) => (item.isDone ? acc + 1 : acc),
      0
    );
    const percentage = Math.floor((completedTodo / totalTodo) * 100);
    setCompletePercentage(percentage);
  };

  const handleCheckAndUncheck = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: !isDone,
    };
    try {
      notify(
        isDone ? "Marking as incomplete" : "Marking as complete",
        "warning"
      );
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        //show success toast
        notify(message, "success");
        moveCompletedTaskToBottom();
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const handleUpdateItem = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: isDone,
    };
    try {
      notify("updating task", "warning");
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const oldTasks = [...copyTasks];
    const results = oldTasks.filter((item) =>
      item.taskName.toLowerCase().includes(term)
    );
    setTasks(results);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    const newTodos = [...tasks];
    const [removedItem] = newTodos.splice(draggedIndex, 1);

    // Insert the dragged item at the new position
    newTodos.splice(index, 0, removedItem);

    // Update the state with the new array
    setTasks(newTodos);
  };

  return (
    <div
      className="d-flex flex-column align-items-center
        w-50 m-auto mt-5"
    >
      <h1 className="mb-4">Taskify App</h1>

      <button
        className="btn btn-danger position-absolute top-0 end-0 m-3"
        onClick={logout} // Trigger logout on click
      >
        <FaSignOutAlt /> Logout
      </button>
      {/* Input and Search box */}
      <div
        className="d-flex justify-content-between
            align-items-center mb-4 w-100"
      >
        <div className="input-group flex-grow-1 me-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control me-1"
            placeholder="Add a new Task"
          />
          <button onClick={handleTask} className="btn btn-success btn-sm me-2">
            <FaPlus className="m-2" />
          </button>
        </div>

        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            onChange={handleSearch}
            className="form-control"
            type="text"
            placeholder="Search tasks"
          />
        </div>
      </div>

      {tasks.length > 0 ? (
        <ProgressBar percentage={completePercentage} />
      ) : null}

      {/* List of items */}
      <div className="d-flex flex-column w-100">
        {tasks.length > 0 ? (
          tasks.map((item, index) => (
            <Task
              item={item}
              index={index}
              handleCheckAndUncheck={handleCheckAndUncheck}
              setUpdateTask={setUpdateTask}
              handleDeleteTask={handleDeleteTask}
              handleDragOver={handleDragOver}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
            />
          ))
        ) : (
          <p>No tasks to show...</p>
        )}
      </div>

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default TaskManager;
