import { AuthCard } from "../../components/AuthCard/AuthCard";
import { EmailField } from "../../components/EmailField/EmailField";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgForgot } from "../../auth.api";
import Button from "@mui/material/Button/Button";
import { Link, Navigate } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "../../auth.slice";

const origin = window.location.origin;
const hash = window.location.hash ? "/#" : "";

const defaultValues = {
  email: process.env.REACT_APP_EMAIL || "",
  message: `<div style="background-color: lime; padding: 15px">
  password recovery link: 
  <a href='${origin}${hash}/set-new-password/$token$'>
  link</a>
  </div>`,
};

export function ForgotPass() {
  const dispatch = useAppDispatch();
  const checkEmail = useAppSelector((state) => state.auth.checkEmail);

  const form = useForm<ArgForgot>({ defaultValues });
  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<ArgForgot> = (data) => {
    dispatch(authThunks.forgot(data));
  };

  if (checkEmail) {
    return (
      <Navigate to={RouterPaths.checkemail} state={{ email: checkEmail }} />
    );
  }

  return (
    <AuthCard>
      <h1>Forgot your password?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField form={form} />
        <div className="auth_text">
          Enter your email address and we will send you further instructions
        </div>
        <Button size="large" type="submit" sx={{ marginTop: "68px" }}>
          Send Instructions
        </Button>
        <div className="auth_text">Did you remember your password?</div>
        <Link to={RouterPaths.signin}>Try logging in</Link>
      </form>
    </AuthCard>
  );
}