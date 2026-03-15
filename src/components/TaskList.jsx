import TaskItem from "./TaskItem";

function TaskList({ tasks, onDeleteTask, onToggleTask }) {
  return (
    <section className="task-list-shell">
      {tasks.length === 0 ? (
        <p className="task-list-empty">Brak zadań. Dodaj coś!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onToggle={onToggleTask}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
