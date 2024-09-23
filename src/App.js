import React, { useState } from "react";
import "./App.css";

const TodoFrom = ({ addTodo: _addTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const addTodo = () => {
    if (newTodoTitle.trim().length == 0) return;

    const id = 1;
    const todo = newTodoTitle;

    const newTodo = {
      id: null,
      todo,
    };

    _addTodo(newTodo);
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

const TodoList = ({ todos }) => {
  return <>{JSON.stringify(todos)}</>;
};

function App() {
  const [todos, setTodos] = useState([]);
  const [lastTodoId, setLastTodoId] = useState(0);

  const addTodo = (newTodo) => {
    newTodo.id = lastTodoId + 1;
    setTodos([...todos, newTodo]);
    setLastTodoId(newTodo.id);
  };

  return (
    <>
      <TodoFrom addTodo={addTodo} />
      <hr />
      <TodoList todos={todos} />
    </>
  );
}

export default App;
