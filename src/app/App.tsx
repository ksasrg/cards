import AppBar from "@mui/material/AppBar/AppBar";
import "./App.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Container from "@mui/material/Container/Container";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Button from "@mui/material/Button/Button";
import logo from "assets/logo.svg";
import { Link, Outlet } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import { useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { authApi } from "features/auth/auth.api";

function App() {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.auth.profile?.name);
  const avatar = useAppSelector((state) => state.auth.profile?.avatar);
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
  }, [dispatch]);

  if (!isAppInitialized) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={150} />
      </div>
    );
  }

  return (
    <div className="App">
      <AppBar position="static" color="inherit">
        <Container sx={{ maxWidth: "1000px" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <img src={logo} alt="" style={{}} />
            <div>
              {name ? (
                <>
                  <Link to={RouterPaths.profile}>{name}</Link>
                  <img
                    src={avatar}
                    alt=""
                    width="36px"
                    height="36px"
                    style={{ borderRadius: "50%" }}
                  />
                </>
              ) : (
                <Button component={Link} to={RouterPaths.signin}>
                  Sign In
                </Button>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </div>
  );
}

export default App;
