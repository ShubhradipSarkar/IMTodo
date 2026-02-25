"use client";

import { useState, useEffect } from "react";

const USERS = [
  "Ronak",
  "Ashok",
  "Hemant",
  "Shubhra",
  "Pankaj",
  "Adarsh"
];

export default function Home() {

  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  async function loadTodos() {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function addTodo() {

    if (!text.trim()) return;

    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({
        text,
        user
      })
    });

    setText("");
    loadTodos();
  }
function formatIST(dateString) {

  return new Date(dateString).toLocaleString("en-IN", {

    timeZone: "Asia/Kolkata",

    dateStyle: "medium",

    timeStyle: "short"

  });

}
  async function completeTodo(id) {

    await fetch("/api/todos/complete", {
      method: "POST",
      body: JSON.stringify({
        id,
        user
      })
    });

    loadTodos();
  }

  // USER SELECT SCREEN

  if (!user) {

    return (

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 text-black">

        <div className="bg-white w-full max-w-sm rounded-2xl shadow p-6">

          <h1 className="text-2xl font-bold text-center mb-6">
            Select User
          </h1>

          <div className="grid grid-cols-2 gap-3">

            {USERS.map(u => (

              <button
                key={u}
                onClick={() => setUser(u)}
                className="bg-blue-500 active:scale-95 transition text-white p-3 rounded-xl font-medium"
              >
                {u}
              </button>

            ))}

          </div>

        </div>

      </div>

    );

  }


  // MAIN APP

  return (

    <div className="min-h-screen bg-gray-100 p-4 text-gray-700">

      <div className="max-w-md mx-auto">

        {/* Header */}

        <div className="bg-white rounded-2xl shadow p-4 mb-4">

          <h1 className="text-xl font-bold">
            Welcome, {user}
          </h1>

        </div>


        {/* Add Todo */}

        <div className="bg-white rounded-2xl shadow p-4 mb-4 flex gap-2">

          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter todo..."
            className="flex-1 border rounded-xl p-2 outline-none"
          />

          <button
            onClick={addTodo}
            className="bg-blue-500 active:scale-95 text-white px-4 rounded-xl font-medium"
          >
            Add
          </button>

        </div>


        {/* Todo List */}

        <div className="space-y-3">

          {todos.map(todo => (

            <div
              key={todo.id}
              className={`rounded-2xl shadow p-4

              ${todo.completed
                ? "bg-green-100"
                : "bg-white"}

              `}
            >

              <div className="font-bold text-lg">

                {todo.text}

              </div>

              <div className="text-sm text-gray-500 mt-1">

  Added by {todo.createdBy} at {formatIST(todo.createdAt)}



</div>


              {todo.completed

                ?

                <div className="text-green-700 text-sm mt-2 font-medium">

                  Completed by {todo.completedBy}

                </div>

                :

                <button

                  onClick={() => completeTodo(todo.id)}

                  className="bg-green-500 active:scale-95 text-white px-3 py-1 rounded-lg mt-3 text-sm"

                >

                  Complete

                </button>

              }

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}