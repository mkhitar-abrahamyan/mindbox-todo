import React, { useState, useMemo } from 'react';

import './styles/App.css';
import { Todo, Filter } from './types/types';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';

let nextId = 1;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  /** Adding new item */
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = { id: nextId++, text, completed: false };
    setTodos([...todos, newTodo]);
  };

  /** Checkbox control */
  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  /** Removing completed task */
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  /** Visual filter for tasks */
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter((todo) => !todo.completed);
      case Filter.Completed:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  /** Active tasks amount */
  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="app">
      <h1 className="title">todos</h1>
      <div className="todo-container">
        <TodoInput onAdd={handleAddTodo} />
        <TodoList todos={filteredTodos} onToggle={handleToggleTodo} />
        <div className="footer">
          <span>{activeCount} items left</span>
          <FilterButtons currentFilter={filter} setFilter={setFilter} />
          <button
            onClick={handleClearCompleted}
            disabled={todos.every((todo) => !todo.completed)}
            className="clear-button"
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
