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

function App() {
  const dispatch = useAppDispatch();
  const isAppInitialized = useAppSelector(
    (state) => state.app.isAppInitialized
  );

  useEffect(() => {
    dispatch(authThunks.me());
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
            <Button component={Link} to={RouterPaths.signin}>
              Sign In
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </div>
  );
}

export default App;
