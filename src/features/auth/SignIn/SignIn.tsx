import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "../auth.slice";
import { ArgLogin } from "../auth.api";
import { AuthCard } from "../AuthCard/AuthCard";
import { EmailField } from "../EmailField/EmailField";
import { PassField } from "../PassField/PassField";
import Button from "@mui/material/Button/Button";
import { RouterPaths } from "common/router/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Checkbox from "@mui/material/Checkbox/Checkbox";

// TODO delete default
const defaultValues: ArgLogin = {
  email: process.env.REACT_APP_EMAIL || "",
  password: process.env.REACT_APP_PASS || "",
  rememberMe: false,
};

export function SignIn() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  const form = useForm<ArgLogin>({ defaultValues });
  const { handleSubmit, register } = form;

  const onSubmit: SubmitHandler<ArgLogin> = (data) => {
    dispatch(authThunks.login(data));
  };

  if (isAuthorized) {
    return <Navigate to={location.state?.from.pathname || RouterPaths.main} />;
  }

  return (
    <AuthCard>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField form={form} />
        <PassField form={form} />
        <div>
          <FormControlLabel
            control={<Checkbox {...register("rememberMe")} />}
            label="Remember me"
            style={{
              marginTop: "24px",
              // float: "left"
            }}
          />
        </div>

        <Link
          to={RouterPaths.forgot}
          style={{
            color: "#366EFF",
            display: "block",
            marginTop: "11px",
            fontSize: "20px",
          }}
        >
          Forgot Password?
        </Link>
        <Button size="large" type="submit" sx={{ marginTop: "68px" }}>
          Sign In
        </Button>
      </form>
      <div style={{ marginTop: "31px" }}>Don't have an account?</div>
      <Link
        to={RouterPaths.signup}
        style={{
          color: "#366EFF",
          display: "block",
          marginTop: "11px",
          fontSize: "20px",
        }}
      >
        Sign Up
      </Link>
    </AuthCard>
  );
}
