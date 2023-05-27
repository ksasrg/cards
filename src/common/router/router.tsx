import Login from "features/auth/Login/Login";
import Signup from "features/auth/Signup/Signup";
import { createBrowserRouter } from "react-router-dom";
import { Counter } from "features/counter/Counter";

export const RouterPaths = {
  main: "/",
  signup: "/signup",
  signin: "/login",
};

export const router = createBrowserRouter([
  {
    path: RouterPaths.main,
    element: <Counter />,
  },
  {
    path: RouterPaths.signup,
    element: <Signup />,
  },
  {
    path: RouterPaths.signin,
    element: <Login />,
  },
]);
