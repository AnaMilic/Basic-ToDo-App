import React, { Fragment } from "react";

const TaskCard = ({
  taskId,
  onDragStart,
  title,
  description,
  renderButton = () => {},
  deleteButton = () => {},
}) => (
  <div className="task" id={taskId} draggable="true" onDragStart={onDragStart}>
    <span
      style={{
        fontStyle: "italic",
        inlineSize: "100px",
        overflowWrap: "break-word",
      }}
    >
      {title}
    </span>{" "}
    <br />
    <span
      style={{
        marginLeft: "15px",
        inlineSize: "100px",
        overflowWrap: "break-word",
      }}
    >
      {description}
    </span>
    <br />
    <br />
    {renderButton()}
    {deleteButton()}
  </div>
);

export default TaskCard;
