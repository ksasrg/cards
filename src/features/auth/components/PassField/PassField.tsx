import TextField from "@mui/material/TextField/TextField";
import { FC } from "react";
import { FieldErrors, UseFormReturn } from "react-hook-form";

type PropsType = {
  form: UseFormReturn<any, any, undefined>;
};

export const PassField: FC<PropsType> = (props) => {
  const {
    formState: { errors: formErrors },
    register,
  } = props.form;

  // TODO { password: string }
  let errors: FieldErrors<{ password: string }> = formErrors;

  return (
    <div>
      <TextField
        label="Password"
        variant="standard"
        type="password"
        sx={{ marginTop: "24px", width: "100%" }}
        error={Boolean(errors.password)}
        helperText={errors.password && errors.password.message}
        {...register("password", {
          required: "Required",
          minLength: { value: 7, message: "7 chars" },
        })}
      />
    </div>
  );
};
