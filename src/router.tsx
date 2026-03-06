import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import ResetPassword from "./pages/Auth/ResetPassword";
import SlideDetails from "./pages/SlideDetails";
// import ProtectedRoute from "./components/ProtectedRoute";
import App from "./App";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/",
    // element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Navigate to="/slides" replace />,
      },
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "slides",
            element: <Home />,
          },
          {
            path: "slides/:id",
            element: <SlideDetails />,
          },
        ],
      },
    ],
  },
]);
