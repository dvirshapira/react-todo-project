import TaskItem from './TaskItem';

/**
 * TaskList Component
 * Renders the list of tasks or an empty state message
 * 
 * @param {Object} props
 * @param {Array} props.tasks - Array of task objects
 * @param {Function} props.onToggle - Handler for toggling task completion
 * @param {Function} props.onDelete - Handler for deleting a task
 * @param {Function} props.onEdit - Handler for editing a task
 */
function TaskList({ tasks, onToggle, onDelete, onEdit }) {
    // Show empty state if no tasks
    if (!tasks || tasks.length === 0) {
        return (
            <div className="task-list-empty">
                <p>📝 No tasks yet. Add one above!</p>
            </div>
        );
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

export default TaskList;
