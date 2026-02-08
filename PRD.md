# Product Requirements Document (PRD)
## Todo List Application

**Version:** 1.0  
**Date:** February 8, 2026  
**Tech Stack:** React 19 + Vite

---

## 1. Overview

A comprehensive, modern Todo List application built with React 19 and Vite. The application follows a modular architecture with functional components and adheres to React best practices. It features full CRUD operations, local persistence, and RTL (Right-to-Left) support for Hebrew text.

---

## 2. Architecture

### Component Structure

```
src/
├── App.jsx          # Container - Global state & LocalStorage sync
├── components/
│   ├── TaskInput.jsx    # Form for new task creation
│   ├── TaskList.jsx     # Renders filtered list of tasks
│   ├── TaskItem.jsx     # Single task with edit/toggle/delete
│   └── FilterBar.jsx    # Filter controls & active task counter
└── App.css          # Styling with RTL support
```

### Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| **App.jsx** | Manage global state (tasks array, filter status), LocalStorage synchronization, pass props down and receive events up |
| **TaskInput.jsx** | Handle new task creation form, validate input, emit task creation event |
| **TaskList.jsx** | Map through filtered tasks, render TaskItem components |
| **TaskItem.jsx** | Display single task, handle edit mode toggle, completion toggle, delete action |
| **FilterBar.jsx** | Control filtering logic (All/Active/Completed), display active tasks counter, "Clear Completed" button |

---

## 3. Functional Requirements

### 3.1 Task Management (CRUD)

| Operation | Description |
|-----------|-------------|
| **Create** | Add new task with unique ID using `crypto.randomUUID()` |
| **Read** | Display all tasks based on current filter |
| **Update** | Edit task text and toggle completion status |
| **Delete** | Remove individual tasks |

### 3.2 Task Data Model

```javascript
{
  id: string,           // crypto.randomUUID()
  text: string,         // Task description
  completed: boolean,   // Completion status
  createdAt: timestamp  // Creation timestamp (optional)
}
```

### 3.3 State Management

- Use `useState` for local component state
- Use `useEffect` for side effects (LocalStorage sync)
- Lift state to `App.jsx` (single source of truth)
- Props flow **down** (parent → child)
- Events/callbacks flow **up** (child → parent)

### 3.4 Filtering

| Filter | Description |
|--------|-------------|
| **All** | Show all tasks |
| **Active** | Show only tasks where `completed: false` |
| **Completed** | Show only tasks where `completed: true` |

- Implement derived state logic for filtering
- Active filter button must be visually distinguished (e.g., `.active` CSS class)

### 3.5 Persistence

- **On Mount:** Load tasks from `LocalStorage` key `"todos"`
- **On Change:** Save tasks to `LocalStorage` whenever tasks array changes
- Handle empty/invalid LocalStorage gracefully

### 3.6 Counter

- Display dynamic "Active tasks remaining" count
- Updates automatically based on tasks with `completed: false`

### 3.7 Bonus Feature

- **"Clear Completed" button:** Removes all tasks where `completed: true`
- Button should be disabled or hidden when no completed tasks exist

---

## 4. Technical Constraints

| Constraint | Requirement |
|------------|-------------|
| Components | Functional components only (no class components) |
| State | No external state management (Redux, Zustand, etc.) |
| Routing | No routing libraries |
| Code Quality | Clean, well-named, no console warnings/errors |
| Styling | Modern CSS with RTL support for Hebrew |

---

## 5. UI/UX Requirements

### 5.1 General

- Intuitive, clean, modern interface
- Responsive layout
- RTL (Right-to-Left) text direction support for Hebrew

### 5.2 Visual Feedback

| State | Visual Indicator |
|-------|------------------|
| Completed task | ~~Strikethrough text~~, muted color |
| Active filter | Highlighted/bordered button |
| Empty input | Prevent submission |
| Task added | Clear input field |

### 5.3 Interactions

- Input clears after adding a task
- Edit mode allows inline text editing
- Confirmation not required for delete (immediate action)
- Smooth transitions/animations (optional enhancement)

---

## 6. Acceptance Criteria

- [ ] App renders without console errors or warnings
- [ ] Can create new tasks with unique IDs
- [ ] Can mark tasks as complete/incomplete
- [ ] Can edit existing task text
- [ ] Can delete individual tasks
- [ ] Tasks persist across browser refresh (LocalStorage)
- [ ] Filter buttons work correctly (All/Active/Completed)
- [ ] Active filter is visually distinguished
- [ ] Active task counter displays correct count
- [ ] "Clear Completed" removes all completed tasks
- [ ] UI supports RTL for Hebrew text
- [ ] Input field clears after task creation
- [ ] Completed tasks show strikethrough styling

---

## 7. Out of Scope (v1.0)

- User authentication
- Backend/database integration
- Task categories/tags
- Due dates/reminders
- Drag-and-drop reordering
- Multi-language i18n (beyond RTL support)
- Dark mode toggle

---

## 8. Future Considerations (v2.0+)

- Drag-and-drop task reordering
- Task priorities (High/Medium/Low)
- Due dates with notifications
- Categories/tags
- Dark/light theme toggle
- Export/import functionality
- Keyboard shortcuts
