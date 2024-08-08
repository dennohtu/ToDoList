import React from 'react'

const AddTodo = () => {
  return (
    <div>
          <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter a new to-do"
          className="flex-1 p-1 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add 
        </button>
      </div>
    </div>
  )
}

export default AddTodo