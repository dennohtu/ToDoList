import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Resolved = ({ resolved }) => {
  return (
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
  );
};

export default Resolved;
