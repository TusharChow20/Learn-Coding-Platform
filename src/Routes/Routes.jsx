import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Courses from "../Pages/Courses";
import Pricing from "../Pages/Pricing";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import axios from "axios";
import CourseDetails from "../Pages/CourseDetails";
import AboutUs from "../Pages/AboutUs";

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
    ],
  },
]);

export default router;
