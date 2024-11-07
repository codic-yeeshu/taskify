import React, { useState } from "react";
import { FaCheck, FaPencilAlt, FaTrash } from "react-icons/fa";

const Task = ({
  item,
  index,
  handleCheckAndUncheck,
  setUpdateTask,
  handleDeleteTask,
  handleDragOver,
  handleDragStart,
  handleDrop,
}) => {
  const [updating, setUpdating] = useState(false);
  return (
    <div
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(index)}
      key={item._id}
      className="m-2 p-2 border bg-light
                w-100 rounded-3 d-flex justify-content-between
                align-items-center"
    >
      <span className={item.isDone ? "text-decoration-line-through" : ""}>
        {item.taskName}
      </span>

      <div className="">
        <button
          disabled={updating}
          onClick={() => {
            setUpdating(true);
            handleCheckAndUncheck(item);
            setUpdating(false);
          }}
          className="btn btn-success
                            btn-sm me-2"
          type="button"
        >
          {updating ? "..." : <FaCheck />}
        </button>
        <button
          disabled={updating}
          onClick={() => {
            setUpdating(true);
            setUpdateTask(item);
            setUpdating(false);
          }}
          className="btn btn-primary
                            btn-sm me-2"
          type="button"
        >
          {updating ? "..." : <FaPencilAlt />}
        </button>
        <button
          disabled={updating}
          onClick={() => {
            setUpdating(true);
            handleDeleteTask(item._id);
            setUpdating(false);
          }}
          className="btn btn-danger
                            btn-sm me-2"
          type="button"
        >
          {updating ? "..." : <FaTrash />}
        </button>
      </div>
    </div>
  );
};

export default Task;
