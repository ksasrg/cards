import { useAppDispatch } from "app/hooks";
import { authThunks } from "../auth.slice";
import s from "./styles.module.css";
import { ArgLogin } from "../auth.api";

function Login() {
  const dispatch = useAppDispatch();

  const loginHandler = () => {
    const payload: ArgLogin = {
      email: "ksahtmlcss@gmail.com",
      password: "1qazxcvBG",
      rememberMe: false,
    };

    dispatch(authThunks.login(payload));
  };

  return (
    <div className={s.container}>
      <h1>Login</h1>
      <button onClick={loginHandler}>Login</button>
    </div>
  );
}

export default Login;
