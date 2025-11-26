import { useState, useEffect, use } from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFinished, setShowFinished] = useState(true);

  const toggleFinshed = () => {
    setShowFinished(!showFinished);
  };

  // Load todos from localStorage on mount
  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    if (todosString) {
      const parsedTodos = JSON.parse(todosString);
      setTodos(parsedTodos);
    }
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever todos changes (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };
  const handleEdit = (id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    setTodos(todos.filter((item) => item.id !== id));
  };
  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.id;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleClear = () => {
    setTodos([]);
  };
  return (
    <>
      <Navbar />
      <div className="md:container  m-3 md:mx-auto my-5 bg-violet-200 rounded-xl p-5 min-h-[80vh] md:w-1/2 relative">
        <div className="addTodo ">
          <h1 className="font-bold text-center text-xl mb-10 font-sans">
            UrTodo - Manage your todo in one place
          </h1>
          <h2 className="font-bold text-lg">Add To-do</h2>
          
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className="border-2 px-5 rounded-lg m-3 w-full mx-auto"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 1}
              className="bg-violet-500 cursor-pointer disabled:bg-violet-500 hover:bg-violet-600 rounded-lg py-1 font-bold text-white mx-auto w-full"
            >
              Save
            </button>
          
        </div>
        <input
          onChange={toggleFinshed}
          type="checkbox"
          name=""
          id=""
          checked={showFinished}
        />{" "}
        show completed todos
        <h2 className="text-lg font-bold  self-center">Your Todos :-</h2>
        <div className="todos bg-violet-100 p-5 rounded-lg min-h-[30vh] relative  ">
          {todos.length === 0 && <h3 className="m-5">No todos to display</h3>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  className="todo flex justify-between md:min-w-1/2 my-3"
                  key={item.id}
                >
                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      name=""
                      id={item.id}
                      checked={item.isCompleted}
                    />
                    <div className={`${item.isCompleted ? "line-through" : ""} max-w-[90%]`}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                      className="bg-violet-500 cursor-pointer hover:bg-violet-600 rounded-lg p-2 py-1 font-bold text-white mx-1 "
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-violet-500 cursor-pointer hover:bg-violet-600 rounded-lg p-2 py-1 font-bold text-white mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="clear mt-6 flex items-center justify-center bg-violet-300 p-3 rounded-lg w-full">
          <h3 className="font-bold my-3">
            Total: {todos.length} | Completed:{" "}
            {todos.filter((t) => t.isCompleted).length} | Remaining:{" "}
            {todos.filter((t) => !t.isCompleted).length}
          </h3>
          <button
            onClick={handleClear}
            className="bg-violet-500 cursor-pointer hover:bg-violet-600 rounded-lg p-2 py-1 font-bold text-white mx-10"
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
