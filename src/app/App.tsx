import AppBar from "@mui/material/AppBar/AppBar";
import "./App.css";
import { useAppSelector } from "app/hooks";
import Container from "@mui/material/Container/Container";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Button from "@mui/material/Button/Button";

import logo from "assets/logo.svg";
import { RouterProvider } from "react-router-dom";
import { router } from "common/router/router";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return (
    <div className="App">
      <AppBar position="static" color="inherit">
        <Container sx={{ maxWidth: "1000px" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <img src={logo} alt="" style={{}} />
            <Button>Sign In</Button>
          </Toolbar>
        </Container>
      </AppBar>
      {isLoading && <h1>Loader...</h1>}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
