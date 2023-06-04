import { Signup } from "features/auth/ui/Signup/Signup";
import { createHashRouter } from "react-router-dom";
import { SignIn } from "features/auth/ui/SignIn/SignIn";
import { ForgotPass } from "features/auth/ui/ForgotPass/ForgotPass";
import { App } from "app/App";
import { Profile } from "features/auth/ui/Profile/Profile";
import { CheckEmail } from "features/auth/ui/CheckEmail/CheckEmail";
import { SetPass } from "features/auth/ui/SetPass/SetPass";
import { PacksList } from "features/packs/ui/PacksList/PacksList";
import { AuthRedirect } from "common/components";
import { CardsList } from "features/cards/ui/CardsList/CardsList";

export const RouterPaths = {
  main: "/",
  cards: "/cards",
  signup: "/signup",
  signin: "/signin",
  forgot: "/forgot",
  profile: "/profile",
  checkemail: "/checkemail",
  setpass: "/set-new-password/:token",
};

export const router = createHashRouter([
  // export const router = createBrowserRouter([
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
        path: RouterPaths.cards,
        element: (
          <AuthRedirect>
            <CardsList />
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
