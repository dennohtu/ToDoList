import './App.css'
import Login from './component/Login';
import Register from './component/Register';
import Dashboard from './Dashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return(
        
     <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
        
        
      
    )
   
}

export default App
