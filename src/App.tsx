import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./Layout/RootLayout";
import DashboardLayout from "./Layout/DashboardLayout";

// pages
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  { path: "*", element: <ErrorPage /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
