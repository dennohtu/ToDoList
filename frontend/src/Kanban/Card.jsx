import React, { useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo.jsx";
import Ongoing from "./Ongoing.jsx";
import Resolved from "./Resolved.jsx";
import { getAllTasks } from "../stores/actions.js";

const Card = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
console.log(tasks)

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);
 


  const todo = tasks.filter((task) => task.status === 'new');
  console.log(todo)
  const ongoing = tasks.filter((task) => task.status === 'ongoing');
  const resolved = tasks.filter((task) => task.status === 'done');

  // Rest of the component
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = source.droppableId === "Todo" ? todo : source.droppableId === "Ongoing" ? ongoing : resolved;
    const destinationList = destination.droppableId === "Todo" ? todo : destination.droppableId === "Ongoing" ? ongoing : resolved;

    if (source.droppableId === destination.droppableId) {
      const updatedList = Array.from(sourceList);
      const [movedItem] = updatedList.splice(source.index, 1);
      updatedList.splice(destination.index, 0, movedItem);

      const updatedTasks = tasks.map((task) =>
        task.id === movedItem.id ? { ...task, order: destination.index } : task
      );

      dispatch(updateTasksData(updatedTasks));
    } else {
      const updatedSourceList = Array.from(sourceList);
      const updatedDestinationList = Array.from(destinationList);
      const [movedItem] = updatedSourceList.splice(source.index, 1);

      movedItem.status =
        destination.droppableId === "Todo"
          ? "new"
          : destination.droppableId === "Ongoing"
          ? "ongoing"
          : "done";

      updatedDestinationList.splice(destination.index, 0, movedItem);

      const updatedTasks = tasks.map((task) =>
        task.id === movedItem.id ? movedItem : task
      );

      dispatch(updateTasksData(updatedTasks));
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
