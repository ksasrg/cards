import { authThunks } from "../auth.slice";
import { useAppDispatch } from "app/hooks";
import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import { Link } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import { useForm, SubmitHandler } from "react-hook-form";
import AuthCard from "../AuthCard/AuthCard";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

function Signup() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

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
        <div>
          <TextField
            label="Confirm password"
            variant="standard"
            type="password"
            sx={{ marginTop: "24px", width: "100%" }}
            error={Boolean(errors.confirmPassword)}
            helperText={
              errors.confirmPassword && errors.confirmPassword.message
            }
            {...register("confirmPassword", {
              validate: (val: string) => {
                if (watch("password") !== val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
        </div>
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
