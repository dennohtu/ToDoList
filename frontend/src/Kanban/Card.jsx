import React, { useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo.jsx";
import Ongoing from "./Ongoing.jsx";
import Resolved from "./Resolved.jsx";
import { getAllTasks,updateTaskData, } from "../stores/actions.js";
import { updateLocalTasks } from "../stores/taskReducer.js";

const Card = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
// console.log(tasks)

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);
 


  const todo = tasks.filter((task) => task.status === 'new');
  // console.log(todo)
  const ongoing = tasks.filter((task) => task.status === 'ongoing');
  const resolved = tasks.filter((task) => task.status === 'done');

  // Rest of the component
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    let sourceList, destinationList;

    // Determine source and destination lists
    switch (source.droppableId) {
        case "Todo":
            sourceList = todo;
            break;
        case "Ongoing":
            sourceList = ongoing;
            break;
        case "Resolved":
            sourceList = resolved;
            break;
        default:
            return;
    }

    switch (destination.droppableId) {
        case "Todo":
            destinationList = todo;
            break;
        case "Ongoing":
            destinationList = ongoing;
            break;
        case "Resolved":
            destinationList = resolved;
            break;
        default:
            return;
    }

    if (source.droppableId === destination.droppableId) {
        // Reordering within the same list
        const updatedList = Array.from(sourceList);
        const movedItem = updatedList.splice(source.index, 1);
        updatedList.splice(destination.index, 0, movedItem[0]);

        dispatch(updateLocalTasks(updatedList));
    // 
    } else{

    }

  
  }

  const handleSave = () => {
    if (tasks.length) {
      dispatch(updateTaskData(tasks));
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
