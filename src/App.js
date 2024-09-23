import React, { useState } from "react";
import "./App.css";

const TodoFrom = ({ addTodo: _addTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const addTodo = () => {
    if (newTodoTitle.trim().length === 0) return;

    const title = newTodoTitle.trim();

    _addTodo(title);
    setNewTodoTitle("");
  };

  return (
    <div className="inline-flex gap-2">
      <input
        className="input input-bordered"
        type="text"
        placeholder="할 일을 입력해주세요."
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button className="btn btn-primary" onClick={addTodo}>
        등록
      </button>
    </div>
  );
};

const TodoListItem = ({ todo, removeTodo: _removeTodo }) => {
  const removeTodo = () => {
    _removeTodo(todo.id);
  };

  return (
    <li className="flex gap-2">
      <span className="badge badge-outline badge-primary">{todo.id}</span>
      <span>{todo.title}</span>
      <button className="btn btn-secondary" onClick={removeTodo}>
        삭제
      </button>
    </li>
  );
};

const TodoList = ({ todos, removeTodo }) => {
  return (
    <>
      {todos.length === 0 ? (
        <h1 className="mt-3 text-2xl">새 할일 생성</h1>
      ) : (
        <>
          <h1 className="mt-3 text-2xl">== 새 할일 ==</h1>
          <nav className="mt-3">
            <ul>
              {todos.map((todo) => (
                <TodoListItem
                  key={todo.id}
                  todo={todo}
                  removeTodo={removeTodo}
                />
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

function App() {
  const [todos, setTodos] = useState([]);
  const [lastTodoId, setLastTodoId] = useState(0);

  const addTodo = (title) => {
    const id = lastTodoId + 1;

    const newTodo = {
      id,
      title,
    };

    setTodos([...todos, newTodo]);
    setLastTodoId(newTodo.id);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <TodoFrom addTodo={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} />
    </>
  );
}

export default App;
