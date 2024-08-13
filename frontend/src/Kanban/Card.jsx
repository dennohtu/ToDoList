import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo.jsx";
import Ongoing from "./Ongoing.jsx";
import Resolved from "./Resolved.jsx";
import { getAllTasks, updateTasksData } from "../stores/actions.js";

const Card = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks)
  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);
  
  const todo = tasks.filter((task) => task.status === 'new');
  const ongoing = tasks.filter((task) => task.status === 'ongoing');
  const resolved = tasks.filter((task) => task.status === 'done');

  // Rest of the component

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = source.droppableId === "Todo" ? todo : source.droppableId === "Ongoing" ? ongoing : resolved;
    const destinationList = destination.droppableId === "Todo" ? todo : destination.droppableId === "Ongoing" ? ongoing : resolved;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      const items = Array.from(sourceList);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);

      if (source.droppableId === "Todo") setTodo(items);
      else if (source.droppableId === "Ongoing") setOngoing(items);
      else if (source.droppableId === "Resolved") setResolved(items);
    } else {
      // Moving between different lists
      const sourceItems = Array.from(sourceList);
      const destinationItems = Array.from(destinationList);
      const [movedItem] = sourceItems.splice(source.index, 1);

      // Update the status of the moved item
      movedItem.status = destination.droppableId === "Todo" ? "new" : destination.droppableId === "Ongoing" ? "ongoing" : "done";

      destinationItems.splice(destination.index, 0, movedItem);

      // Update state based on the drag result
      if (source.droppableId === "Todo") setTodo(sourceItems);
      else if (source.droppableId === "Ongoing") setOngoing(sourceItems);
      else if (source.droppableId === "Resolved") setResolved(sourceItems);

      if (destination.droppableId === "Todo") setTodo(destinationItems);
      else if (destination.droppableId === "Ongoing") setOngoing(destinationItems);
      else if (destination.droppableId === "Resolved") setResolved(destinationItems);

      // Save the updated task to the server
      dispatch(updateTasksData(movedItem));
    }
  };

  const handleSave = () => {
    if (tasks.length) {
      dispatch(updateTasksData(tasks));
    }
  };

  return (
    <div id="main" className="flex-row space-y-8">
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-8 justify-center">
          <Todo todo={todo} />
          <Ongoing ongoing={ongoing} />
          <Resolved resolved={resolved} />
        </div>
      </DragDropContext>
      <div>
        <button
          type="submit"
          name="Save"
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Card;
