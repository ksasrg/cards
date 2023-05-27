import { authThunks } from "../auth.slice";
import { useAppDispatch } from "app/hooks";
import Button from "@mui/material/Button/Button";
import { Link } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthCard } from "../AuthCard/AuthCard";
import { EmailField } from "../EmailField/EmailField";
import { PassField } from "../PassField/PassField";
import { ConfirmPassField } from "../ConfirmPassField/ConfirmPassField";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

function Signup() {
  const dispatch = useAppDispatch();

  const form = useForm<Inputs>();

  const {
    // register,
    handleSubmit,
    // watch,
    reset,
    // formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // TODO
    console.log(data);
    const payload = {
      email: "ksahtmlcss@gmail.com",
      password: "1qazxcvBG",
    };

    dispatch(authThunks.register(payload));
    reset();
  };

  return (
    <AuthCard>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField form={form} />
        <PassField form={form} />
        <ConfirmPassField form={form} />
        <Button size="large" type="submit" sx={{ marginTop: "68px" }}>
          Sign Up
        </Button>
      </form>
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
    </AuthCard>
  );
}

export default Signup;
