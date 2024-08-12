
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"
import store from './stores/stores';
import { Provider } from 'react-redux';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
const router= createBrowserRouter([
<App />,
])
// Disable StrictMode temporarily
ReactDOM.createRoot( document.getElementById('root')).render(
  
<Provider store={store}>
<RouterProvider router={router}/>
</Provider>
 
);
