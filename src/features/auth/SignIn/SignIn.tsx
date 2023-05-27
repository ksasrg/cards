import { useAppDispatch } from "app/hooks";
import { authThunks } from "../auth.slice";
import { ArgLogin } from "../auth.api";
import { AuthCard } from "../AuthCard/AuthCard";
import { EmailField } from "../EmailField/EmailField";
import { PassField } from "../PassField/PassField";
import Button from "@mui/material/Button/Button";
import { RouterPaths } from "common/router/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Checkbox from "@mui/material/Checkbox/Checkbox";

type Inputs = {
  email: string;
  password: string;
  RememberMe: boolean;
};

export function SignIn() {
  const dispatch = useAppDispatch();

  const form = useForm<Inputs>();

  const { handleSubmit, register } = form;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data); // TODO delete console.log
    const payload: ArgLogin = {
      email: "ksahtmlcss@gmail.com",
      password: "1qazxcvBG",
      rememberMe: false,
    };

    dispatch(authThunks.login(payload));
  };

  return (
    <AuthCard>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField form={form} />
        <PassField form={form} />
        <div>
          <FormControlLabel
            control={<Checkbox {...register("RememberMe")} />}
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
