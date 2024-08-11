import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import getToken from "../auth.Service";


const Card = () => {
  const [todo, setTodo] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [resolved, setResolved] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();

      try {
        const response = await axios.get(
          "http://localhost:5000/api/tasks/getAll",
          {
            headers: {
              Authorization: `jwt ${token}`,
            },
          }
        );
        const data = response.data.data;
        setTodo(data.filter((task) => task.status === "new"));
        setOngoing(data.filter((task) => task.status === "ongoing"));
        setResolved(data.filter((task) => task.status === "done"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same droppable
      const items = Array.from(
        source.droppableId === "Todo"
          ? todo
          : source.droppableId === "Ongoing"
          ? ongoing
          : resolved
      );
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);

      if (source.droppableId === "Todo") setTodo(items);
      else if (source.droppableId === "Ongoing") setOngoing(items);
      else if (source.droppableId === "Resolved") setResolved(items);
    } else {
      // Moving between different droppables
      const sourceItems = Array.from(
        source.droppableId === "Todo"
          ? todo
          : source.droppableId === "Ongoing"
          ? ongoing
          : resolved
      );
      const destinationItems = Array.from(
        destination.droppableId === "Todo"
          ? todo
          : destination.droppableId === "Ongoing"
          ? ongoing
          : resolved
      );
      const [movedItem] = sourceItems.splice(source.index, 1);

      // Update the status of the moved item
      movedItem.status =
        destination.droppableId === "Todo"
          ? "new"
          : destination.droppableId === "Ongoing"
          ? "ongoing"
          : "done";

      destinationItems.splice(destination.index, 0, movedItem);

      // Update state based on droppableId
      if (source.droppableId === "Todo") setTodo(sourceItems);
      else if (source.droppableId === "Ongoing") setOngoing(sourceItems);
      else if (source.droppableId === "Resolved") setResolved(sourceItems);

      if (destination.droppableId === "Todo") setTodo(destinationItems);
      else if (destination.droppableId === "Ongoing") setOngoing(destinationItems);
      else if (destination.droppableId === "Resolved") setResolved(destinationItems);
    }
  };

  return (
    <div id="main" className="flex space-x-8 justify-center">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-8 justify-center">
        <div className="bg-slate-600 space-y-3 flex-row border rounded-3xl p-4 pt-5 overflow-y-auto max-h-216">
          <p className="border rounded-3xl w-72 backdrop-blur bg-blue-300">
            To Do
          </p>
          <Droppable droppableId="Todo" type="group">
            {(provided) => (
              <div
                className="space-y-3"
                {...provided.droppableProps}
                ref={provided.innerRef}
                id="Todo"
              >
                {todo.map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        draggable="true"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={task._id}
                        className="flex-row border rounded-lg justify-center content-start h-20"
                      >
                        <h3>{task.title}</h3>
                        <p>Title: {task.title}</p>
                        <p>Status: {task.status}</p>
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
          <p className="border rounded-3xl w-72 backdrop-blur bg-yellow-300">
            Ongoing
          </p>
          <Droppable droppableId="Ongoing" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}
              id="Ongoing"
              >
                {ongoing.map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        draggable="true"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={task._id}
                        className="flex-row border rounded-lg justify-center content-start h-20"
                      >
                        <h3>{task.title}</h3>
                        <p>Title: {task.title}</p>
                        <p>Status: {task.status}</p>
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
          <p className="border rounded-3xl w-72 backdrop-blur bg-green-300">
            Resolved
          </p>
          <Droppable droppableId="Resolved" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}
              id="Resolved">
                {resolved.map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        draggable="true"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={task._id}
                        className="flex-row border rounded-lg justify-center content-start h-20"
                      >
                        <h3>{task.title}</h3>
                        <p>Title: {task.title}</p>
                        <p>Status: {task.status}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        </div>
        
      </DragDropContext>
    </div>
  );
};

export default Card;