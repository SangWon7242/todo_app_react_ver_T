import React, { useState } from "react";
import { produce } from "immer";
import "./App.css";

const TodoForm = ({ todoStatus }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const addTodo = () => {
    if (newTodoTitle.trim().length === 0) return;

    const title = newTodoTitle.trim();

    todoStatus.addTodo(title);
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

const TodoListItem = ({ todo, todoStatus }) => {
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);
  const [editMode, setEditMode] = useState(false);

  const removeTodo = () => {
    todoStatus.removeTodo(todo.id);
  };

  const modifyTodo = () => {
    if (newTodoTitle.trim().length === 0) return;

    todoStatus.modifyTodo(todo.id, newTodoTitle.trim());
    setEditMode(false);
  };

  const changeEditMode = () => {
    setEditMode(true);
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setNewTodoTitle(todo.title);
  };

  return (
    <li className="flex gap-2">
      <span className="badge badge-outline badge-primary">{todo.id}</span>
      {editMode ? (
        <>
          <div className="inline-flex gap-2">
            <input
              className="input input-bordered"
              type="text"
              placeholder="할 일을 입력해주세요."
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
            />
            <button
              className="btn btn-outline btn-primary"
              onClick={modifyTodo}
            >
              수정완료
            </button>
            <button
              className="btn btn-outline btn-accent"
              onClick={cancelEditMode}
            >
              수정취소
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <button
            className="btn btn-outline btn-primary"
            onClick={changeEditMode}
          >
            수정
          </button>
        </>
      )}

      <button className="btn btn-outline btn-secondary" onClick={removeTodo}>
        삭제
      </button>
    </li>
  );
};

const TodoList = ({ todoStatus }) => {
  const todos = todoStatus.todos;

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
                  todoStatus={todoStatus}
                />
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

const useTodoStatus = () => {
  const [todos, setTodos] = useState([]);
  const [lastTodoId, setLastTodoId] = useState(0);

  const addTodo = (title) => {
    const id = lastTodoId + 1;

    const newTodo = {
      id,
      title,
    };

    // setTodos([...todos, newTodo]);

    // immer 적용
    const newTodos = produce(todos, (draft) => {
      draft.push(newTodo);
    });

    setTodos(newTodos);

    setLastTodoId(newTodo.id);
  };

  const removeTodo = (id) => {
    // const newTodos = todos.filter((todo) => todo.id !== id);

    // immer 적용
    const newTodos = produce(todos, (draft) => {
      const index = draft.findIndex((todo) => todo.id === id);
      draft.splice(index, 1);
    });

    setTodos(newTodos);
  };

  const modifyTodo = (id, title) => {
    /*
    const newTodos = todos.map((todo) =>
      todo.id !== id ? todo : { ...todo, title }
    );
    */

    // immer 적용
    const newTodos = produce(todos, (draft) => {
      const index = draft.findIndex((todo) => todo.id === id);
      draft[index].title = title;
    });

    setTodos(newTodos);
  };

  return {
    todos,
    addTodo,
    removeTodo,
    modifyTodo,
  };
};

function App() {
  const todoStatus = useTodoStatus(); // 리액트 커스텀 훅

  return (
    <>
      <TodoForm todoStatus={todoStatus} />
      <TodoList todoStatus={todoStatus} />
    </>
  );
}

export default App;
