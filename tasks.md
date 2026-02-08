# Tasks - Todo List Application
## Implementation Plan of Action

---

## Phase 1: Project Setup
- [ ] Verify Vite + React 19 project is properly configured
- [ ] Clean up default Vite boilerplate files
- [ ] Create `src/components/` directory structure

---

## Phase 2: Base Styling
- [ ] Create `App.css` with CSS variables and design system
  - [ ] Define color palette, typography, spacing
  - [ ] Set up RTL support (`direction: rtl` for Hebrew)
  - [ ] Add base component styles (buttons, inputs, containers)
  - [ ] Add task item styles (checkbox, strikethrough for completed)
  - [ ] Add filter button styles (active state indicator)
  - [ ] Add responsive breakpoints

---

## Phase 3: Component Development

### 3.1 TaskItem.jsx
- [ ] Create functional component with props: `task`, `onToggle`, `onDelete`, `onEdit`
- [ ] Implement checkbox for completion toggle
- [ ] Implement delete button
- [ ] Implement edit mode (local state)
  - [ ] Toggle between view/edit mode
  - [ ] Input field for editing
  - [ ] Save on Enter/blur, cancel on Escape
- [ ] Apply strikethrough styling for completed tasks

### 3.2 TaskList.jsx
- [ ] Create functional component with props: `tasks`, `onToggle`, `onDelete`, `onEdit`
- [ ] Map through tasks array and render `TaskItem` for each
- [ ] Handle empty state (no tasks message)

### 3.3 TaskInput.jsx
- [ ] Create functional component with props: `onAddTask`
- [ ] Implement controlled input with local state
- [ ] Form submit handler
  - [ ] Validate non-empty input
  - [ ] Call `onAddTask` with new task text
  - [ ] Clear input after submission
- [ ] Support Enter key to submit

### 3.4 FilterBar.jsx
- [ ] Create functional component with props: `filter`, `onFilterChange`, `activeCount`, `completedCount`, `onClearCompleted`
- [ ] Render 3 filter buttons: All, Active, Completed
- [ ] Apply active class to current filter button
- [ ] Display "X items left" counter
- [ ] Implement "Clear Completed" button
  - [ ] Hide/disable when no completed tasks

---

## Phase 4: App.jsx - State Management

### 4.1 State Setup
- [ ] Define `tasks` state with `useState` (array of task objects)
- [ ] Define `filter` state with `useState` ('all' | 'active' | 'completed')

### 4.2 LocalStorage Persistence
- [ ] `useEffect` to load tasks from LocalStorage on mount
  - [ ] Handle empty/invalid JSON gracefully
- [ ] `useEffect` to save tasks to LocalStorage when tasks change

### 4.3 CRUD Handlers
- [ ] `handleAddTask(text)` - Create new task with `crypto.randomUUID()`
- [ ] `handleToggleTask(id)` - Toggle completed status
- [ ] `handleDeleteTask(id)` - Remove task by ID
- [ ] `handleEditTask(id, newText)` - Update task text

### 4.4 Derived State
- [ ] Compute `filteredTasks` based on current filter
- [ ] Compute `activeCount` (tasks where `completed: false`)
- [ ] Compute `completedCount` (tasks where `completed: true`)

### 4.5 Filter & Clear Handlers
- [ ] `handleFilterChange(filterType)` - Update filter state
- [ ] `handleClearCompleted()` - Remove all completed tasks

### 4.6 Component Composition
- [ ] Render `TaskInput` with `onAddTask` prop
- [ ] Render `FilterBar` with filter props
- [ ] Render `TaskList` with filtered tasks and handlers

---

## Phase 5: Integration & Polish
- [ ] Wire all components together in App.jsx
- [ ] Test all CRUD operations
- [ ] Test filter functionality
- [ ] Test LocalStorage persistence (refresh browser)
- [ ] Test RTL layout with Hebrew text

---

## Phase 6: Verification & QA
- [ ] Check for console errors/warnings
- [ ] Verify all acceptance criteria from PRD
- [ ] Test edge cases:
  - [ ] Empty task submission (should be prevented)
  - [ ] Very long task text
  - [ ] Rapid add/delete operations
  - [ ] LocalStorage with corrupted data
- [ ] Cross-browser testing (if applicable)

---

## Execution Order

```
1. Phase 1: Project Setup
2. Phase 2: Base Styling (App.css)
3. Phase 3.1: TaskItem.jsx
4. Phase 3.2: TaskList.jsx  
5. Phase 3.3: TaskInput.jsx
6. Phase 3.4: FilterBar.jsx
7. Phase 4: App.jsx (integrate all)
8. Phase 5: Integration & Polish
9. Phase 6: Verification & QA
```

---

## Dependencies Graph

```
App.jsx
├── TaskInput.jsx (no dependencies)
├── FilterBar.jsx (no dependencies)
└── TaskList.jsx
    └── TaskItem.jsx
```

> **Note:** Build from leaf components up (TaskItem → TaskList → App integration)
