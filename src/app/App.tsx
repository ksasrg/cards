import "./App.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import { Preloader } from "common/components";
import { AppSnackbar } from "common/components";
import { Header } from "common/components";

export function App() {
  const dispatch = useAppDispatch();
  const isAppInit = useAppSelector((state) => state.app.isAppInitialized);

  useEffect(() => {
    dispatch(authThunks.me());
  }, [dispatch]);

  if (isAppInit) {
    return (
      <div className="App">
        <Header />
        <AppSnackbar />
        <Outlet />
      </div>
    );
  } else {
    return <Preloader />;
  }
}
