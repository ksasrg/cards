import React from "react";
import { authThunks } from "../auth.slice";
import { useAppDispatch } from "app/hooks";
import s from "./styles.module.css";
import Box from "@mui/material/Box/Box";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import logo from "assets/logo.svg";
import Card from "@mui/material/Card/Card";
import Paper from "@mui/material/Paper/Paper";
import Grid from "@mui/material/Grid/Grid";

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
            <Button color="info">Sign in</Button>
          </Toolbar>
        </Container>
      </AppBar>
      {/* </Box> */}
      <Container fixed>
        <Grid container justifyContent={"center"}>
          <Grid item marginTop={"60px"}>
            <Paper elevation={2} sx={{ padding: "33px", minWidth: "400px" }}>
              fgdfg
            </Paper>
            {/* <Card>hjghj</Card> */}
          </Grid>
        </Grid>
      </Container>
    </>
    // <div className={s.container}>
    //   <h1>Register</h1>
    //   <button onClick={registerHandler}>register</button>
    // </div>
  );
}

export default Register;
