import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You need to log in to add a to-do item.");
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/tasks/create',
        {
          title: title
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('response:', response.data.success);

      if (response.data.success === true) {
        setSuccess("To-do item added successfully!");
        setTitle(""); // Clear the input field on success
      } else {
        setError("Failed to add the to-do item.");
      }
    } catch (err) {
      setError("Error adding the to-do item. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTodo} className="flex mb-4">
        <input
          id='todo-input'
          type="text"
          placeholder="Enter a new to-do"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-1 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          id='add-todo-button'
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default AddTodo;
