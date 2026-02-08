import { useState } from 'react';

/**
 * TaskInput Component
 * Form for creating new tasks with validation
 * 
 * @param {Object} props
 * @param {Function} props.onAddTask - Handler for adding a new task
 */
function TaskInput({ onAddTask }) {
    const [text, setText] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedText = text.trim();

        // Validate non-empty input
        if (!trimmedText) {
            return;
        }

        // Call parent handler to add task
        onAddTask(trimmedText);

        // Clear input after successful submission
        setText('');
    };

    return (
        <div className="task-input-container">
            <form className="task-input-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="task-input"
                    placeholder="מה צריך לעשות? / What needs to be done?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    autoFocus
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!text.trim()}
                >
                    הוסף / Add
                </button>
            </form>
        </div>
    );
}

export default TaskInput;
