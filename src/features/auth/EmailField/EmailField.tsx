import TextField from "@mui/material/TextField/TextField";
import { FC } from "react";
import { FieldErrors, UseFormReturn } from "react-hook-form";

type PropsType = {
  form: UseFormReturn<any, any, undefined>;
};

export const EmailField: FC<PropsType> = (props) => {
  const {
    formState: { errors: formErrors },
    register,
  } = props.form;

  // TODO { email: string }
  let errors: FieldErrors<{ email: string }> = formErrors;

  return (
    <div>
      <TextField
        label="Email"
        variant="standard"
        sx={{ marginTop: "42px", width: "100%" }}
        error={Boolean(errors.email)}
        helperText={errors.email && errors.email.message}
        {...register("email", {
          required: "Required",
          pattern: {
            value: /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i,
            message: "Entered value does not match email format",
          },
        })}
      />
    </div>
  );
};
