import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "../../auth.slice";
import { ArgLogin } from "../../auth.api";
import { AuthCard } from "../../components/AuthCard/AuthCard";
import { EmailField } from "../../components/EmailField/EmailField";
import { PassField } from "../../components/PassField/PassField";
import Button from "@mui/material/Button/Button";
import { RouterPaths } from "common/router/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import s from "./style.module.css";

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

  const backlink =
    location.state?.from.pathname + location.state?.from.search ||
    RouterPaths.main;

  if (isAuthorized) {
    return <Navigate to={backlink} />;
  }

  return (
    <AuthCard>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField form={form} />
        <PassField form={form} />
        <div className={s.checkbox}>
          <Checkbox {...register("rememberMe")} id="rememberMe" />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <Link to={RouterPaths.forgot}>Forgot Password?</Link>
        <Button size="large" type="submit" sx={{ marginTop: "68px" }}>
          Sign In
        </Button>
      </form>
      <div className="auth_text">Don't have an account?</div>
      <Link to={RouterPaths.signup}>Sign Up</Link>
    </AuthCard>
  );
}
