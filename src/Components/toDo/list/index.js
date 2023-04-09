import { useState, useEffect, useRef } from "react";

const initialFormValues = { id: "", title: "", completed: false };

function List({ todos, setTodos }) {
  const [form, setForm] = useState(initialFormValues);

  const toggleAllRef = useRef();

  const [filter, setFilter] = useState("all");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    setForm(initialFormValues);
  }, [todos]);

  const onChangeInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (form.title === "") return false;
    const newTodo = { ...form, id: Math.random().toString() };
    setTodos([...todos, newTodo]);
  };

  const handleDelete = (event) => {
    const newTodoList = todos.filter((item) => item.id !== event);
    setTodos(newTodoList);
  };

  const handleCheckboxChange = (event) => {
    const newTodoList = todos.map((item) => {
      if (item.id === event) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(newTodoList);
  };

  const handleToggleAllChange = () => {
    setTodos(
      todos.map((item) => ({
        ...item,
        completed: toggleAllRef.current.checked,
      }))
    );
  };

  const filteredTodos = todos.filter((item) => {
    if (filter === "active") {
      return !item.completed;
    } else if (filter === "completed") {
      return item.completed;
    } else {
      return true;
    }
  });

  const handleClearCompleted = () => {
    const newTodoList = todos.filter((item) => !item.completed);
    setTodos(newTodoList);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            placeholder="What needs to be done?"
            autoFocus
            type="text"
            className="new-todo"
            name="title"
            value={form.title}
            onChange={onChangeInput}
          />
        </div>
      </form>

      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          ref={toggleAllRef}
          onChange={() => handleToggleAllChange()}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {filteredTodos.map((item) => (
            <li key={item.id}>
              <div className="view">
                <input
                  checked={item.completed}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="toggle"
                  type="checkbox"
                />
                <label
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.title}
                </label>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="destroy"
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.length} </strong>left
        </span>
        <ul className="filters">
          <li>
            <a onClick={() => handleFilterChange("all")}>All</a>
          </li>
          <li>
            <a onClick={() => handleFilterChange("active")}>Active</a>
          </li>
          <li>
            <a onClick={() => handleFilterChange("completed")}>Completed</a>
          </li>
        </ul>
        <button className="clear-completed" onClick={handleClearCompleted}>
          Clear completed
        </button>
      </footer>
    </div>
  );
}

export default List;
