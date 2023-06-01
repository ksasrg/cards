import Signup from "features/auth/Signup/Signup";
import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "features/auth/SignIn/SignIn";
import ForgotPass from "features/auth/ForgotPass/ForgotPass";
import { App } from "app/App";
import Profile from "features/auth/Profile/Profile";
import { CheckEmail } from "features/auth/CheckEmail/CheckEmail";
import { SetPass } from "features/auth/SetPass/SetPass";
import { PacksList } from "features/packs/PacksList/PacksList";
import { AuthRedirect } from "features/auth/AuthRedirect/AuthRedirect";

export const RouterPaths = {
  main: "/",
  signup: "/signup",
  signin: "/signin",
  forgot: "/forgot",
  profile: "/profile",
  checkemail: "/checkemail",
  setpass: "/set-new-password/:token",
};

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: RouterPaths.main,
        element: (
          <AuthRedirect>
            <PacksList />
          </AuthRedirect>
        ),
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
      {
        path: RouterPaths.profile,
        element: (
          <AuthRedirect>
            <Profile />
          </AuthRedirect>
        ),
      },
      {
        path: RouterPaths.checkemail,
        element: <CheckEmail />,
      },
      {
        path: RouterPaths.setpass,
        element: <SetPass />,
      },
    ],
  },
]);
