import React, { useState } from "react";
import axios from "axios";
import { SuccessToast, ErrorToast, LoadingToast, ToasterContainer } from "../Toaster";

const AddTodo = ({ fetchData }) => {
  const [title, setTitle] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        ErrorToast("You need to log in to add a to-do item.");
        return;
      }

      LoadingToast(true);

      const response = await axios.post(
        "http://localhost:5000/api/tasks/create",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      LoadingToast(false);

      if (response.data.success) {
        SuccessToast("To-do item added successfully!");
        setTitle(""); // Clear the input field on success
        fetchData(); // Refetch data to update the list
      } else {
        ErrorToast("Failed to add the to-do item.");
      }
    } catch (err) {
      LoadingToast(false);
      ErrorToast("Error adding the to-do item. Please try again.");
    }
  };

  return (
    <div>
      <ToasterContainer />
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
    </div>
  );
};

export default AddTodo;
