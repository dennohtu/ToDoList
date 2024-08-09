import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddTodo = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks/create', {
        title,
      });

      if (response.status === 201) {
        setSuccess("To-do item added successfully!");
        setTitle(""); // Clear the input field
      } else {
        setError("Failed to add the to-do item.");
      }
    } catch (err) {
      setError("Error adding the to-do item. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter a new to-do"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-1 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default AddTodo;
