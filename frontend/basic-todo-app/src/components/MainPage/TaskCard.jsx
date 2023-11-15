import React, { Fragment } from "react";

const TaskCard = ({
  taskId,
  onDragStart,
  title,
  description,
  renderButton = () => {},
}) => (
  <div className="task" id={taskId} draggable="true" onDragStart={onDragStart}>
    <span style={{ fontStyle: "italic" }}>{title}</span> <br />
    <span style={{ marginLeft: "15px" }}>{description}</span>
    {renderButton()}
  </div>
);

export default TaskCard;
