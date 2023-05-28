import "./App.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import { Preloader } from "features/auth/Preloader/Preloader";
import { AppSnackbar } from "features/AppSnackBar/AppSnackBar";
import { Header } from "./Header/Header";
import { ProgressLine } from "./ProgressLine/ProgressLine";

function App() {
  const dispatch = useAppDispatch();
  const isAppInitialized = useAppSelector(
    (state) => state.app.isAppInitialized
  );

  useEffect(() => {
    dispatch(authThunks.me()); // TODO delete authApi.update
    // authApi.update({
    //   name: "ghfgh",
    //   avatar:
    //     "https://sun1-55.userapi.com/impg/GQ-N3w5RkqB2S1xckB489iiljNz96cZcEnvS9w/G6AQuF05GYA.jpg?size=1280x960&quality=95&sign=ff9b6d958d1ef5112869cf833001512c&type=album",
    // });
    // authApi.update({
    //   avatar: "",
    // });
  }, [dispatch]);

  if (!isAppInitialized) {
    return <Preloader />;
  }

  return (
    <div className="App">
      <Header />
      <ProgressLine />
      <AppSnackbar />
      <Outlet />
    </div>
  );
}

export default App;
