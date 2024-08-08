import React from 'react'
import Card from './component/Card'
import AddTodo from './component/AddTodo'

const Dashboard = () => {
  return (
    <div className='max-w-md mx-auto md:max-w-1/2 mt-12 p-4 border border-gray-300 rounded-lg shadow-md'>
        <AddTodo/>
        <Card/>
    </div>
  )
}

export default Dashboard