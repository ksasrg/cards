import { useNavigate } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import Button from "@mui/material/Button/Button";
import pic404 from "assets/404.svg";
import s from "./style.module.css";

export const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className={`container page ${s.page}`}>
      <div>
        <img src={pic404} alt="404" />
      </div>
      <h1>Ooops!</h1>
      <h2>Sorry! Page not found!</h2>
      <Button onClick={() => navigate(RouterPaths.main)}>
        Back to home page
      </Button>
    </div>
  );
};
