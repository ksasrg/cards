import { AuthCard } from "../../components/AuthCard/AuthCard";
import { EmailField } from "../../components/EmailField/EmailField";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgForgot } from "../../auth.api";
import Button from "@mui/material/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "../../auth.slice";

export function ForgotPass() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const href = window.location.href.replace(RouterPaths.forgot, "");

  const defaultValues = {
    email: process.env.REACT_APP_EMAIL || "",
    message: `<div style="background-color: lime; padding: 15px">
  password recovery link: 
  <a href='${href}/set-new-password/$token$'>link</a>
  </div>`,
  };

  const form = useForm<ArgForgot>({ defaultValues });
  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<ArgForgot> = (data) => {
    dispatch(authThunks.forgot(data))
      .unwrap()
      .then(() => {
        navigate(RouterPaths.checkemail, { state: { email: data.email } });
      })
      .catch(() => {});
  };

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
