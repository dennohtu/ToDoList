import React from 'react'
import Card from './Kanban/Card.jsx'
import AddTodo from './component/AddTodo'

const Dashboard = () => {
  return (
    <div>
        <AddTodo/>
        <Card/>
    </div>
  )
}

export default Dashboard