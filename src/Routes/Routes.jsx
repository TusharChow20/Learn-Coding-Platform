import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Courses from "../Pages/Courses";
import Pricing from "../Pages/Pricing";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import axios from "axios";
import CourseDetails from "../Pages/CourseDetails";
import AboutUs from "../Pages/AboutUs";
import Login from "../Pages/LoginRegister/Login";
import Register from "../Pages/LoginRegister/Register";
import ProfileDashboard from "../Pages/Profile";
import ForgotPassword from "../Pages/ForgetPass";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        loader: () => axios("/teacherData.json"),
        Component: Home,
      },
      {
        path: "/courses",
        Component: Courses,
      },
      {
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/pricing",
        Component: Pricing,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/courseDetails/:id",
        Component: CourseDetails,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/profile",
        Component: ProfileDashboard,
      },
      {
        path: "/forgot-password",
        Component: ForgotPassword,
      },
    ],
  },
]);

export default router;
