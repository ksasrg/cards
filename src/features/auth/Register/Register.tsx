import React from "react";
import { authThunks } from "../auth.slice";
import { useAppDispatch } from "app/hooks";
import s from "./styles.module.css";
import Box from "@mui/material/Box/Box";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";
import Container from "@mui/material/Container/Container";
import logo from "assets/logo.svg";
import Card from "@mui/material/Card/Card";
import Paper from "@mui/material/Paper/Paper";
import Grid from "@mui/material/Grid/Grid";
import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";

function Register() {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    const payload = {
      email: "ksahtmlcss@gmail.com",
      password: "1qazxcvBG",
    };

    dispatch(authThunks.register(payload)); // background: #FCFCFC;
  };
  return (
    <>
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <AppBar position="static" color="inherit">
        <Container sx={{ maxWidth: "1000px" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography> */}
            <img src={logo} alt="" style={{}} />
            <Button>Sign In</Button>
          </Toolbar>
        </Container>
      </AppBar>
      {/* </Box> */}
      <Container fixed>
        <Grid container justifyContent={"center"}>
          <Grid item marginTop={"60px"}>
            <Paper
              elevation={2}
              sx={{
                textAlign: "center",
                padding: "42px 33px",
                minWidth: "400px",
                // width: "100%",
              }}
            >
              <h1>Sign Up</h1>
              <div>
                <TextField
                  label="Email"
                  variant="standard"
                  sx={{ marginTop: "42px", width: "100%" }}
                />
              </div>
              <div>
                <TextField
                  label="Password"
                  variant="standard"
                  type="password"
                  sx={{ marginTop: "24px", width: "100%" }}
                />
              </div>
              <div>
                <TextField
                  label="Confirm password"
                  variant="standard"
                  type="password"
                  sx={{ marginTop: "24px", width: "100%" }}
                />
              </div>

              <Button
                size="large"
                onClick={registerHandler}
                sx={{ marginTop: "68px" }}
              >
                Sign Up
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <div className={s.container}></div>
    </>
  );
}

export default Register;
