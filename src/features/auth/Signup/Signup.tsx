import { authThunks } from "../auth.slice";
import { useAppDispatch } from "app/hooks";
import s from "./styles.module.css";
import Container from "@mui/material/Container/Container";
import Paper from "@mui/material/Paper/Paper";
import Grid from "@mui/material/Grid/Grid";
import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import { Link } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import { useForm, SubmitHandler } from "react-hook-form";

function Signup() {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    const payload = {
      email: "ksahtmlcss@gmail.com",
      password: "1qazxcvBG",
    };

    dispatch(authThunks.register(payload));
  };
  return (
    <>
      <Container fixed>
        <Grid container justifyContent={"center"}>
          <Grid item marginTop={"60px"}>
            <Paper
              elevation={2}
              sx={{
                textAlign: "center",
                padding: "42px 33px",
                minWidth: "400px",
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
              <div style={{ marginTop: "31px" }}>Already have an account?</div>
              <Link
                to={RouterPaths.signin}
                style={{
                  color: "#366EFF",
                  display: "block",
                  marginTop: "11px",
                  fontSize: "20px",
                }}
              >
                Sign In
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <div className={s.container}></div>
    </>
  );
}

export default Signup;
