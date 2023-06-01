import TextField from "@mui/material/TextField/TextField";
import { FC } from "react";
import { FieldErrors, UseFormReturn } from "react-hook-form";

type PropsType = {
  form: UseFormReturn<any, any, undefined>;
};

export const ConfirmPassField: FC<PropsType> = (props) => {
  const {
    formState: { errors: formErrors },
    register,
    watch,
  } = props.form;

  // TODO { confirmPassword: string }
  let errors: FieldErrors<{ confirmPassword: string }> = formErrors;

  return (
    <div>
      <TextField
        label="Confirm password"
        variant="standard"
        type="password"
        sx={{ marginTop: "24px", width: "100%" }}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword && errors.confirmPassword.message}
        {...register("confirmPassword", {
          validate: (val: string) => {
            if (watch("password") !== val) {
              return "Your passwords do no match";
            }
          },
        })}
      />
    </div>
  );
};
