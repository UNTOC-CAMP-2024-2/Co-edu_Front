import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Main from "./pages/mainPage/Main";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./pages/errorPage/Error";
import Login from "./pages/loginPage/Login";
import Signup from "./pages/loginPage/Signup";
import PreHeader from "./pages/header/PreHeader";
import PostHeader from "./pages/header/PostHeader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PreHeader />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/study",
    element: <PostHeader />,
    errorElement: <Error />,
    children: [{}],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
