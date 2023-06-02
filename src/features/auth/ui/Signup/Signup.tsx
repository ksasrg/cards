import { authThunks } from "../../auth.slice";
import { useAppDispatch } from "app/hooks";
import Button from "@mui/material/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthCard } from "../../components/AuthCard/AuthCard";
import { EmailField } from "../../components/EmailField/EmailField";
import { PassField } from "../../components/PassField/PassField";
import { ConfirmPassField } from "../../components/ConfirmPassField/ConfirmPassField";
import { ArgRegister } from "../../auth.api";

// TODO delete default
const defaultValues = {
  email: process.env.REACT_APP_EMAIL || "",
  password: process.env.REACT_APP_PASS || "",
  confirmPassword: process.env.REACT_APP_PASS || "",
};

export function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<ArgRegister>({ defaultValues });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<ArgRegister> = (data) => {
    dispatch(authThunks.register(data))
      .unwrap()
      .then(() => {
        navigate(RouterPaths.signin);
      })
      .catch(() => {});
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
      <div className="auth_text">Already have an account?</div>
      <Link to={RouterPaths.signin}>Sign In</Link>
    </AuthCard>
  );
}
