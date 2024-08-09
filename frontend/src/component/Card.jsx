import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Card = () => {
  const initialTodos = [
    {
      id: "1",
      task: "Respond to client emails",
      priority: "high",
      completed: "Todo",
    },
    {
      id: "2",
      task: "Prepare for team meeting",
      priority: "medium",
      completed: "Todo",
    },
    {
      id: "3",
      task: "Review project proposal",
      priority: "high",
      completed: "Todo",
    },
    {
      id: "4",
      task: "Update project documentation",
      priority: "low",
      completed: "Todo",
    },
    {
      id: "5",
      task: "Send acknowledgment email to Justus",
      priority: "high",
      completed: "Todo",
    },
  ];

  const [todos, setTodos] = useState(initialTodos);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedTodos = Array.from(todos);
    const [movedItem] = updatedTodos.splice(source.index, 1);
    updatedTodos.splice(destination.index, 0, movedItem);

    setTodos(updatedTodos);
  };

  return (
    <div id="main" className="flex space-x-8 justify-center ">
      <DragDropContext onDragEnd={handleDragEnd}> 
        {/* To Do Section */}
        <div className="bg-slate-600 space-y-3 flex-row border rounded-3xl p-4 pt-5 overflow-y-auto max-h-216">
          <p className="border rounded-3xl w-72 backdrop-blur bg-blue-300">To Do</p>
          <Droppable droppableId="Todo" type="group">
            {(provided) => (
              <div
              className="space-y-3" 
              {...provided.droppableProps} 
              ref={provided.innerRef}>
                {todos
                  .filter((todo) => todo.completed === "Todo")
                  .map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          draggable="true"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          id={todo.id}
                          className="flex-row border rounded-lg justify-center content-start h-20"
                        >
                          <h3>{todo.task}</h3>
                          <p>Priority: {todo.priority}</p>
                          <p>Status: {todo.completed}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Ongoing Section */}
        <div className="bg-slate-600 space-y-3 flex-row border rounded-3xl p-4 pt-5">
          <p className="border rounded-3xl w-72 backdrop-blur bg-yellow-300">Ongoing</p>
          <Droppable droppableId="Ongoing" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todos
                  .filter((todo) => todo.completed === "Ongoing")
                  .map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          draggable="true"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          id={todo.id}
                          className="flex-row border rounded-lg justify-center content-start h-20"
                        >
                          <h3>{todo.task}</h3>
                          <p>Priority: {todo.priority}</p>
                          <p>Status: {todo.completed}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Resolved Section */}
        <div className="bg-slate-600 space-y-3 flex-row border rounded-3xl p-4 pt-5">
          <p className="border rounded-3xl w-72 backdrop-blur bg-green-300">Resolved</p>
          <Droppable droppableId="Resolved" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todos
                  .filter((todo) => todo.completed === "Resolved")
                  .map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          draggable="true"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          id={todo.id}
                          className="flex-row border rounded-lg justify-center content-start h-20"
                        >
                          <h3>{todo.task}</h3>
                          <p>Priority: {todo.priority}</p>
                          <p>Status: {todo.completed}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Card;
