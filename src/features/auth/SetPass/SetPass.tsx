import { useParams } from "react-router-dom";
import { AuthCard } from "../AuthCard/AuthCard";
import Button from "@mui/material/Button/Button";
import { PassField } from "../PassField/PassField";
import { useAppDispatch } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { authThunks } from "../auth.slice";
import { ArgSetPass } from "../auth.api";

const defaultValues = {
  password: process.env.REACT_APP_PASS,
};

export function SetPass() {
  const dispatch = useAppDispatch();
  const { token } = useParams();

  const form = useForm<ArgSetPass>({ defaultValues });

  const { handleSubmit } = form;

  // TODO any
  const onSubmit: SubmitHandler<ArgSetPass> = (data) => {
    data.resetPasswordToken = token || "";
    dispatch(authThunks.setPass(data));
  };

  return (
    <AuthCard>
      <h1>Create new password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PassField form={form} />
        <div
          style={{
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "24px",
            color: "#000000",
            opacity: "0.5",
            marginTop: "31px",
          }}
        >
          Create new password and we will send you further instructions to email
        </div>
        <Button size="large" type="submit" sx={{ marginTop: "41px" }}>
          Create new password
        </Button>
      </form>
    </AuthCard>
  );
}
