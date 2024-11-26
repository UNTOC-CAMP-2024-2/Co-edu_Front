import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "../pages/mainPage/Main";
import PreHeader from "../pages/headers/PreHeader";
import Login from "../pages/loginPage/Login";
import Signup from "../pages/signUpPage/Signup";
import Error from "../pages/errorPage/Error";
import PostHeader from "../pages/headers/PostHeader";
import MentorMainPage from "../pages/mentor&menteePage/mentorPage/mentorMainPage/MentorMainPage";
import MenteeMainPage from "../pages/mentor&menteePage/menteePage/menteeMainPage/MenteeMainPage";
import MenteeAssignmentsListPage from "../pages/mentor&menteePage/menteePage/menteeAssignmentsListPage/MenteeAssignmentsListPage";
import MentorAssignmentsListPage from "../pages/mentor&menteePage/mentorPage/mentorAssignmentsListPage/MentorAssignmentsListPage";
import MenteeFeedbackPage from "../pages/mentor&menteePage/menteePage/menteeFeedbackPage/MenteeFeedbackPage";
import MentorMakingAssignmentPage from "../pages/mentor&menteePage/mentorPage/mentorMakingAssignmentPage/MentorMakingAssignmentPage";

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
        {
          path: "assignments",
          element: <MentorAssignmentsListPage />,
        },
        {
          path: "make",
          element: <MentorMakingAssignmentPage />,
        }
      ],
    },
    {
      path: "/mentee",
      element: <PostHeader />,
      errorElement: <Error />,
      children: [
        {
          path: "",
          element: <MenteeMainPage />,
        },
        {
          path: "assignments",
          element: <MenteeAssignmentsListPage />,
        },
        {
          path: "feedback",
          element: <MenteeFeedbackPage />,
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
