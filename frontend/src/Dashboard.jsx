import React from 'react'
import Card from './component/Card'
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