/**
 * FilterBar Component
 * Controls filtering and displays task statistics
 * 
 * @param {Object} props
 * @param {string} props.filter - Current active filter ('all' | 'active' | 'completed')
 * @param {Function} props.onFilterChange - Handler for changing filter
 * @param {number} props.activeCount - Count of active (incomplete) tasks
 * @param {number} props.completedCount - Count of completed tasks
 * @param {Function} props.onClearCompleted - Handler for clearing completed tasks
 * @param {Function} props.onDeleteAll - Handler for deleting all tasks
 * @param {Function} props.onMarkAllCompleted - Handler for marking all tasks as completed
 */
function FilterBar({
    filter,
    onFilterChange,
    activeCount,
    completedCount,
    onClearCompleted,
    onDeleteAll,
    onMarkAllCompleted
}) {
    const filters = [
        { id: 'all', label: 'הכל / All' },
        { id: 'active', label: 'פעיל / Active' },
        { id: 'completed', label: 'הושלם / Completed' }
    ];

    return (
        <div className="filter-bar">
            {/* Active tasks counter */}
            <span className="filter-count">
                {activeCount} {activeCount === 1 ? 'item' : 'items'} left
            </span>

            {/* Filter buttons */}
            <div className="filter-buttons">
                {filters.map((f) => (
                    <button
                        key={f.id}
                        className={`filter-btn ${filter === f.id ? 'active' : ''}`}
                        onClick={() => onFilterChange(f.id)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Clear completed button */}
            <button
                className="clear-completed-btn"
                onClick={onClearCompleted}
                disabled={completedCount === 0}
            >
                Clear Completed
            </button>

            {/* Extra action buttons */}
            <div className="filter-actions-extra">
                <button
                    className="btn btn-primary"
                    onClick={onMarkAllCompleted}
                    disabled={activeCount === 0}
                >
                    ✓ Mark All
                </button>
                <button
                    className="btn btn-danger"
                    onClick={onDeleteAll}
                >
                    🗑️ Delete All
                </button>
            </div>
        </div>
    );
}

export default FilterBar;

