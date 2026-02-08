import { useState } from 'react';

/**
 * TaskItem Component
 * Renders a single task with toggle, edit, and delete functionality
 * 
 * @param {Object} props
 * @param {Object} props.task - Task object { id, text, completed }
 * @param {Function} props.onToggle - Handler for toggling completion status
 * @param {Function} props.onDelete - Handler for deleting the task
 * @param {Function} props.onEdit - Handler for editing task text
 */
function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    // Handle entering edit mode
    const handleEditStart = () => {
        setEditText(task.text);
        setIsEditing(true);
    };

    // Handle saving the edit
    const handleEditSave = () => {
        const trimmedText = editText.trim();
        if (trimmedText && trimmedText !== task.text) {
            onEdit(task.id, trimmedText);
        }
        setIsEditing(false);
    };

    // Handle canceling the edit
    const handleEditCancel = () => {
        setEditText(task.text);
        setIsEditing(false);
    };

    // Handle keyboard events in edit mode
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEditSave();
        } else if (e.key === 'Escape') {
            handleEditCancel();
        }
    };

    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            {/* Checkbox for toggling completion */}
            <button
                className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                onClick={() => onToggle(task.id)}
                aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            />

            {/* Task content - either edit input or display text */}
            <div className="task-content">
                {isEditing ? (
                    <input
                        type="text"
                        className="task-edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleEditSave}
                        autoFocus
                    />
                ) : (
                    <span className="task-text">{task.text}</span>
                )}
            </div>

            {/* Action buttons - only show when not editing */}
            {!isEditing && (
                <div className="task-actions">
                    <button
                        className="btn btn-ghost btn-icon"
                        onClick={handleEditStart}
                        aria-label="Edit task"
                        title="Edit"
                    >
                        ✏️
                    </button>
                    <button
                        className="btn btn-ghost btn-icon"
                        onClick={() => onDelete(task.id)}
                        aria-label="Delete task"
                        title="Delete"
                    >
                        🗑️
                    </button>
                </div>
            )}
        </li>
    );
}

export default TaskItem;
