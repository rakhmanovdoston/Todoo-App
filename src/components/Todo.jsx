import { useState, useReducer } from "react";

const todoAppTasks = [
  {
    id: 1,
    title: "Initialize Project",
    description:
      "Set up the project structure using a framework (React, Angular, or Vue.js).",
    completed: false,
  },
  {
    id: 2,
    title: "Install Dependencies",
    description: "Add necessary dependencies (e.g., React, Redux, Axios).",
    completed: false,
  },
  {
    id: 3,
    title: "Configure Linters",
    description: "Set up ESLint and Prettier for code quality and formatting.",
    completed: false,
  },

  {
    id: 4,
    title: "Create App Layout",
    description:
      "Design the main layout with a header, main content area, and footer.",
    completed: false,
  },
  {
    id: 5,
    title: "Add Task List Component",
    description: "Create a component to display the list of tasks.",
    completed: false,
  },
];

const TodosApp = () => {
  const [todos, setTodos] = useState(todoAppTasks);
  const [text, setText] = useState("");
  const [doneTasks, setDoneTasks] = useState([]);

  const deleteTodos = (id) => {
    const newTodos = todos.filter((t) => {
      return t.id !== id;
    });
    setTodos(newTodos);
  };

  const addNewTodo = (event) => {
    event.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: text,
      done: false,
    };

    const newTodos = [...todos];
    newTodos.push(newTodo);
    setTodos(newTodos);
    sessionStorage.setItem("newTodo", newTodos);
  };

  const checkBtn = (taskId) => {
    const task = todos.find((t) => t.id === taskId);
    if (task) {
      task.completed = true;
      setDoneTasks([...doneTasks, task]);
      setTodos(todos.filter((t) => t.id !== taskId));
    }
  };

  return (
    <div className=" w-full h-[100vh] flex flex-col bg-[#0D0714] justify-center items-center">
      <div className="w-[583px] h-[758px] p-7 flex flex-col justify-center items-center gap-5">
        <form className="flex space-x-6 p-3 items-center" onSubmit={addNewTodo}>
          <input
            className="w-96 h-10 rounded-xl text-center border-2 border-[#9E78CF]  bg-transparent text-gray-400 outline-none"
            type="text"
            placeholder="Add new Todo"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            className=" w-[40px] h-[32px] bg-[#9E78CF] text-white items-center rounded-md text-xl"
            type="submit"
            onClick={addNewTodo}
          >
            Add
          </button>
        </form>

        <h3 className="text-white "> Tasks to do: {todos.length}</h3>
        <ul className="w-[432px] text-white space-y-3">
          {todos.map((t) => {
            return (
              <li
                key={t.id}
                className=" w-full h-16 bg-[#15101C] flex justify-around items-center text-[#9E78CF]"
              >
                <span>{t.title}</span>
                <div className="flex gap-6">
                  <button onClick={() => checkBtn(t.id)}>
                    <i class="fa-solid fa-check"></i>
                  </button>
                  <button onClick={() => deleteTodos(t.id)}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <h3 className="text-white">Done Tasks: {doneTasks.length}</h3>
        <ul className="w-[432px] text-white space-y-3">
          {doneTasks.map((t) => (
            <li
              key={t.id}
              className="w-full h-16 bg-[#15101C] flex justify-around items-center text-[#78CFB0] line-through"
            >
              <span>{t.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodosApp;
