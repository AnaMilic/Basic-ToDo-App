import React from "react";

export default function TaskColumn({
  borderTopColor,
  onDrag,
  onDragOver,
  children,
}) {
  return (
    <div
      className="column"
      id="done"
      style={{ borderTopColor }}
      onDrop={onDrag}
      onDragOver={onDragOver}
    >
      {children}
    </div>
  );
}
