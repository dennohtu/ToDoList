import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTasksData } from '../stores/actions';

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!title) {
      setError("Title is required.");
      return;
    }

    try {
      const resultAction = await dispatch(addTasksData({ title })).unwrap();
      if (resultAction.success) {
        setSuccess("To-do item added successfully!");
        setTitle(""); // Clear the input field on success
      }
    } catch (err) {
      setError("Error adding the to-do item. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTodo} className="flex mb-4">
        <input
          type="text"
          placeholder="Enter a new to-do"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-1 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
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
