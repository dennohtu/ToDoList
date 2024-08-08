import React from "react";

const Card = () => {
  const Todo = [
    {
      id: 1,
      task: "Respond to client emails",
      priority: "high",
      completed:"Todo",
    },
    {
      id: 2,
      task: "Prepare for team meeting",
      priority: "medium",
      completed:"Todo",
    },
    {
      id: 3,
      task: "Review project proposal",
      priority: "high",
      completed:"Todo",
    },
    {
      id: 4,
      task: "Update project documentation",
      priority: "low",
      completed: "Todo",
    },
    {
      id: 5,
      task: "Send acknowledgment email to Justus",
      priority: "high",
      completed: "Todo",
    },
  ];

  return (
    <>
      <div
        id="main"
        className="flex min-h-screen  max-w-screen-lg justify-center space-x-80 "
      >
        <div className="bg-emerald-400">
          <p className="border rounded-3xl w-72 backdrop-blur bg-blue-300 ">
            To do
          </p>
          <div className="flex-row ">
            {Todo.map((todos) => (
              <div key={todos} id="todo-item" className="flex-row border rounded-lg justify-center content-start h-20 " >
                <h3>
                  {todos.task}
                </h3>
                <p>Priority : {todos.priority}</p>
                <p>Status: {todos.completed}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-emerald-400">
          <p className="border rounded-3xl w-72 backdrop-blur bg-blue-300 ">
            Ongoing
          </p>
        </div>
        <div className="bg-emerald-400 ">
          <p className="border rounded-3xl w-72 backdrop-blur bg-blue-300 ">
            Resolved
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
