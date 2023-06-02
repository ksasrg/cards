import { useNavigate, useParams } from "react-router-dom";
import { AuthCard } from "../../components/AuthCard/AuthCard";
import Button from "@mui/material/Button/Button";
import { PassField } from "../../components/PassField/PassField";
import { useAppDispatch } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { authThunks } from "../../auth.slice";
import { ArgSetPass } from "../../auth.api";
import { RouterPaths } from "common/router/router";

const defaultValues = {
  password: process.env.REACT_APP_PASS,
};

export function SetPass() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const form = useForm<ArgSetPass>({ defaultValues });
  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<ArgSetPass> = (data) => {
    data.resetPasswordToken = token || "";
    dispatch(authThunks.setPass(data))
      .unwrap()
      .then(() => {
        navigate(RouterPaths.signin);
      })
      .catch(() => {});
  };

  return (
    <AuthCard>
      <h1>Create new password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PassField form={form} />
        <div className="auth_text">
          Create new password and we will send you further instructions to email
        </div>
        <Button size="large" type="submit" sx={{ marginTop: "41px" }}>
          Create new password
        </Button>
      </form>
    </AuthCard>
  );
}
