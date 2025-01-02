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
import MentorFeedbackPage from "../pages/mentor&menteePage/mentorPage/mentorFeedbackPage/MentorFeedbackPage";
import MentorMakingAssignmentPage from "../pages/mentor&menteePage/mentorPage/mentorMakingAssignmentPage/MentorMakingAssignmentPage";
import MenteeReadingAssignmentPage from "../pages/mentor&menteePage/menteePage/meteeReadingAssignmentPage/MenteeReadingAssignmentPage";
import MentorEditAssignmentPage from "../pages/mentor&menteePage/mentorPage/mentorEditAssignmentPage/MentorEditAssignmentPage";
import MentorReadingAssignmentsPage from "../pages/mentor&menteePage/mentorPage/mentorReadingAssignmentsPage/MentorReadingAssignmentsPage";
import MenteeDetailAssignmentPage from "../pages/mentor&menteePage/menteePage/menteeDetailAssignmentPage/MenteeDetailAssignmentPage";

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
        },
        {
          path: "feedback",
          element: <MentorFeedbackPage />,
        },
        {
          path: "read",
          element: <MentorReadingAssignmentsPage />,
        },
        {
          path: "edit",
          element: <MentorEditAssignmentPage />,
        },
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
        },
        {
          path: "read",
          element: <MenteeReadingAssignmentPage />,
        },
        {
          path: "detail",
          element: <MenteeDetailAssignmentPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
