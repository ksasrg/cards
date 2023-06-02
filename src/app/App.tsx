import "./App.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Outlet, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import { Preloader } from "common/components/Preloader/Preloader";
import { AppSnackbar } from "common/components/AppSnackBar/AppSnackBar";
import { Header } from "common/components/Header/Header";
import { ProgressLine } from "common/components/ProgressLine/ProgressLine";
import { PackListQuery, packsActions } from "features/packs/packs.slice";

export function App() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const isAppInit = useAppSelector((state) => state.app.isAppInitialized);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);

    const query: PackListQuery = {};
    params.min && (query["min"] = Number(params.min));
    params.max && (query["max"] = Number(params.max));
    params.page && (query["page"] = Number(params.page));
    params.user_id && (query["user_id"] = params.user_id);
    params.packName && (query["packName"] = params.packName);
    params.sortPacks && (query["sortPacks"] = params.sortPacks);
    params.pageCount && (query["pageCount"] = Number(params.pageCount));

    dispatch(packsActions.setQuery({ query }));

    dispatch(authThunks.me());
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

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
