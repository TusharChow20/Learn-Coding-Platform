import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Courses from "../Pages/Courses";
import About from "../Pages/About";
import Pricing from "../Pages/Pricing";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import axios from "axios";

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
        Component: About,
      },
      {
        path: "/pricing",
        Component: Pricing,
      },
      {
        path: "/contact",
        Component: Contact,
      },
    ],
  },
]);

export default router;
