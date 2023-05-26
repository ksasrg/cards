import React from "react";
import { authThunks } from "../auth.slice";
import { useAppDispatch } from "app/hooks";
import s from "./styles.module.css";

function Register() {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    const payload = {
      email: "ksahtmlcss@gmail.com",
      password: "1qazxcvBG",
    };

    dispatch(authThunks.register(payload));
  };
  return (
    <div className={s.container}>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
}

export default Register;
