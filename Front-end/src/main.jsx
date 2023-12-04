import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter, RouterProvider
} from "react-router-dom"

import Login from './Pages/Login/index.jsx'
import Cadastro from './Pages/Cadastro/index.jsx'
import Home from './Pages/Home/index.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/cadastro",
    element: <Cadastro/>
  },
  {
    path: "/home",
    element: <Home/>
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
