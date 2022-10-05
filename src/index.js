import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorPage from "./pages/error-page";
import DimBrowser from './pages/dimBrowser';
import RuleViser from './pages/ruleViser';
import AtomicBrowser from './pages/atomicBrowser';
import GroupEditor from './pages/groupEditor';

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
  {
    path: "/groupEditor",
    element: <GroupEditor />,
    errorElement: <ErrorPage />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);