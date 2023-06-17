import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './input.css'
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";


import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

<Route  path="/" element={<HomePage/>} />
<Route  path="/register" element={<RegisterPage/>} />
<Route  path="/login" element={<LoginPage/>} />

      {/* 
      private Routes component  */}

      {/* 
          AdminRoutes component */}
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


