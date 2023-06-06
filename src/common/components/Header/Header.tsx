import Button from "@mui/material/Button/Button";
import { RouterPaths } from "common/router/router";
import { useAppSelector } from "app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { ProgressLine } from "../ProgressLine/ProgressLine";
import { HeaderProfileBlock } from "../HeaderProfileBlock/HeaderProfileBlock";
import logo from "assets/logo.svg";
import s from "./style.module.css";

export const Header = () => {
  const navigate = useNavigate();
  const name = useAppSelector((state) => state.auth.profile?.name);

  return (
    <header className={s.appbar}>
      <ProgressLine className={s.progress} />
      <div className="container">
        <div className={s.header}>
          <Link to={RouterPaths.main}>
            <img src={logo} alt="logo" />
          </Link>
          <div>
            {name ? (
              <HeaderProfileBlock name={name} />
            ) : (
              <Button onClick={() => navigate(RouterPaths.signin)}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
