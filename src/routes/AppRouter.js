import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "../pages/mainPage/Main";
import PreHeader from "../pages/headers/PreHeader";
import Login from "../pages/loginPage/Login";
import Signup from "../pages/signUpPage/Signup";
import Error from "../pages/errorPage/Error";
import PostHeader from "../pages/headers/PostHeader";
import MentorMainPage from "../pages/mentor&menteePage/mentorPage/mentorMainPage/MentorMainPage";

const AppRouter = () => {
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
      path: "/mentor",
      element: <PostHeader />,
      errorElement: <Error />,
      children: [
        {
          path: "",
          element: <MentorMainPage />,
        },
      ],
    },
    {
      path: "/mentee",
      element: <PostHeader />,
      errorElement: <Error />,
      children: [{}],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
