import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorPage from "./pages/error-page";
import DimBrowser from './pages/dimBrowser';
import RuleViser from './pages/ruleViser';
import AtomicBrowser from './pages/atomicBrowser';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AtomicBrowser />,
    errorElement: <ErrorPage />
  },
  {
    path: "/atomicBrowser",
    element: <AtomicBrowser />,
    errorElement: <ErrorPage />
  },
  {
    path: "/dimBrowser",
    element: <DimBrowser />,
    errorElement: <ErrorPage />
  },
  {
    path: "/ruleBrowser",
    element: <RuleViser />,
    errorElement: <ErrorPage />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
