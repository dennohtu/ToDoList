import React, { useState,useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios"

const Card = () => {
const [todo, setTodo]= useState([])
const [ongoing, setOngoing] = useState([])
const [resolved, setResolved] = useState([])
const [error ,setError]=useState()
useEffect(() => {
  const fetchData = async () => {
    // const API = axios({
    //   baseURL: "http://localhost:5000/",
    //   withCredentials: true,
    // });

    try {
      const response = await axios.get("http://localhost:5000/api/tasks/getAll"); 
      const data = response.data;
console.log(data)
      // Assuming data is an array of tasks with a `completed` status
      setTodo(data.filter((task) => task.completed === "new"));
      setOngoing(data.filter((task) => task.completed === "ongoing"));
      setResolved(data.filter((task) => task.completed === "done"));
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);

  

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedTodo = Array.from(todo);
    const [movedItem] = updatedTodo.splice(source.index, 1);
    updatedTodo.splice(destination.index, 0, movedItem);

    setTodo(updatedTodo);
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
                {todo
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
                {todo
                 
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
                {todo
                  
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
