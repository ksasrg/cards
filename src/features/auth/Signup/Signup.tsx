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
import { ArgRegister } from "../auth.api";

// TODO delete default
const defaultValues = {
  email: process.env.REACT_APP_EMAIL || "",
  password: process.env.REACT_APP_PASS || "",
  confirmPassword: process.env.REACT_APP_PASS || "",
};

function Signup() {
  const dispatch = useAppDispatch();

  const form = useForm<ArgRegister>({ defaultValues });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<ArgRegister> = (data) => {
    dispatch(authThunks.register(data));
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
