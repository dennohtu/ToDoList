import axios from "axios";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdAutoDelete, MdEdit } from "react-icons/md";
import { SuccessToast, ErrorToast, LoadingToast, ToasterContainer } from "../Toaster";

const Card = ({
  todo,
  ongoing,
  resolved,
  setTodo,
  setOngoing,
  setResolved,
  fetchData,
}) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
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
      movedItem.status =
        destination.droppableId === "Todo"
          ? "new"
          : destination.droppableId === "Ongoing"
            ? "ongoing"
            : "done";

      destinationItems.splice(destination.index, 0, movedItem);

      if (source.droppableId === "Todo") setTodo(sourceItems);
      else if (source.droppableId === "Ongoing") setOngoing(sourceItems);
      else if (source.droppableId === "Resolved") setResolved(sourceItems);

      if (destination.droppableId === "Todo") setTodo(destinationItems);
      else if (destination.droppableId === "Ongoing") setOngoing(destinationItems);
      else if (destination.droppableId === "Resolved") setResolved(destinationItems);
    }

    SuccessToast("Task moved successfully!");
  };

  const handleDelete = async (id) => {
    try {
      LoadingToast(true);
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
      LoadingToast(false);
      SuccessToast("Task deleted successfully!");
    } catch (error) {
      LoadingToast(false);
      ErrorToast("Failed to delete the task.");
      console.error("Failed to delete the task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setNewTitle(task.title);
  };

  const handleUpdate = async (id) => {
    try {
      LoadingToast(true);
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tasks/update/${id}`, { title: newTitle }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
      LoadingToast(false);
      SuccessToast("Task updated successfully!");
      setEditTaskId(null);
    } catch (error) {
      LoadingToast(false);
      ErrorToast("Failed to update the task.");
      console.error("Failed to update the task:", error);
    }
  };

  return (
    <div id="main" className="flex-row space-y-8">
      <ToasterContainer />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-8 justify-center">
          {/* Todo Section */}
          <Droppable droppableId="Todo" type="group">
            {(provided) => (
              <div
                className="bg-slate-600 space-y-3 flex-row border rounded-3xl p-4 pt-5 overflow-y-auto max-h-216"
                {...provided.droppableProps}
                ref={provided.innerRef}
                id="Todo"
              >
                <p className="border rounded-3xl w-72 backdrop-blur bg-blue-300">To Do</p>
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
                        {editTaskId === task._id ? (
                          <>
                            <input
                              type="text"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              className="w-full"
                            />
                            <button onClick={() => handleUpdate(task._id)} className="text-green-500">Save</button>
                          </>
                        ) : (
                          <>
                            <h3 className="pt-2">Title: {task.title}</h3>
                            <p className="flex justify-evenly ml-16 pt-2">
                              Status: {task.status}
                              <div className="flex gap-2">
                                <MdEdit
                                  style={{ fontSize: '20px' }}
                                  className="text-blue-300 cursor-pointer"
                                  onClick={() => handleEdit(task)}
                                />
                                <MdAutoDelete
                                  style={{ fontSize: '20px' }}
                                  className="text-yellow-300 cursor-pointer"
                                  onClick={() => handleDelete(task._id)}
                                />
                              </div>
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Ongoing Section */}
          <Droppable droppableId="Ongoing" type="group">
            {(provided) => (
              <div
                className="bg-slate-600 space-y-3 flex-row border rounded-3xl p-4 pt-5 overflow-y-auto max-h-216"
                {...provided.droppableProps}
                ref={provided.innerRef}
                id="Ongoing"
              >
                <p className="border rounded-3xl w-72 backdrop-blur bg-yellow-300">Ongoing</p>
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
                        <p className="flex justify-evenly ml-16">
                          Status: {task.status}
                          <MdAutoDelete
                            style={{ fontSize: '20px' }}
                            className="text-red-700 cursor-pointer"
                            onClick={() => handleDelete(task._id)}
                          />
                        </p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Resolved Section */}
          <Droppable droppableId="Resolved" type="group">
            {(provided) => (
              <div
                className="bg-slate-600 space-y-3 flex-row border rounded-3xl p-4 pt-5 overflow-y-auto max-h-216"
                {...provided.droppableProps}
                ref={provided.innerRef}
                id="Resolved"
              >
                <p className="border rounded-3xl w-72 backdrop-blur bg-green-300">Resolved</p>
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
                        <p className="flex justify-evenly ml-16">
                          Status: {task.status}
                          <MdAutoDelete
                            style={{ fontSize: '20px' }}
                            className="text-red-700 cursor-pointer"
                            onClick={() => handleDelete(task._id)}
                          />
                        </p>
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
