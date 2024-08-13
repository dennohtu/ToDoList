import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
<<<<<<< HEAD
=======
import axios from "axios";
import getToken from "../auth.Service";
import {useDispatch} from "react-redux";


const Card = () => {
  const dispatch = useDispatch()
  const [tasks, setTasks]= useState([])
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
>>>>>>> 229cff57e43dd501e552dc2814665885f3ca1379

const Card = ({
  todo,
  ongoing,
  resolved,
  setTodo,
  setOngoing,
  setResolved,
  fetchData,
}) => {
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
<<<<<<< HEAD
      else if (destination.droppableId === "Ongoing")
        setOngoing(destinationItems);
      else if (destination.droppableId === "Resolved")
        setResolved(destinationItems);
=======
      else if (destination.droppableId === "Ongoing") setOngoing(destinationItems);
      else if (destination.droppableId === "Resolved") setResolved(destinationItems);
     
>>>>>>> 229cff57e43dd501e552dc2814665885f3ca1379
    }
  };
  const handleSave = () => {
    //add a save button
    //fetch data to update state
    fetchData();
  };

<<<<<<< HEAD
=======
if (!tasks===setTasks){
  dispatch(updateTasks(tasks))
}
  

})
>>>>>>> 229cff57e43dd501e552dc2814665885f3ca1379
  return (
    <div id="main" className="flex-row space-y-8 ">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-8 justify-center">
          <Droppable droppableId="Todo" type="group">
            {(provided) => (
              <div
                className="bg-slate-600 space-y-3 flex-row border rounded-3xl p-4 pt-5 overflow-y-auto max-h-216"
                {...provided.droppableProps}
                ref={provided.innerRef}
                id="Todo"
              >
                <p className="border rounded-3xl w-72 backdrop-blur bg-blue-300">
                  To Do
                </p>
                {todo.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        draggable="true"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={task._id}
                        className="flex-row border rounded-lg justify-center content-start h-20"
                      >
                        <h2>Title: {task.title}</h2>
                       
                        <p>Status: {task.status}</p>
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
                <p className="border rounded-3xl w-72 backdrop-blur bg-yellow-300">
                  Ongoing
                </p>
                {ongoing.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        draggable="true"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={task._id}
                        className="flex-row border rounded-lg justify-center content-start h-20"
                      >
                        <h2>{task.title}</h2>
                     
                        <p>Status: {task.status}</p>
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
                <p className="border rounded-3xl w-72 backdrop-blur bg-green-300">
                  Resolved
                </p>
                {resolved.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        draggable="true"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={task._id}
                        className="flex-row border rounded-lg justify-center content-start h-20"
                      >
                        <h2>Title: {task.title}</h2>
                      
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
