import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App'
import SearchDoctorsSite from './routes/searchDoctorsSite'
import WorkerPanelSite from './routes/workerPanelSite'
import Site404 from './routes/404Site'
import { ReactSession } from 'react-client-session'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: '/searchDoctors',
    element: <SearchDoctorsSite/>
  },
  {
    path: "/workerPanel",
    element: <WorkerPanelSite/>
  },
  {
    path: "*",
    element: <Site404/>
  },
])

ReactSession.setStoreType("cookie")

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
