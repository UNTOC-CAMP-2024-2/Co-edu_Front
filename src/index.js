import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Main from "./pages/mainPage/Main";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./pages/errorPage/Error";
import Login from "./pages/loginPage/Login";
import Signup from "./pages/loginPage/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
