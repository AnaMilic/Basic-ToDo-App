import React, { forwardRef } from "react";

const TaskColumn = (
  { borderTopColor, id, onDrop, onDragOver, children },
  ref
) => {
  return (
    <div
      ref={ref}
      className="column"
      id={id}
      style={{ borderTopColor }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {children}
    </div>
  );
};

export default forwardRef(TaskColumn);
