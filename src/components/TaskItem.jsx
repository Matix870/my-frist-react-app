const TaskItem = ({ task, onDelete, onToggle }) => {
  const backgroundColor = task.color || "#f9f9f9";

  const getContrast = (hex) => {
    const normalized = hex.replace("#", "");
    const r = parseInt(normalized.substring(0, 2), 16);
    const g = parseInt(normalized.substring(2, 4), 16);
    const b = parseInt(normalized.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#111827" : "#f8fafc";
  };

  const textColor = task.completed ? "#6b7280" : getContrast(backgroundColor);

  return (
    <li className="task-item" style={{ backgroundColor }}>
      <div className="task-item-top">
        <label className="task-toggle-label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle?.(task.id)}
            className="task-checkbox"
          />
          <span
            className="task-title"
            style={{
              color: textColor,
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.emoji ? <span className="task-emoji">{task.emoji}</span> : null}
            {task.text}
          </span>
        </label>

        {onDelete ? (
          <button
            onClick={() => onDelete(task.id)}
            className="task-delete-button"
            title="Usun zadanie"
            type="button"
          >
            X
          </button>
        ) : null}
      </div>

      {task.description ? (
        <p className="task-description" style={{ color: textColor }}>
          {task.description}
        </p>
      ) : null}
    </li>
  );
};

export default TaskItem;
