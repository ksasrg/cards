import React from "react";
import { AuthCard } from "../AuthCard/AuthCard";
import { EmailField } from "../EmailField/EmailField";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgForgot } from "../auth.api";
import Button from "@mui/material/Button/Button";
import { Link } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "../auth.slice";

const defaultValues = {
  email: "ksahtmlcss@gmail.com",
  message: `<div style="background-color: lime; padding: 15px">
  password recovery link: 
  <a href='http://localhost:3000/#/set-new-password/$token$'>
  link</a>
  </div>`,
};

function ForgotPass() {
  const dispatch = useAppDispatch();

  const form = useForm<ArgForgot>({ defaultValues });
  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<ArgForgot> = (data) => {
    dispatch(authThunks.forgot(data));
  };

  return (
    <AuthCard>
      <h1>Forgot your password?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField form={form} />
        <p style={{ marginTop: "31px" }}>
          Enter your email address and we will send you further instructions
        </p>
        <Button size="large" type="submit" sx={{ marginTop: "68px" }}>
          Send Instructions
        </Button>
        <div style={{ marginTop: "31px" }}>Did you remember your password?</div>
        <Link
          to={RouterPaths.signin}
          style={{
            color: "#366EFF",
            display: "block",
            marginTop: "11px",
            fontSize: "20px",
          }}
        >
          Try logging in
        </Link>
      </form>
    </AuthCard>
  );
}

export default ForgotPass;
