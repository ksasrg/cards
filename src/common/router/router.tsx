import Signup from "features/auth/Signup/Signup";
import { createBrowserRouter } from "react-router-dom";
import { Counter } from "features/counter/Counter";
import { SignIn } from "features/auth/SignIn/SignIn";
import ForgotPass from "features/auth/ForgotPass/ForgotPass";
import App from "app/App";

export const RouterPaths = {
  main: "/",
  signup: "/signup",
  signin: "/signin",
  forgot: "/forgot",
};

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
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
        element: <SignIn />,
      },
      {
        path: RouterPaths.forgot,
        element: <ForgotPass />,
      },
    ],
  },
]);

// const routers = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//         loader: authLoader
//       },
//       {
//         path: "/about",
//         element: <About />
//       }
//     ]
//   }
// ]);
