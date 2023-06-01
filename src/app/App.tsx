import "./App.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Outlet, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import { Preloader } from "features/auth/Preloader/Preloader";
import { AppSnackbar } from "features/AppSnackBar/AppSnackBar";
import { Header } from "./Header/Header";
import { ProgressLine } from "./ProgressLine/ProgressLine";
import { PackListQuery, packsActions } from "features/packs/packs.slice";

function App() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const isAppInitialized = useAppSelector(
    (state) => state.app.isAppInitialized
  );

  // TODO delete authApi.update
  useEffect(() => {
    const query: PackListQuery = {};
    params.min && (query["min"] = Number(params.min));
    params.max && (query["max"] = Number(params.max));
    params.page && (query["page"] = Number(params.page));
    params.packName && (query["packName"] = params.packName);
    params.sortPacks && (query["sortPacks"] = params.sortPacks);
    params.pageCount && (query["pageCount"] = Number(params.pageCount));

    dispatch(packsActions.setQuery({ query }));

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
